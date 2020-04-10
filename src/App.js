import React, { Component } from "react";
import { productorsProximService } from "./services/ProductorsProximService";
import { llicenciesComercialsService } from "./services/LlicenciesComercialsService";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";
import InfoWindowEx from "./components/InfoWindowEx";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const divInfoStyle = {
  position: "absolute",
  background: "white",
  zIndex: "999",
  top: "4rem",
  left: "1rem",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.55)",
};

const noStyle = {
  textDecoration: "none",
  color: "black",
};
const closeIconStyle = {
  cursor: "pointer",
  float: "right",
  width: "32px",
};
const imgStyle = {
  verticalAlign: "middle",
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
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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
          title={element.denominaci}
          key={index}
          id={index}
          position={{
            lat: element.lat,
            lng: element.lng,
          }}
          // onClick={() => this.showMarkerInfo(element)}
          icon={"./img/logo50x50.png"}
          onClick={this.onMarkerClick}
          name={"Current location"}
          info={element}
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
  hideMarkerInfo = () => {
    this.setState({ info: "" });
  };

  getRoomName = (info) => {
    const roomName = info.replace(/\//g, "_");
    return roomName;
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      info: "",
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        info: "",
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    } else {
      return (
        <>
          {this.state.info !== "" && (
            <div style={divInfoStyle}>
              <img
                src="./img/close.png"
                onClick={() => this.hideMarkerInfo()}
                style={closeIconStyle}
              />
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
                    "./TD/t.html?roomName=" +
                    this.getRoomName(this.state.info.num_acreditacio)
                  }
                  target="_blank"
                >
                  Videotrucada <img src="./img/phonebtn.png" />
                </a>
              </p>
              {/* <iframe
                src={"https://meet.jit.si/" + this.state.info.num_acreditacio}
                height="500"
                width="500"
                allow="camera;microphone"
              ></iframe> */}
              {/* <iframe
                src={
                  "./TD/t.html?roomName=" +
                  this.getRoomName(this.state.info.num_acreditacio)
                }
                height="500"
                width="500"
                allow="camera;microphone"
              ></iframe> */}
            </div>
          )}
          <div>
            <Map
              google={this.props.google}
              zoom={15}
              style={mapStyle}
              initialCenter={{
                lat: 41.3851,
                lng: 2.1734,
              }}
              onClick={this.onMapClicked}
            >
              {/* {this.displayMarkers()} */}
              {/* {this.displayllicencies()} */}
              {this.displayProductors()}
              <InfoWindowEx
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h3>
                    {this.state.selectedPlace.title}{" "}
                    <img style={imgStyle} src="./img/openboard.png" />
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      this.showMarkerInfo(this.state.selectedPlace.info)
                    }
                  >
                    Veure detalls
                  </button>
                </div>
              </InfoWindowEx>
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
