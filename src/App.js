import React, { Component } from "react";
// import { productorsProximService } from "./services/ProductorsProximService";
import { productorsProximService } from "./services/ProductorsProximService";
import { llicenciesComercialsService } from "./services/LlicenciesComercialsService";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const divInfo = {
  position: "absolute",
  background: "white",
  zIndex: "999",
  top: "4rem",
  left: "1rem",
  padding: "10px",
  borderRadius: "5px",
};
const videcallIcon = {
  fontSize: "2rem",
};

const noStyle = {
  textDecoration: "none",
  color: "black",
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
      info: "",
    };
  }

  componentDidMount() {
    // this.loadAllLlicenciesComercials();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_GEOCODE_API_KEY);
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
            lng: element.lng,
          }}
          onClick={() => this.showMarkerInfo(element)}
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
    // añadir valores de lat y long
    // let productors = [];
    // for (let index = 0; index < res.length; index++) {
    //   const element = res[index];
    // Get latidude & longitude from address.
    //   Geocode.fromAddress(
    //     element.adreca + element.municipi + element.codipostal
    //   ).then(
    //     (response) => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       console.log("lat, lng");
    //       console.log(lat, lng);

    //       const newEl = { ...element, lat, lng };
    //       productors.push(newEl);
    //       console.log("productors");
    //       console.log(productors);
    //       this.setState({ productorsProxim: productors });
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }
    console.log("res loadAllProductors");
    console.log(res);
    this.setState({ productorsProxim: res, isLoading: false });
  };

  showMarkerInfo = (info) => {
    this.setState({ info });
  };

  render() {
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    } else {
      return (
        <>
          {this.state.info !== "" && (
            <div style={divInfo}>
              <p>
                <strong>Denominació: </strong>
                {this.state.info.denominaci}
              </p>
              {/* <p>
                <strong>Num acreditació: </strong>
                {this.state.info.num_acreditacio}
              </p> */}
              <p>
                <strong>Nom empresa: </strong>
                {this.state.info.nomempresa}
              </p>
              <p>
                <strong> Adreça: </strong>
                {this.state.info.adreca},&nbsp;{this.state.info.municipi}
              </p>
              {/* <p>
                <strong>Comarca: </strong>
                {this.state.info.comarca}
              </p> */}
              <p>
                <strong>Productes: </strong>
                {this.state.info.productes}
              </p>
              {/* <p>
                <strong>Venda circuit curt: </strong>
                {this.state.info.venda_circuit_curt}
              </p> */}
              <p>
                <strong>Teléfon: </strong>
                {this.state.info.tel_fon}
              </p>
              <p>
                <strong>Correu: </strong>
                {this.state.info.correu}
              </p>
              <p>
                <strong>Taulell virtual: </strong>
                <a
                  style={noStyle}
                  href={
                    "https://meet.jit.si/" + this.state.info.num_acreditacio
                  }
                >
                  Videotrucada{" "}
                  <span style={videcallIcon} role="img" aria-label="camera">
                    🎦
                  </span>
                </a>
              </p>
              <iframe
                src={"https://meet.jit.si/" + this.state.info.num_acreditacio}
                height="500"
                width="500"
                allow="camera;microphone"
              ></iframe>
            </div>
          )}
          <div>
            <Map
              google={this.props.google}
              zoom={10}
              style={mapStyles}
              initialCenter={{
                lat: 41.3851,
                lng: 2.1734,
              }}
            >
              {/* {this.displayMarkers()} */}
              {/* {this.displayllicencies()} */}
              {this.displayProductors()}
            </Map>
          </div>
        </>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
})(MapContainer);
