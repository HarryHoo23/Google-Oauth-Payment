//keys.js
if (process.env.NODE_ENV === 'production') {
    //we are under production development
    module.exports = require('./prod');
} else {
    //we are in development
    module.exports = require('./dev');
}