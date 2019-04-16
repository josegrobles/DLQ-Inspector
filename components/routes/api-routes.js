/* eslint no-unused-vars: "off" */

const bodyParser = require('body-parser');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const cors = require('cors');

module.exports = () => {
  const start = ({ app, config, logger }, cb) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    const tagError = err => {
      const errors = {
        InputError: BAD_REQUEST,
        NotFoundError: NOT_FOUND,
      };

      return errors[err.name || err.type];
    };

    const handleError = (err, req, res, next) => {
      err.statusCode = tagError(err);
      logger.error(`${err.message} - ${err.stack}`);

      res.status(err.statusCode || 500).json({ type: err.name || err.type, message: err.message, extra: err.extra });
    };

    app.use(handleError);

    cb();
  };

  return { start };
};
