require("babel-register");

const app = require('./src/app');

try {
    app();
} catch (err) {
    console.log(err);
}
