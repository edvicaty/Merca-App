exports.catchErrors = (controllers) => (req, res, next) =>
  controllers(req, res).catch(next);
