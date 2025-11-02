
const ControledAcces = async (req, res, next) => {
  const user = req.user;

  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json("/tu n'es pas autorise ...");
  }
};

module.exports = { ControledAcces };