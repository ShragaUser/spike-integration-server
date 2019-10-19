const redisCacheMiddleware = require("blueai-redis-cache-middleware");
const path = require("path");
const { redisHost } = require(path.resolve(__dirname, "../../config/config"))();


/**
 * cacheWrapper accepts a function(req,res,next) that return a value of {err, respone}.
 * its meant to cache responses from external apis (using axios) and serve cached response when available
 * it parses req.body + req.path to create a unique key for any request
 * cache is updated with every request ( meaning every second request client recieves response from the last request)
 * usage is to your discretion!
 */
const cacheWrapper = redisCacheMiddleware(redisHost);

module.exports = { cacheWrapper };
