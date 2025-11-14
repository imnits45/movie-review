const router = require("express").Router();
const ctrl = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", ctrl.register);
router.post("/signup", ctrl.register);
router.post("/login", ctrl.login);
router.post("/signin", ctrl.login);
router.get("/", auth, ctrl.getAllUsers);
router.get("/profile", auth, ctrl.getProfile);
router.put("/profile", auth, ctrl.updateProfile);
router.put("/change-password", auth, ctrl.changePassword);

module.exports = router;
