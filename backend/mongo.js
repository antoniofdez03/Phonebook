const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

//conexion a mongodb
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = config

const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI

mongoose.connect(connectionString)
    .then(() => {
        logger.info('Database connected')
    }).catch(error => {
        logger.error(error)
    })

process.on('uncaughtException', (error) => {
    logger.error(error)
    mongoose.disconnect()
    process.exit(1)
})