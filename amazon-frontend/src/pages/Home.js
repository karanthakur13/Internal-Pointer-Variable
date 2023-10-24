import React,{useEffect, useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ProductList from '../components/ProductList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css"
import Product from '../components/Product'
import { listProducts } from '../actions/ProdcutActions'
import HomePageRow from '../components/HomePageRow';
import LoadingBox from '../components/LoadingBox';

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    const productList = useSelector( state => state.productList);
    const {loading,error,products,productListByCategory} = productList;
    
    console.log(productListByCategory);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 900,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 680,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }  
            },
            
        ]
    }

    return (
        <div className="home-page-container">

            <div className="banner-container">

                <img src='/AmazonGreatGreenSale.png'/>
            
            </div>
            
            <div className='home-products'>
            {loading?<LoadingBox/>:
                productListByCategory.map((productRow) => {
                    return <HomePageRow productList={productRow}/>
                })
            }
            </div>


            <div className="home-product-slider">

                <h2 className="sec-title">More Products</h2>

                <Slider {...settings2}>

                    {products && products.slice(0,20).map((product)=>{
                            return(
                                <Product key={product._id} product={product} /> 
                            )
                        })
                    }

                </Slider>
            </div>

        </div>
    )
}

export default Home
