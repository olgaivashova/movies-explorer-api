const router = require("express").Router();
const { celebrateLogin } = require("../middlewares/joi");
const { login } = require("../controllers/users");

router.post("/", celebrateLogin, login);
module.exports = router;
