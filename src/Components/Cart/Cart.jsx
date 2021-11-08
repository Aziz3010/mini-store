import React from 'react';
import './Cart.css';
// import productStore from '../../store.js';

function Cart({ addItem, funcAddItemToCart, removeItem ,deleteItem }) {
    return (
        <>
            <div className="cartSide">
                <h2>Cart Items</h2>
                <div className="items">

                    {addItem.length === 0 ? <h6>Cart Empty</h6> : ""}

                    {addItem.map((value, index) => {
                        return (
                            <div key={index} className="item">
                                {/* image */}
                                <div className="item-image">
                                    <img className="w-100" src={value.image} alt={value.title} />
                                </div>
                                {/* r-side */}
                                <div className="r-side">
                                    {/* title */}
                                    <div className="r-side-title">
                                        <h5>{value.title}</h5>
                                    </div>
                                    {/* price */}
                                    <div className="r-side-price">
                                        <h6>${value.price}</h6>
                                    </div>
                                    {/* btns */}
                                    <div className="r-side-btns">

                                        <button onClick={() => { funcAddItemToCart(value) }} className="btn btn-primary">
                                            <i className="fas fa-plus"></i>
                                        </button>

                                        <span>{value.qty}</span>

                                        <button onClick={() => { removeItem(value) }} className="btn btn-danger">
                                            <i className="fas fa-minus"></i>
                                        </button>

                                        <button onClick={() => { deleteItem(value) }} className="btn btn-danger">
                                            <i className="fas fa-trash"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Cart
