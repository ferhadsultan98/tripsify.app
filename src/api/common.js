import client from "./core/client.js";

export const commonService = {
  getCountries: () => client.get("/country/"),
  getCities: (countryId) => client.get(`/city/?country=${countryId}`),
};
