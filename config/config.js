require('dotenv').config();

const config = () => ({
    redisHost: process.env.REDIS_HOST || 'redis://localhost',
    ClientId: process.env.ClientId || 'ClientId',
    ClientSecret: process.env.ClientSecret || 'ClientSecret',
    spikeURL: process.env.spikeURL || 'http://localhost:8080',
    apiURL: process.env.apiURL || 'http://localhost:3000',
    tokenGrantType: process.env.tokenGrantType || 'client_credentials',
    tokenAudience: process.env.tokenAudience || 'kartoffel',
    tokenRedisKeyName: process.env.tokenRedisKeyName || 'token',
    // path relative to current folder ( config )
    spikePublicKeyRelativePath: process.env.spikePublicKeyRelativePath || './key.pem'
})

module.exports = config;