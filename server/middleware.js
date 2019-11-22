const { encryptController } = require('./controllers');

const encrypt = (req, res, next) => {
  const { key, data } = req.body;
  encryptController(key, data)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
}

module.exports = {
  encrypt
}