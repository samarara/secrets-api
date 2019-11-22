const express = require('express');
const { encrypt } = require('./middleware');
const routes = express.Router();

routes.post('/api/v1/encrypt', encrypt);

module.exports = {
  routes
}