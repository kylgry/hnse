"use strict";

const express = require("express")
const axios = require("axios")
const { BadRequestError } = require("./errors")
const router = express.Router()
const { HNS_NODE_ADDRESS, HNS_NODE_AUTH } = require("./config")


function configRpc(method, params) {
  return {
    method: 'post',
    url: HNS_NODE_ADDRESS,
    headers: { 
      'Authorization': HNS_NODE_AUTH, 
      'Content-Type': 'application/json' },
    data : JSON.stringify({
      "jsonrpc": "2.0",
      "method": method,
      "params": params })
  }
}

function configHttp(endpoint) {
  console.log(`${HNS_NODE_ADDRESS}/${endpoint}`)
  return {
    method: 'get',
    url: `${HNS_NODE_ADDRESS}/${endpoint}`,
    headers: { 
      'Authorization': HNS_NODE_AUTH, 
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
  } catch (err) { return next(err) }

})

router.get("/nh/:hash", async function (req, res, next) {

  try { return res.json((await axios(configRpc('getnamebyhash', [req.params.hash]))).data) } 
  catch (err) { return next(err) }

})

router.get("/b/:height", async function (req, res, next) {

  try { return res.json((await axios(configRpc('getblockbyheight', 
        [parseInt(req.params.height), true, true]))).data.result) } 
  catch (err) { return next(err) } 

})

router.get("/t/:txid", async function (req, res, next) {

  try { return res.json((await axios(configHttp(`tx/${req.params.txid}`))).data) } 
  catch (err) { return next(err) } 

})

router.get("/a/:address", async function (req, res, next) {

  try {
    const coins = (await axios(configHttp(`coin/address/${req.params.address}`))).data
    const txs = (await axios(configHttp(`tx/address/${req.params.address}`))).data
    let totalCoins = 0
    if (coins.length !== 0) {
      for (let coin of coins) {
        totalCoins += coin.value
      }
    }
    return res.json({coins: coins, txs: txs, totalCoins: totalCoins}) }
  catch (err) { return next(err) }

})

module.exports = router;
