import { useDispatch } from "react-redux"
import "../../styles/AddProduct.css"
import { useState,useEffect } from "react";
import { addProduct } from "../../actions/ProdcutActions";

const AddProduct = () => {

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
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default AddProduct