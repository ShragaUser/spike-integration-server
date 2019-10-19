const redisCacheMiddleware = require("blueai-redis-cache-middleware");
const path = require("path");
const { redisHost } = require(path.resolve(__dirname, "../../config/config"))();


/**
 * TODO: explain usage
 */
const cacheWrapper = redisCacheMiddleware(redisHost);

module.exports = { cacheWrapper };
