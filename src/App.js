import React, { Component } from "react";
import { productorsProximService } from "./services/ProductorsProximService";
import { llicenciesComercialsService } from "./services/LlicenciesComercialsService";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import InfoWindowEx from "./components/InfoWindowEx";
import SimpleTable from "./components/simpleTable";
import BottomNavigation from "./components/bottomNavigation";

const welcomeTitle = {
  borderBottom: "1px solid darkgrey",
  paddingBottom: "16px",
};

const warningStyle = {
  color: "red",
  fontStyle: "italic",
};
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
const testStyle = {
  position: "absolute",
  width: "100%",
  height: "90%",
};
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
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
  margin: "5px",
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
const tableWrapperStyle = {
  height: "90vh",
  overflow: "auto",
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
      showList: false,
      showMap: true,
      warningName: false,
      welcomePage: 0,
    };
  }

  componentDidMount() {
    // this.loadAllLlicenciesComercials();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_GEOCODE_API_KEY);
    this.loadAllProductorsProxim();

    var userName = localStorage.getItem("userName");
    if (userName) {
      this.setState({ userName });
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
    const res = await llicenciesComercialsService.getAll();
    this.setState({ llicenciesComercials: res });
  };
  loadAllProductorsProxim = async () => {
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
    if (name === "" || name === undefined) {
      this.setState({ warningName: true });
    } else {
      localStorage.setItem("userName", name);
      this.setState({ welcomePage: 1, userName: name });
    }
  };

  hideWelcome = () => {
    this.setState({ welcomePage: 0, showWelcome: false });
  };

  updateInputName = (evt) => {
    this.setState({ userInputName: evt.target.value });
  };

  removeUserName = () => {
    localStorage.removeItem("userName");
    this.setState({ userName: null });
  };

  showHideList = (option) => {
    if (option === "show") {
      console.log("set showList to true");
      this.setState({
        showList: true,
        showMap: false,
      });
    } else if (option === "hide") {
      console.log("set showList to false");
      this.setState({
        showList: false,
        showMap: true,
      });
    } else {
      console.log("set showList to " + !this.state.showList);
      this.setState({
        showList: !this.state.showList,
        showMap: !this.state.showMap,
      });
    }
  };
  showHideMap = (option) => {
    if (option === "show") {
      console.log("set showMap to true");
      this.setState({
        showList: false,
        showMap: true,
      });
    } else if (option === "hide") {
      console.log("set showMap to false");
      this.setState({
        showList: true,
        showMap: false,
      });
    } else {
      console.log("set showMap to " + !this.state.showMap);
      this.setState({
        showList: !this.state.showList,
        showMap: !this.state.showMap,
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    } else {
      return (
        <>
          {this.state.showList && (
            <div style={tableWrapperStyle}>
              <SimpleTable
                productorsProxim={this.state.productorsProxim}
                callShowHideList={() => this.showHideList()}
              />
            </div>
          )}
          {this.state.showWelcome && (
            <div style={containerWelcomeStyle}>
              <div style={welcomeStyle}>
                {!this.state.userName && (
                  <>
                    <p>
                      <img alt="girl" src="./img/girl150x150.png" />
                    </p>
                    <p>És la primera vegada que entres?</p>
                    <p>BENVINGUT/DA!</p>
                    <p>Com et dius?</p>
                    <p>
                      <input
                        value={this.state.inputName}
                        onInput={(evt) => this.updateInputName(evt)}
                        type="text"
                      ></input>{" "}
                      <img
                        alt="next"
                        onClick={() => this.setUserName()}
                        style={imgBtnStyle}
                        src="./img/forward.png"
                      />
                    </p>
                    {this.state.warningName && (
                      <div style={warningStyle}>
                        Si us plau escriu el teu nom
                      </div>
                    )}
                  </>
                )}

                {this.state.welcomePage === 1 && (
                  <div>
                    <h2 style={welcomeTitle}>Segueix els següents passos:</h2>
                    <p>
                      <b>1-</b> Volta pel mapa fins trobar el teu comerç de
                      proximitat.
                      <img
                        alt="logo"
                        style={imgStyle}
                        src="./img/logo_x64.png"
                      />
                    </p>
                    <p>
                      <b>2-</b> Clica-hi a sobre per fer una videoconferència o
                      veure més detalls{" "}
                      <img
                        alt="girl"
                        style={imgStyle}
                        src="./img/phoneGirlx64.png"
                      />
                    </p>
                    <p>
                      <b>3-</b> Ja hi pots contactar de manera directa!{" "}
                      <img
                        alt="girl"
                        style={imgStyle}
                        src="./img/girlHeart_x64.png"
                      />
                    </p>
                    <p>
                      <img
                        alt="next"
                        onClick={() => this.hideWelcome()}
                        style={imgBtnStyle}
                        src="./img/forward.png"
                      />
                    </p>
                  </div>
                )}

                {this.state.userName && this.state.welcomePage === 0 && (
                  <>
                    <p>
                      <img alt="girlSmile" src="./img/girlSmile150x150.png" />
                    </p>
                    <p>
                      Hola <b>{this.state.userName}</b>
                    </p>
                    <p>
                      Benvolgut/da{" "}
                      <img
                        alt="next"
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
              {/* <div style={welcomeStyle}>
                Si ets un productor <br />
                accedeix a la teva secció
                <br />
                <a style={noStyle} href="./productor/index.html">
                  <img src="./img/order.png" />
                </a>
              </div> */}
            </div>
          )}
          {/* {!this.state.showWelcome && (
            <div
              style={containerUserName}
              onClick={() => this.setState({ showWelcome: true })}
            >
              <img style={imgStyle} src="./img/user.png" />{" "}
              <b>{this.state.userName}</b>
            </div>
          )} */}
          {/* <div style={containerMenuBtn} onClick={() => this.showHideList()}>
            <img style={imgStyle} src="./img/menu.png" />{" "}
          </div> */}
          {this.state.info !== "" && (
            <div style={divInfoStyle}>
              {/* <img
                src="./img/close.png"
                onClick={() => this.hideMarkerInfo()}
                style={closeIconStyle}
              /> */}
              <p style={elInfoStyle}>
                <b>Denominació: </b>
                <br />
                {this.state.info.denominaci}
              </p>
              {/* <p>
                <b>Num acreditació: </b>
                {this.state.info.num_acreditacio}
              </p> */}
              <p style={elInfoStyle}>
                <b>Nom empresa: </b>
                <br />
                {this.state.info.nomempresa}
              </p>
              <p style={elInfoStyle}>
                <b>Marca comercial: </b>
                <br />
                {this.state.info.marca_comercial}
              </p>
              <p style={elInfoStyle}>
                <b> Adreça: </b>
                <br />
                {this.state.info.adreca},&nbsp;{this.state.info.municipi}
              </p>
              {/* <p>
                <b>Comarca: </b>
                {this.state.info.comarca}
              </p> */}
              <p style={elInfoStyle}>
                <b>Productes: </b>
                <br />
                {this.state.info.productes}
              </p>
              {/* <p>
                <b>Venda circuit curt: </b>
                {this.state.info.venda_circuit_curt}
              </p> */}
              <p style={elInfoStyle}>
                <b>Telèfon: </b>
                <br />
                <a style={noStyle} href={"tel:" + this.state.info.tel_fon}>
                  {this.state.info.tel_fon}
                </a>
              </p>
              <p style={elInfoStyle}>
                <b>Correu: </b>
                <br />
                <a style={noStyle} href={" mailto:" + this.state.info.correu}>
                  {this.state.info.correu}
                </a>
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
                  rel="noopener noreferrer"
                >
                  Videoconferència{" "}
                  <img
                    alt="girl"
                    style={imgStyle}
                    src="./img/phoneGirlx64.png"
                  />
                </a>
              </p>

              <p style={elInfoStyle}>
                <a
                  style={canviStyle}
                  href=" mailto:joanruedapau@gmail.com?subject=He%20trobat%20dades%20incorrectes"
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
          {this.state.showMap && (
            <div style={testStyle}>
              <Map
                google={this.props.google}
                zoom={15}
                containerStyle={containerStyle}
                initialCenter={{
                  lat: 41.3851,
                  lng: 2.1734,
                }}
                onClick={this.onMapClicked}
              >
                {this.displayProductors()}
                <InfoWindowEx
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h3>{this.state.selectedPlace.title} </h3>
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
                          rel="noopener noreferrer"
                        >
                          <img alt="girl" src="./img/phoneGirlx64.png" />
                        </a>
                      )}
                    </p>
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
          )}
          <BottomNavigation
            callShowHideList={(e) => this.showHideList(e)}
            callShowHideMap={(e) => this.showHideMap(e)}
            callShowWelcome={() => this.setState({ showWelcome: true })}
            userName={this.state.userName}
          />
        </>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
})(MapContainer);
