import React, { useState, useEffect } from "react";
import "./App.css";

import { productorsProximService } from "./services/ProductorsProximService";

function App() {
  const [productorsProxim, setProductorsProxim] = useState();

  useEffect(() => {
    loadAllProductorsProxim();
  }, []);

  const loadAllProductorsProxim = async () => {
    console.log("loadAllProductors");
    const res = await productorsProximService.getAll();
    setProductorsProxim(res);
  };

  return <div className="App">{JSON.stringify(productorsProxim)}</div>;
}

export default App;
