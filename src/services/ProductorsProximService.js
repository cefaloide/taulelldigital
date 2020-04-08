import axios from "axios";

const BASE_API_URL =
  "https://analisi.transparenciacatalunya.cat/resource/xmyy-7xqi.json";

export const productorsProximService = {
  getAll,
};

async function getAll() {
  const data = await axios
    .get(`${BASE_API_URL}`)
    .then((response) => {
      // return response.data;
      //Retur JSON with lat lng for testing purposes
      const data = require("./productorsProximLatLng.json");
      return data;
    })
    .catch((error) => {
      const errorMsg = "Error getting data";
      console.log(errorMsg);
      return errorMsg;
    });

  return data;
}
