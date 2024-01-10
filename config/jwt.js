const secret = process.env.JWT_SECRET;
const ttl = '144h';

module.exports = {
  secret,
  ttl
};