exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

exports.checkRole = (role) => (req, res, next) => {
  if (role === req.user.role) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.catchErrors = (controller) => (req, res, next) =>
  controller(req, res).catch(next);

exports.setLocals = (app) => (req, res, next) => {
  if (req.user) {
    app.locals.user = req.user;
    app.locals.admin = req.user.role === "ADMIN";
  } else {
    app.locals.user = false;
    app.locals.admin = false;
  }
  next();
};
