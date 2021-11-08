import React from 'react';
import './Navbar.css';

function Navbar({ qtyApp, priceApp }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark mainColor py-2">

                <div className="container">

                    <a className="navbar-brand" href="/">azizStore</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item text-white cart-box">

                                <span className="badge badge-info">{qtyApp}</span>
                                <span>${priceApp.toFixed(2)}</span>
                                <span className="Cart">
                                    Cart
                                    <i className="fas fa-shopping-cart"></i>
                                </span>

                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
        </>
    )
}

export default Navbar
