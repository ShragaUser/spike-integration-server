const express = require('express');

const { applyGenericMiddleware } = require("./middleware/genericMiddleware");
const { applyRouteMiddleware } = require("./middleware/routeMiddleware");


const server = () => {
    const app = express();

    applyGenericMiddleware(app);
    applyRouteMiddleware(app);

    return app;
}


module.exports = server;