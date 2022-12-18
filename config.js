"use strict";

require('dotenv').config()

const PORT = +process.env.PORT || 3001;
console.log("PORT:".yellow, PORT.toString());

const HNS_NODE_ADDRESS = process.env.HNS_NODE_ADDRESS
const HNS_NODE_AUTH = process.env.HNS_NODE_AUTH

module.exports = { PORT, HNS_NODE_ADDRESS, HNS_NODE_AUTH }
