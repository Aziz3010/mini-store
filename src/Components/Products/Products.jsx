import React, { useState, useEffect } from 'react';
import './Products.css';
import productStore from '../../store.js';
import Cart from '../Cart/Cart.jsx';

function Products({ dataFromProducts, priceFromProducts }) {
    const [productShowNum, setProductShowNum] = useState(3);
    const [btnText, setBtnText] = useState("More Products");
    const [btn, setBtn] = useState(true);
    function showMoreProducts() {
        if (productShowNum >= productStore.length) {
            setBtn(false);
            setBtnText("No More");
        } else {
            setProductShowNum(productShowNum + 3);
        }
    }
    const [itemSelected, setItemSelected] = useState([]);
    const [checkClick, setCheckClick] = useState(false);

    function saveToLocalStorage(data) {
        localStorage.setItem("dataSelected", JSON.stringify(data))
    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("dataSelected"))

        if (data != null) {
            setCheckClick(true)
            setItemSelected(data)
        }

    }, [])


    function addItemToCart(item) {
        setCheckClick(true)

        let sameItem = itemSelected.find((elm) => elm.id === item.id)
        if (sameItem) {
            let cartSameIt = itemSelected.map((elm) => elm.id === item.id ? { ...sameItem, qty: sameItem.qty + 1 } : elm)
            setItemSelected(cartSameIt)
            saveToLocalStorage(cartSameIt)
        } else {
            let allItem = [...itemSelected, { ...item, qty: 1 }]
            setItemSelected(allItem)
            saveToLocalStorage(allItem)
        }

        let totalQty = itemSelected.reduce((x, y) => x + y.qty, 0)
        dataFromProducts(totalQty + 1)

        let totalPrices = itemSelected.reduce((x, y) => x + y.qty * y.price, item.price)
        priceFromProducts(totalPrices)

    }


    function removeItem(item) {
        let sameItem = itemSelected.find((elm) => elm.id === item.id)
        if (sameItem.qty > 1) {
            let cartSameIt = itemSelected.map((elm) => elm.id === item.id ? { ...sameItem, qty: sameItem.qty - 1 } : elm)
            setItemSelected(cartSameIt)
            saveToLocalStorage(cartSameIt)

            let totalQty = itemSelected.reduce((x, y) => x + y.qty, 0)
            dataFromProducts(totalQty - 1)

            let totalPrices = itemSelected.reduce((x, y) => (y.qty * y.price) - x, item.price)
            priceFromProducts(totalPrices)
        }

    }

    function deleteItem(item) {
        let cartAfterDelete = itemSelected.filter((elm) => elm.id !== item.id)
        setItemSelected(cartAfterDelete)
        saveToLocalStorage(cartAfterDelete)

        let totalQty = itemSelected.reduce((x, y) => x + y.qty, 0)
        dataFromProducts(totalQty)

        // let totalPrices = itemSelected.reduce((x, y) => x + (y.qty * y.price)  , item.price)
        // priceFromProducts(totalPrices)
        // console.log(totalPrices)

    }

    return (
        <>
            <div className="products">
                <div className="row">
                    {/* products */}
                    {productStore.slice(0, productShowNum).map((value, index) => {
                        return (
                            <div key={index} className="col-lg-4 col-md-6 p-0">
                                <div className="product text-center p-3">

                                    {/* image */}
                                    <div className="image">

                                        <img src={value.image} alt={value.title} />

                                        {/* desc */}
                                        <div className="desc">
                                            <p>{value.description.slice(0, 100) + "..."}</p>
                                        </div>

                                    </div>

                                    {/* title */}
                                    <div className="title">
                                        <h4>{value.title.slice(0, 20) + "..."}</h4>
                                    </div>

                                    {/* price */}
                                    <div className="price">
                                        <h5>${value.price}</h5>
                                    </div>

                                    <button onClick={() => { addItemToCart(value) }} className="btn btn-bg w-100">Add To Cart</button>

                                </div>
                            </div>
                        )
                    })}
                    {/* btn more */}
                    {btn ? <button onClick={showMoreProducts} className="btn m-auto btn-bg px-4">{btnText}</button> : <button onClick={showMoreProducts} className="btn m-auto btn-secondary" disabled>{btnText}</button>}

                </div>

                {checkClick && <Cart addItem={itemSelected} funcAddItemToCart={addItemToCart} removeItem={removeItem} deleteItem={deleteItem} />}

            </div>
        </>
    )
}

export default Products
