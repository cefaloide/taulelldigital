import React, { Component } from "react";
import { productorsProximService } from "./services/ProductorsProximService";
import { llicenciesComercialsService } from "./services/LlicenciesComercialsService";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";
import InfoWindowEx from "./components/InfoWindowEx";

const cursorPointer = {
  cursor: "pointer",
};
const canviStyle = {
  color: "black",
  fontStyle: "italic",
  textDecoration: "none",
};

const veureDetallStyle = {
  textAlign: "right",
  cursor: "pointer",
};
const mapStyle = {
  width: "100%",
  height: "100%",
};

const containerUserName = {
  position: "absolute",
  top: "10px",
  right: "5rem",
  background: "white",
  padding: "5px",
  zIndex: "998",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.55)",
  cursor: "pointer",
};

const divInfoStyle = {
  display: "flex",
  flexWrap: "wrap",
  position: "absolute",
  background: "white",
  zIndex: "998",
  bottom: "0",
  right: "0",
  left: "0",
  padding: "10px",
  // borderRadius: "5px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.55)",
  justifyContent: "space-between",
};

const elInfoStyle = {
  padding: "5px",
};
const containerWelcomeStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  zIndex: "999",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
};
const welcomeStyle = {
  background: "white",
  top: "15%",
  padding: "15px",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.55)",
  textAlign: "center",
};

const noStyle = {
  textDecoration: "none",
  color: "black",
};
const centerStyle = {
  textAlign: "center",
};

const closeIconStyle = {
  cursor: "pointer",
  float: "right",
  width: "32px",
};
const imgStyle = {
  verticalAlign: "middle",
};
const imgBtnStyle = {
  verticalAlign: "middle",
  cursor: "pointer",
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
      userName: null,
      showWelcome: true,
    };
  }

  componentDidMount() {
    // this.loadAllLlicenciesComercials();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_GEOCODE_API_KEY);
    this.loadAllProductorsProxim();

    var userName = localStorage.getItem("userName");
    console.log("userName");
    console.log(userName);
    if (userName) {
      console.log("SI");
      this.setState({ userName });
    } else {
      console.log("NO");
    }
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

  setUserName = () => {
    console.log("setUserName");
    const name = this.state.userInputName;

    localStorage.setItem("userName", name);
    this.setState({ userName: name });
  };

  hideWelcome = () => {
    this.setState({ showWelcome: false });
  };

  updateInputName = (evt) => {
    this.setState({ userInputName: evt.target.value });
  };

  removeUserName = () => {
    localStorage.removeItem("userName");
    this.setState({ userName: null });
  };

  render() {
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    } else {
      return (
        <>
          {this.state.showWelcome && (
            <div style={containerWelcomeStyle}>
              <div style={welcomeStyle}>
                {!this.state.userName && (
                  <>
                    <p>
                      <img src="./img/girl150x150.png" />
                    </p>
                    <p>Es la primera vegada que entres?</p>
                    <p>BENVINGUT/DA!</p>
                    <p>Com et dius?</p>
                    <p>
                      <input
                        value={this.state.inputName}
                        onInput={(evt) => this.updateInputName(evt)}
                        type="text"
                      ></input>{" "}
                      <img
                        onClick={() => this.setUserName()}
                        style={imgBtnStyle}
                        src="./img/forward.png"
                      />
                    </p>
                  </>
                )}
                {this.state.userName && (
                  <>
                    <p>
                      <img src="./img/girlSmile150x150.png" />
                    </p>
                    <p>
                      Hola <b>{this.state.userName}</b>
                    </p>
                    <p>
                      Benvolgut/da{" "}
                      <img
                        onClick={() => this.hideWelcome()}
                        style={imgBtnStyle}
                        src="./img/forward.png"
                      />
                    </p>
                    <p
                      style={cursorPointer}
                      onClick={() => this.removeUserName()}
                    >
                      <em>El nom no és correcte?</em>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
          {!this.state.showWelcome && (
            <div
              style={containerUserName}
              onClick={() => this.setState({ showWelcome: true })}
            >
              <img style={imgStyle} src="./img/user.png" />{" "}
              <b>{this.state.userName}</b>
            </div>
          )}
          {this.state.info !== "" && (
            <div style={divInfoStyle}>
              {/* <img
                src="./img/close.png"
                onClick={() => this.hideMarkerInfo()}
                style={closeIconStyle}
              /> */}
              <p style={elInfoStyle}>
                <b>Denominació: </b>
                <br></br>
                {this.state.info.denominaci}
              </p>
              {/* <p>
                <b>Num acreditació: </b>
                {this.state.info.num_acreditacio}
              </p> */}
              <p style={elInfoStyle}>
                <b>Nom empresa: </b>
                <br></br>
                {this.state.info.nomempresa}
              </p>
              <p style={elInfoStyle}>
                <b> Adreça: </b>
                <br></br>
                {this.state.info.adreca},&nbsp;{this.state.info.municipi}
              </p>
              {/* <p>
                <b>Comarca: </b>
                {this.state.info.comarca}
              </p> */}
              <p style={elInfoStyle}>
                <b>Productes: </b>
                <br></br>
                {this.state.info.productes}
              </p>
              {/* <p>
                <b>Venda circuit curt: </b>
                {this.state.info.venda_circuit_curt}
              </p> */}
              <p style={elInfoStyle}>
                <b>Telèfon: </b>
                <br></br>
                {this.state.info.tel_fon}
              </p>
              <p style={elInfoStyle}>
                <b>Correu: </b>
                <br></br>
                {this.state.info.correu}
              </p>
              <p style={elInfoStyle}>
                <b>Taulell virtual: </b>
                <a
                  style={noStyle}
                  href={
                    "./TD/t.html?roomName=" +
                    this.getRoomName(this.state.info.num_acreditacio) +
                    "&userName=" +
                    this.state.userName
                  }
                  target="_blank"
                >
                  Videotrucada{" "}
                  <img style={imgStyle} src="./img/phoneGirlx64.png" />
                </a>
              </p>

              <p style={elInfoStyle}>
                <a
                  style={canviStyle}
                  href=" mailto:info@taulelldigital.com?subject=He%20trobat%20dades%20incorrectes"
                >
                  Suggerir un canvi
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
                    {/* <img style={imgStyle} src="./img/openboard.png" /> */}
                  </h3>
                  <p style={centerStyle}>
                    {this.state.selectedPlace.info && (
                      <a
                        style={noStyle}
                        href={
                          "./TD/t.html?roomName=" +
                          this.getRoomName(
                            this.state.selectedPlace.info.num_acreditacio
                          ) +
                          "&userName=" +
                          this.state.userName
                        }
                        target="_blank"
                      >
                        <img src="./img/phoneGirlx64.png" />
                      </a>
                    )}
                  </p>
                  {/* <button
                    type="button"
                    onClick={() =>
                      this.showMarkerInfo(this.state.selectedPlace.info)
                    }
                  >
                    Veure detalls
                  </button> */}
                  <div
                    style={veureDetallStyle}
                    onClick={() =>
                      this.showMarkerInfo(this.state.selectedPlace.info)
                    }
                  >
                    Veure detalls
                  </div>
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
