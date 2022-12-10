"use strict";

const express = require("express")
const axios = require("axios")
const { BadRequestError } = require("./errors")
const router = express.Router()
const { NODEADDRESS, NODEAUTH } = require("./secrets");


router.get("/n/:name", async function (req, res, next) {

  const config = {
    method: 'post',
    url: NODEADDRESS,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
    data : JSON.stringify({
      "jsonrpc": "2.0",
      "method": 'getnameinfo',
      "params": [req.params.name] })
  }

  try {
    const info = await axios(config)
    return res.json(info.data)
  } catch (err) {
    return next(err)
  }

})

router.get("/nh/:hash", async function (req, res, next) {

  const config = {
    method: 'post',
    url: NODEADDRESS,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
    data : JSON.stringify({
      "jsonrpc": "2.0",
      "method": 'getnamebyhash',
      "params": [req.params.hash] })
  }

  try {
    const info = await axios(config)
    return res.json(info.data)
  } catch (err) {
    return next(err)
  }

})

router.get("/t/:txid", async function (req, res, next) {

  const config = {
    method: 'get',
    url: `${NODEADDRESS}/tx/${req.params.txid}`,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
  }

  try {
    const info = await axios(config)
    return res.json(info.data)
  } catch (err) {
    return next(err)
  }

})

router.get("/a/:address", async function (req, res, next) {

  const config = {
    method: 'get',
    url: `${NODEADDRESS}/coin/address/${req.params.address}`,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
  }

  try {
    const info = await axios(config)
    return res.json(info.data)
  } catch (err) {
    return next(err)
  }

})

module.exports = router;
