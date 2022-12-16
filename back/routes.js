"use strict";

const express = require("express")
const axios = require("axios")
const { BadRequestError } = require("./errors")
const router = express.Router()
const { NODEADDRESS, NODEAUTH } = require("./secrets");

function configRpc(method, params) {
  return {
    method: 'post',
    url: NODEADDRESS,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
    data : JSON.stringify({
      "jsonrpc": "2.0",
      "method": method,
      "params": params })
  }
}

function configHttp(endpoint) {
  return {
    method: 'get',
    url: `${NODEADDRESS}/${endpoint}`,
    headers: { 
      'Authorization': NODEAUTH, 
      'Content-Type': 'application/json' },
  }
}

router.get("/n/:name", async function (req, res, next) {

  try {
    const data = (await axios(configRpc('getnameinfo', [req.params.name]))).data.result
    if (data.info !== null) {
      const renewalBlock = await axios(configRpc('getblockbyheight', [data.info.renewal, true, true]))
      data.info.renewalDate = new Date(renewalBlock.data.result.time*1000)
      data.info.expiryDate = new Date((new Date()).getTime()+data.info.stats.daysUntilExpire*24*3600000)
    }
    return res.json(data)
  } catch (err) {
    return next(err)
  }

})

router.get("/nh/:hash", async function (req, res, next) {

  try {
    const info = await axios(configRpc('getnamebyhash', [req.params.hash]))
    return res.json(info.data)
  } catch (err) {
    return next(err)
  }

})

router.get("/b/:height", async function (req, res, next) {

  try {
    return res.json((await axios(configRpc('getblockbyheight', [parseInt(req.params.height), true, true]))).data.result)
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
