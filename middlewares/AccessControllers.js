
const ControledAcces = async (req, res, next) => {
  const user = req.user;

  if (user.role === "client") {
    next();
  } else {
    res.status(401).json("/tu n'es pas autorise ...");
  }
};

module.exports = { ControledAcces };