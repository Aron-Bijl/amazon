import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { ADD_TO_CART, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen (){
    const productId = document.location.pathname.split("/")[document.location.pathname.split("/").length - 1];
    const qty = window.location.search
    ? Number(window.location.search.split('=')[1])
    : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(ADD_TO_CART(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id));
    }

    let navigate = useNavigate();
    const checkOutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox> 
                    :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={ item.product } > 
                                        <div className="row"> 
                                            <div>  
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="small">
                                                </img>
                                            </div> 
                                            <div  className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={ e =>  
                                                    dispatch(
                                                        ADD_TO_CART(item.product, Number(e.target.value))
                                                    )
                                                    }
                                                    >
                                                        {[...Array(item.countInStock).keys()].map( x => (
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeFromCartHandler(item.product)
                                                }>
                                                    Remove
                                                </button>
                                            </div>
                                        </div> 
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({ cartItems.reduce((a, c) => a + c.qty, 0) } items) : ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Proceed to Check-out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}