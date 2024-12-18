const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token com formato inválido" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformado" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token inválido" });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userProfile = decoded.profile;
    return next();
  });
};

module.exports = authMiddleware;
