# [Spike](https://github.com/rabiran/OSpike) integration server template

This REPO is a Spike integration template that can be used to recieve oAuth tokens from Spike OAuth2 authorization server. 

### Dependencies
This template requires a running [Redis](https://redis.io/) server instance running and available.

### Install
```
cd ./spike-integration-server
npm install 
```

### Docker
```
docker-compose up -d -p 8000:8000 
```

### Configurable Environment variables
All Environment variables can be set with a ```.env``` file in project root folder.

defaults are set in ```./config/config.js``` and can be changed manually.
* _redisHost_: url to redis host 
* _ClientId_: Spike given ClientId 
* _ClientSecret_: Spike given ClientSecret 
* _spikeURL_: url to Spike server instance 
* _apiURL_: url to api that requires Spike access_token
* _tokenGrantType_: type of grant requested from Spike for the access_token
* _tokenAudience_: access_token audience ( same as api )
* _tokenRedisKeyName_: key to save token in redis
* _spikePublicKeyRelativePath_: path to Spike public key for jwt verification ( relative to ```./config/```)


### Where to personalize code? 
This template is A Mostly Generic Express.js api. 

All Spike handling code is in: ```./server/utils/getToken```

All routing and enpoint handling is in: ```./server/middleware/routeMiddleware```

All redis handling code is in: ```./server/utils/redishandler```

#### This template utilizes [blueai-redis-cache-middleware](https://www.npmjs.com/package/blueai-redis-cache-middleware) - usage of this library is optional. default routing function use it but can be changed any time: 

blueai-redis-cache-middleware initialization is in: ```./server/utils/cacheHandler``` it exports a cacheWrapper Function:
* cacheWrapper accepts a function(req,res,next) that return a value of {err, respone}.
* its meant to cache responses from external apis (using axios) and serve cached response when available
* it parses req.body + req.path to create a unique key for any request
* cache is updated with every request ( meaning every second request client recieves response from the last request)
* usage is to your discretion!






