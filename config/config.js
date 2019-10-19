require('dotenv').config();

const config = () => ({
    redisHost: process.env.REDIS_HOST || 'redis://localhost'
})

module.exports = config;