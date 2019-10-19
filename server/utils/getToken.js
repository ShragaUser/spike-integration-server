/* eslint-disable require-atomic-updates */
const njwt = require("njwt");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const { getValue, setValue } = require(path.resolve(__dirname, "./redisHandler"));
const { ClientId, ClientSecret, spikeURL, tokenGrantType, tokenAudience, tokenRedisKeyName, spikePublicKeyRelativePath } = require(path.resolve(__dirname, "../../config/config"))();

let token = null;

const base64 = data => (new Buffer(data)).toString('base64');

const getSigningKey = function () {
    if (this.key)
        return this.key;
    this.key = fs.readFileSync(path.resolve(__dirname, '../../config', spikePublicKeyRelativePath), 'utf8');
    return this.key;
};

const generateSpikeAuthorizationHeaders = () => ({
    'Authorization': `Basic ${base64(ClientId + ":" + ClientSecret)}`,
    'Content-Type': 'application/json'
});

const generateSpikeBodyParams = () => ({
    'grant_type': tokenGrantType,
    'audience': tokenAudience,

    // uncomment next two lines if authetication needs to be send in request body as well as header
    // 'client_id': ClientId,
    // 'client_secret': ClientSecret
});

const handleTokenFromSpike = async () => {
    const headers = generateSpikeAuthorizationHeaders();
    const body = generateSpikeBodyParams();

    try {
        const { data } = await axios.post(spikeURL, { ...body }, { headers });
        if (!data)
            return { err: 'No reponse from Spike' };
        const { access_token } = data;
        await setValue(tokenRedisKeyName, access_token);
        return { newToken: access_token };
    }
    catch (err) { return { err } }
}

const isValid = unvalidatedToken => {
    return new Promise((resolve, reject) => {
        if (unvalidatedToken) {
            njwt.verify(unvalidatedToken, getSigningKey(), 'RS256', (err, verified) => {
                if (err)
                    return resolve(false);
                return resolve(true);
            })
        }
        else
            resolve(false);
    })
}

const getTokenFromRedis = async () => {
    try {
        const redisToken = await getValue(tokenRedisKeyName);
        if (await isValid(redisToken))
            return { redisToken };
    }
    catch (err) { return { err } }
    return { err: 'Invalid token from redis' };
}

const getAndSaveNewToken = async () => {
    const [{ err: spikeError, newToken }, { err: redisError, redisToken }] = await Promise.all([handleTokenFromSpike(), getTokenFromRedis()]);
    if (spikeError && redisError) {
        console.error(`spikeError: ${spikeError}`);
        console.error(`redisError: ${redisError}`);
        return getAndSaveNewToken();
    }
    return newToken || redisToken;
}

const getToken = async () => {
    if (await isValid(token))
        return token;
    token = await getAndSaveNewToken();
    return token;
}

module.exports = { getToken };

