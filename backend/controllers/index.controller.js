const helloWorld = async (req, res, next) => {
  return res.send("Hello World");
};

module.exports = {
  helloWorld,
};
