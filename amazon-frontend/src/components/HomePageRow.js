import Product from "./Product"
import "../styles/HomePageRow.css"

const HomePageRow = (props) => {

    return (
        <div>
            {props.productList != undefined ?
                <div className="products-container">
                    <h1>{props.productList.category}</h1>
                    <hr />
                    <div className="products">
                        {props.productList.products.slice(0, 20).map((product) => <Product product={product} />)}
                    </div>
                </div> : null
            }
        </div>
    )
}

export default HomePageRow