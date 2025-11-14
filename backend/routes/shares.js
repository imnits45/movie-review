const router = require("express").Router();
const ctrl = require("../controllers/shareController");
const auth = require("../middleware/auth");

router.post("/", auth, ctrl.addShare);
router.get("/shared-with-me", auth, ctrl.getSharedWithMe);

module.exports = router;
