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
    <div>
      <div className="mt-[30px] backdrop-brightness-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && <Loader />}
        <button
          type="button"
          onClick={onClickHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Connect
        </button>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
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
            {
              <CustomButton
                btnType="submit"
                title="Register Product"
                styles="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
            }
          </div>
        </form>
        {qrData && (
          <div className="mt-[26px]">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white ">
              Product Registered Successfully{" "}
            </span>
            <div className="flex justify-center items-center mt-[26px] ">
              <img src={url} alt="qrcode" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainFrontend;
