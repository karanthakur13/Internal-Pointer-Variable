import React, { useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import ethers from "ethers";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import CustomButton from "../components/CustomButton";
import QrCode from "qrcode";
import '../styles/BCN.css'

const BlockchainFrontend = () => {
  const { contract } = useContract(
    "0xC62672cf4784eCC94CBbaC4AF610866eedAa4486"
  );

  const address = useAddress();
  const connect = useMetamask();

  const [form, setForm] = useState({
    CarbonEmission: "",
    WaterUsage: "",
    EnergyEfficiency: "",
    WasteGeneration: "",
    RenewableEnergyUsage: "",
    BiodiversityUsage: "",
  });

  const { mutateAsync: addProduct } = useContractWrite(contract, "addProduct");
  const [isLoading, setIsLoading] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [url, setUrl] = useState("");

  function onClickHandler() {
    console.log("hello");
    connect();
  }
  useEffect(() => {
    if (qrData) {
      generateQR(qrData);
    }
  }, [qrData]);

  const createnewItem = async (form) => {
    const data = await addProduct({
      args: [
        form.CarbonEmission,
        form.WaterUsage,
        form.EnergyEfficiency,
        form.WasteGeneration,
        form.RenewableEnergyUsage,
        form.BiodiversityUsage,
      ],
    });

    return data;
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const generateQR = async () => {
    try {
      const response = await QrCode.toDataURL(qrData);
      setUrl(response);
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await createnewItem({
      ...form,
    });
    console.log(data);
    const num = data.receipt.events[0].args[0];
    console.log(num);
    const numAsString = num.toString();
    setQrData(numAsString);
    setIsLoading(false);
  };
  return (
      <div className="bcn-container">
        {isLoading && <Loader />}
        <form
          onSubmit={handleSubmit}
          className="bcn-form"
        >
          <div className="formFields">
            <FormField
              labelName="Carbon Emission"
              inputType="number"
              value={form.CarbonEmission}
              handleChange={(e) => handleFormFieldChange("CarbonEmission", e)}
            />

            <FormField
              labelName="Energy Efficicency"
              inputType="number"
              value={form.EnergyEfficiency}
              handleChange={(e) => handleFormFieldChange("EnergyEfficiency", e)}
            />

            <FormField
              labelName="Water Usage"
              inputType="number"
              value={form.WaterUsage}
              handleChange={(e) => handleFormFieldChange("WaterUsage", e)}
            />

            <FormField
              labelName="Renewable Energy Usage"
              inputType="number"
              value={form.RenewableEnergyUsage}
              handleChange={(e) =>
                handleFormFieldChange("RenewableEnergyUsage", e)
              }
            />
            <FormField
              labelName="Waste Generation"
              inputType="number"
              value={form.WasteGeneration}
              handleChange={(e) => handleFormFieldChange("WasteGeneration", e)}
            />
            <FormField
              labelName="Biodiversity Usage"
              inputType="text"
              value={form.BiodiversityUsage}
              handleChange={(e) =>
                handleFormFieldChange("BiodiversityUsage", e)
              }
            />
            <div className="bcn-buttons">
              <button type="button" onClick={onClickHandler} className="connect-button">
                Connect
              </button>
              <button className="bcn-submit" type="sumbit">Register</button>
            </div>
          </div>
        </form>
        {qrData && (
          <div className="qrCode">
            <span className="f">
              Product Registered Successfully{" "}
            </span>
            <div className="">
              <img src={url} alt="qrcode" />
            </div>
          </div>
        )}
      </div>
  );
};

export default BlockchainFrontend;
