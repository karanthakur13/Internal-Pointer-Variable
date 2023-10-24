import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import '../styles/Header.css'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/UserAction';
import {
    useAddress,
    useContract,
    useMetamask,
    useContractWrite,
  } from "@thirdweb-dev/react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';

const Header = (props) => {

    const dispatch = useDispatch();

    const [dropdown, setDropDown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);


    const showDropDown = () =>{
        if(dropdown) setDropDown(false);
        else setDropDown(true);
    }

    const showSecondDropDown = () =>{
        if(secondDropdown) setSecondDropdown(false);
        else setSecondDropdown(true);
    }


    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const signOutHandler = () =>{
        dispatch(signout());
    }
    function onClickHandler() {
        console.log("hello");
        connect();
    }
    const connect = useMetamask();

    const [query, setQuery] = useState('');

    console.log(userInfo)

    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/"><img style={{width:'6vw'}} src='/AmazonLogo.png'/></Link>
                    </div>

                    <div className="search-bar">
                        <input className="search-input"
                        onChange={(e)=> setQuery(e.target.value)}
                        placeholder="Search products"
                        value={query}>
                        </input>

                        <div className="search-btn">
                            <Link to={`/searchresults/${query}`}>
                                <img width="50%" src='/Search.png'/>
                            </Link>
                        </div>
                        
                    </div>

                    <ul className="nav-links">
                        <li>
                            {
                                userInfo ? (
                                    <div className="header-dropdown">
                                        
                                        <p onClick={showDropDown}>
                                            <div>
                                                <p>Hello, {userInfo.name}</p>
                                                <span className='header-bold'>Accounts & Lists</span>
                                            </div>
                                            <ArrowDropDownIcon/>
                                        </p>

                                        <ul className={ dropdown? 'dropdown-content show' : 'dropdown-content'}>
                                            <li>
                                               <Link to="/profile">Account</Link> 
                                            </li>
                                            <li>
                                               <Link to="/orderhistory">Order History</Link> 
                                            </li>
                                            {
                                                !userInfo.isAdmin ?
                                                    <li><Link to="/greenCredits">Green Credits</Link> </li>
                                                :null
                                            }
                                            <li>
                                               <Link to="/" onClick={signOutHandler}>Sign out</Link> 
                                            </li>

                                        </ul>
                                    </div>
                                    
                                ) :
                                (
                                    <Link to="/signin"><AccountCircleIcon/></Link>
                                )
                            }
                            
                        </li>

                        {userInfo && userInfo.isAdmin && (
                            <div>
                                <li>
                                <div className="header-dropdown">
                                    <p onClick={showSecondDropDown}>
                                        Admin 
                                        <ArrowDropDownIcon/>
                                    </p>
                            
                                    <ul className={ secondDropdown? 'dropdown-content show' : 'dropdown-content'}>
                                        
                                        <li>
                                           <Link to="/productlist">Products</Link> 
                                        </li>
                                        <li>
                                            <Link to="/addProduct">Add Product</Link>
                                        </li>
                                          
                                    </ul>
                                </div>
                                </li>
                                <li>
                                    <button type="button" onClick={onClickHandler} className="connect-button">Connect</button>
                                </li>
                            </div>
                        )}
                        <li>
                                <Link to="/cart"><ShoppingCartIcon/>
                                {
                                    cartItems.length > 0 && 
                                    (<p className="badge">{cartItems.length}</p>)
                                }
                                    </Link>
                        </li>
                            
                    </ul>
                </div>

                <div className="category-container">
                    <ul>
                        <li><Link to="/category/mobile">Mobile</Link></li>
                        <li><Link to="/category/laptop">Laptop</Link></li>
                        <li><Link to="/category/monitor">Monitor</Link></li>
                        <li><Link to="/category/accessories">Computer Accessories</Link></li>
                        <li><Link to="/category/earphones">Earphones</Link></li>
                        <li><Link to="/amazonGreen"><div style={{backgroundColor:"white",padding:'0 20px',borderRadius:'4px',borderWidth:'2px',borderStyle:"solid",borderColor:"#4AA183"}}><img style={{width:'45px'}} src='AmazonGreen.png'/></div></Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
