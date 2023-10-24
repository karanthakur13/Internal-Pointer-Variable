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
import Scanner from "../components/Scanner";

import QrCode from "qrcode";

const BlockchainFrontend = () => {
  const { contract } = useContract(
    "0xA85D1Ae5157E6c6eEd906cDd20800f753a15429a"
  );

  const address = useAddress();
  const connect = useMetamask();

  const [form, setForm] = useState({
    CarbonEmission: "",
    WaterUsage: "",
    EnergyEfficiency: "",
    WasteGeneration: "",
    RenewableEnergyUsage: "",
  });

  const { mutateAsync: updateProduct } = useContractWrite(
    contract,
    "updateProduct"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [url, setUrl] = useState("");
  const [num, setNum] = useState(0);
  const [shipmentData, setShipmentData] = useState("");

  function onClickHandler() {
    console.log("hello");
    connect();
  }
  useEffect(() => {
    if (qrData) {
      generateQR(qrData);
    }
  }, [qrData]);

  const UpdateItem = async (num, form) => {
    const data = await updateProduct({
      args: [
        num,
        form.CarbonEmission,
        form.WaterUsage,
        form.EnergyEfficiency,
        form.WasteGeneration,
        form.RenewableEnergyUsage,
      ],
    });

    return data;
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleScanResult = (result) => {
    setShipmentData(result);
    const parsedNum = parseInt(result);
    setNum(parsedNum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await UpdateItem(num, {
      ...form,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <Scanner onScanResult={handleScanResult} />
      {shipmentData && (
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
                handleChange={(e) =>
                  handleFormFieldChange("EnergyEfficiency", e)
                }
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
                handleChange={(e) =>
                  handleFormFieldChange("WasteGeneration", e)
                }
              />
              {
                <CustomButton
                  btnType="submit"
                  title="Update Product"
                  styles="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              }
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlockchainFrontend;
