import Product from "./Product"
import "../styles/HomePageRow.css"
import GreenProduct from "./GreenProduct"

import Slider from "react-slick";




const GreenHomePageRow = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 4
    };
    return (
        <Slider {...settings}>
            <div>
                {props.productList != undefined ?
                    <div className="products-container">
                        <h1>{props.productList.category}</h1>
                        <hr />
                        <div className="products">
                            {props.productList.products.map((product) => <GreenProduct product={product} />)}
                        </div>
                    </div> : null
                }
            </div>
        </Slider>

    )
}

export default GreenHomePageRow