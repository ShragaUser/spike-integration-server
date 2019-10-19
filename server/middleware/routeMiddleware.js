const path = require("path");
const { cacheWrapper } = require(path.resolve(__dirname, "../utils/cacheHandler"));

const getData = async (req, res, next) => {
    return "Data!";
};

const applyRouteMiddleware = (app) => {
    app.use('/persons/domainUser/:id', cacheWrapper(getData));
}

module.exports = { applyRouteMiddleware };