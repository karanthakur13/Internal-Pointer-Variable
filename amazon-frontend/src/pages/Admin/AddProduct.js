import { useDispatch } from "react-redux";
import "../../styles/AddProduct.css";
import { useState, useEffect } from "react";
import { addProduct } from "../../actions/ProdcutActions";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const submit = () => {
    console.log(product);
    dispatch(addProduct(product));
  };

  const { contract } = useContract(
    "0xA85D1Ae5157E6c6eEd906cDd20800f753a15429a"
  );

  const handleOnChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  function calculateScore(productData, weights) {
    let score = 0;

    for (const factor in weights) {
      if (
        weights.hasOwnProperty(factor) &&
        productData.hasOwnProperty(factor)
      ) {
        score += productData[factor] * weights[factor];
      }
    }

    const maxPossibleScore = 1000;
    const normalizedScore = (score / maxPossibleScore) * 100;

    return normalizedScore;
  }

  let productData = {};

  const weights = {
    carbon_emissions: 30,
    water_usage: 20,
    energy_efficiency: 10,
    waste_generation: 25,
    renewable_energy_usage: 10,
  };

  const getM = async () => {
    const pId = 3;
    const metric = await contract.call("getProduct", [pId]);

    productData.carbon_emissions = parseInt(metric[1]);
    productData.water_usage = parseInt(metric[2]);
    productData.energy_efficiency = parseInt(metric[3]);
    productData.waste_generation = parseInt(metric[4]);
    productData.renewable_energy_usage = parseInt(metric[5]);

    const score = calculateScore(productData, weights);
    console.log(score);
  };

  return (
    <div className="addProduct">
      <form>
        <label>Name</label>
        <input
          type="text"
          onChange={handleOnChange}
          name="name"
          value={product.name}
        />
        <label>Price</label>
        <input
          type="number"
          onChange={handleOnChange}
          name="price"
          value={product.price}
        />
        <label>Brand</label>
        <input
          type="text"
          onChange={handleOnChange}
          name="brand"
          value={product.brand}
        />
        <label>Stock</label>
        <input
          type="number"
          onChange={handleOnChange}
          name="stock"
          value={product.stock}
        />
        <label>Description</label>
        <textarea
          rows={5}
          onChange={handleOnChange}
          name="description"
          value={product.description}
        />
        <label>Category</label>
        <input
          type="text"
          onChange={handleOnChange}
          name="category"
          value={product.category}
        />
        <label>Image</label>
        <input type="file" />
        <label>Rating</label>
        <input
          type="number"
          onChange={handleOnChange}
          name="rating"
          value={product.rating}
        />
        <label>Number of Reviews</label>
        <input
          type="text"
          onChange={handleOnChange}
          name="numRev"
          value={product.numRev}
        />
        <label>Production Metrics</label>
        <input type="file" accept=".json" />
      </form>
      <button onClick={submit}>Submit</button>
      <button onClick={getM}>GET</button>
    </div>
  );
};

export default AddProduct;