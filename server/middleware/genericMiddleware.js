const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require("morgan");

const isAlive = res => res.status(200).send('Server Is Up');


const applyGenericMiddleware = (app) => {

    app.use('/IsAlive', isAlive);
    app.use('/health', isAlive);

    app.use(logger('dev'));

    app.use(helmet());
    app.use(cors({
        origin: '*'
    }));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(cookieParser());
}

module.exports = { applyGenericMiddleware };