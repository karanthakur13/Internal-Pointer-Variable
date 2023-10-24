import { useDispatch } from "react-redux"
import "../../styles/AddProduct.css"
import { useState } from "react";
import { addProduct } from "../../actions/ProdcutActions";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import ethers from "ethers";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import QrCode from "qrcode";

const AddProduct = () => {
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

    const [product,setProduct] = useState({});
    const dispatch = useDispatch();

    const submit = () => {
        console.log(product);
        dispatch(addProduct(product));
    }

    const handleOnChange = (e) => {
        setProduct((prev) => {return {...prev,[e.target.name]:e.target.value}})
    }

    return (
        <div className="addProduct">
            <form>
                <label>Name</label>
                <input type="text" onChange={handleOnChange} name="name" value={product.name}/>
                <label>Price</label>
                <input type="number" onChange={handleOnChange} name="price" value={product.price}/>
                <label>Brand</label>
                <input type="text" onChange={handleOnChange} name="brand" value={product.brand}/>
                <label>Stock</label>
                <input type="number" onChange={handleOnChange} name="stock" value={product.stock}/>
                <label>Description</label>
                <textarea rows={5} onChange={handleOnChange} name="description" value={product.description}/>
                <label>Category</label>
                <input type="text" onChange={handleOnChange} name="category" value={product.category}/>
                <label>Image</label>
                <input type="file"/>
                <label>Rating</label>
                <input type="number" onChange={handleOnChange} name="rating" value={product.rating}/>
                <label>Number of Reviews</label>
                <input type="text" onChange={handleOnChange} name="numRev" value={product.numRev}/>
                <label>Production Metrics</label>
                <input type="file" accept=".json"/>
            </form>
            <div className="bcn-container">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className="bcn-form">
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
            handleChange={(e) => handleFormFieldChange("BiodiversityUsage", e)}
          />
          <div className="bcn-buttons">
            <button
              type="button"
              onClick={onClickHandler}
              className="connect-button"
            >
              Connect
            </button>
            <button className="bcn-submit" type="sumbit">
              Register
            </button>
          </div>
        </div>
      </form>
      {qrData && (
        <div className="qrCode">
          <span className="f">Product Registered Successfully </span>
          <div className="">
            <img src={url} alt="qrcode" />
          </div>
        </div>
      )}
    </div>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default AddProduct