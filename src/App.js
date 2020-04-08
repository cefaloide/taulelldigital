// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { productorsProximService } from "./services/ProductorsProximService";
// import { Map, GoogleApiWrapper } from "google-maps-react";

// function App() {
//   const [productorsProxim, setProductorsProxim] = useState();

//   useEffect(() => {
//     // loadAllProductorsProxim();
//   }, []);

//   const loadAllProductorsProxim = async () => {
//     console.log("loadAllProductors");
//     const res = await productorsProximService.getAll();
//     setProductorsProxim(res);
//   };

//   return (
//     <Map
//       google={this.props.google}
//       zoom={8}
//       initialCenter={{ lat: 47.444, lng: -122.176 }}
//     />
//   );
// }

// export default App;

import React, { Component } from "react";
// import { productorsProximService } from "./services/ProductorsProximService";
import { productorsProximService } from "./services/ProductorsProximService";
import { llicenciesComercialsService } from "./services/LlicenciesComercialsService";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 },
      ],
      llicenciesComercials: [],
      productorsProxim: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    // this.loadAllLlicenciesComercials();
    this.loadAllProductorsProxim();
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  displayllicencies = () => {
    return this.state.llicenciesComercials.map((element, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: element.utm_x,
            lng: element.utm_y,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  displayProductors = () => {
    return this.state.productorsProxim.map((element, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: element.lat,
            lng: element.long,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  loadAllLlicenciesComercials = async () => {
    console.log("loadAllLlicenciesComercials");
    const res = await llicenciesComercialsService.getAll();
    // setProductorsProxim(res);
    this.setState({ llicenciesComercials: res });
    console.log("res loadAllLlicenciesComercials");
    console.log(res);
  };
  loadAllProductorsProxim = async () => {
    console.log("loadAllProductors");
    const res = await productorsProximService.getAll();
    // TODO añadir valores de lat y long
    res.map((element, index) => {
      return element;
    });
    this.setState({ productorsProxim: res });
    console.log("res loadAllProductors");
    console.log(res);
  };

  render() {
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    } else {
      return (
        <div>
          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{
              lat: 47.49855629475769,
              lng: -122.14184416996333,
            }}
          >
            {/* {this.displayMarkers()} */}
            {/* {this.displayllicencies()} */}
            {this.displayProductors()}
          </Map>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
})(MapContainer);
