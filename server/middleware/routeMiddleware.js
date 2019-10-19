const path = require("path");
const axios = require("axios");

const { cacheWrapper } = require(path.resolve(__dirname, "../utils/cacheHandler"));
const { getToken } = require(path.resolve(__dirname, "../utils/getToken"));
const { apiURL } = require(path.resolve(__dirname, "../../config/config"))();

const getAuthHeader = token => ({
    'Authorization': `${token}`
})

const getDataFromProtectedAPI = async (req, res, next) => {
    const token = await getToken();
    const headers = getAuthHeader();
    try {
        const response = await axios.get(`${apiURL}`, { headers });
        return { response };
    }
    catch (err) { return { err } }
}

const postDataToProtectedAPI = async (req, res, next) => {
    const token = await getToken();
    const headers = getAuthHeader();
    const body = { example: true };
    try {
        const response = await axios.post(`${apiURL}`, body, { headers });
        return { response };
    }
    catch (err) { return { err } }
}

const applyRouteMiddleware = (app) => {
    // uses cacheWrapper to cache api requests
    // user discretion is requested
    // cacheWrapper explenation in ../utils/cacheWrapper
    app.get('/', cacheWrapper(getDataFromProtectedAPI));
    app.post('/', cacheWrapper(postDataToProtectedAPI));
}

module.exports = { applyRouteMiddleware };