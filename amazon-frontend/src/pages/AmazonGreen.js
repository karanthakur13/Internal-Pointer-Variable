import { useEffect, useState } from "react"
import "../styles/AmazonGreen.css"
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import HomePageRow from "../components/HomePageRow";

const AmazonGreen = () => {

    const [category,setCategory] = useState(null);
    
    const data = useSelector(state => state.productList);
    const {loading,error,products,productListByCategory} = data;
    const dispatch = useDispatch();


    const handleClick = (e) => {
        if(e.target.value == "all"){
            setCategory(null);
        }else{
            setCategory(e.target.value)
        }
    }

    return (
        <div className="amzGreen">
            <div className="greenHeader">
                <h1 onClick={handleClick} value="all">green</h1>
                <button onClick={handleClick} value="pastPurchases">Past Purchases</button>
                <button onClick={handleClick} value="mobileAndAccessories">Mobile and Accessories</button>
                <button onClick={handleClick} value="personHygiene">Personal Hygiene</button>
                <button onClick={handleClick} value="furniture">Furniture</button>
                <button onClick={handleClick} value="backpacks">Backpacks</button>
                <button onClick={handleClick} value="sports">Sports</button>
                <button onClick={handleClick} value="computer">Computers</button>
            </div>
            <div className="greenProducts">
            {productListByCategory?
                productListByCategory.map((productRow) => {
                    return <HomePageRow productList={productRow}/>
                }):null
            }
            </div>
        </div>
    )
}

export default AmazonGreen