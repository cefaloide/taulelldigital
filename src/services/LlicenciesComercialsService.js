import axios from "axios";

const BASE_API_URL =
  "https://analisi.transparenciacatalunya.cat/resource/8dtv-rvgy.json";

export const llicenciesComercialsService = {
  getAll,
};

async function getAll() {
  const data = await axios
    .get(`${BASE_API_URL}`)
    .then((response) => response.data)
    .catch((error) => {
      const errorMsg = "Error getting data";
      console.log(errorMsg);
      return errorMsg;
    });

  return data;
}
