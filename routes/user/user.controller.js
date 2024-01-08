const db = require('../../config/connection');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const cache = require('../../utils/cache');
const jwtConfig = require('../../config/jwt');
const jwt = require('../../utils/jwt');
const User = db.user;
const pg = require('../../utils/pagination');
const useragent = require('useragent');
const nodemailer = require("nodemailer");
const requestIp = require('request-ip');
const { Op } = require("sequelize");



module.exports = {
  
}