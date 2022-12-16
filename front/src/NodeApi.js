import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class NodeApi {

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { }
    const params = (method === "get") ? data : {}

    try {
      return (await axios({ url, method, data, params, headers })).data
    } catch (err) {
      console.error("API Error:", err.response)
      let message = err.response.data.error.message
      throw Array.isArray(message) ? message : [message]
    }
  }

  static async getName(name) {
    return (await this.request(`n/${name}`)) }

  static async getNameByHash(hash) {
    return (await this.request(`nh/${hash}`)) }

  static async getTransaction(txid) {
    return (await this.request(`t/${txid}`)) }

  static async getAddress(address) {
    return (await this.request(`a/${address}`)) }

  static async getBlock(height) {
    return (await this.request(`b/${height}`)) }

}

export default NodeApi
