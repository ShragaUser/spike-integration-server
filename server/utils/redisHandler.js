const redis = require("redis");
const path = require("path");
const { promisify } = require("util");
const { redisHost } = require(path.resolve(__dirname, "../../config/config"))();

const client = redis.createClient(redisHost);
const getAsync = promisify(client.get).bind(client);

client.on("connect", () => {
    console.log("Redis connected");
})

client.on("error", (err) => {
    console.error("Redis Error: " + err);
})

let redisHandler = {};

const getValue = async (key) => await getAsync(key);
const setValue = async (key, value) => client.set(key, value);

redisHandler.getValue = getValue;
redisHandler.setValue = setValue;

module.exports = redisHandler;
