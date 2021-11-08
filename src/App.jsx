import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import Products from './Components/Products/Products.jsx';

function App() {

  const [qtyApp,setQtyApp] = useState(0)
  const [priceApp,setPriceApp] = useState(0)

  function dataFromProducts(qty){
    setQtyApp(qty)
  }

  function priceFromProducts(price){
    setPriceApp(price)
  }

  return (
    <div>
      <Navbar qtyApp={qtyApp} priceApp={priceApp} />
      <Products dataFromProducts={dataFromProducts} priceFromProducts={priceFromProducts} />
    </div>
  )
}

export default App
