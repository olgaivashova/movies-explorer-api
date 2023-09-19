const router = require("express").Router();
const { celebrateEditUserInfo } = require("../middlewares/joi");
const { getMe, editUserInfo } = require("../controllers/users");

router.get("/me", getMe);
router.patch("/me", celebrateEditUserInfo, editUserInfo);

module.exports = router;
