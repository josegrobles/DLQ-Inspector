module.exports = () => {
  const start = ({ bus }, cb) => {
    const process = async message => {
      await message.complete();
      console.log(message.body);
    };

    bus.processDlq('default', process);

    const api = {};
    cb(null, api);
  };

  return { start };
};
