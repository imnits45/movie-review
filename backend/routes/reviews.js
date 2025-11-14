const router = require("express").Router();
const ctrl = require("../controllers/reviewController");
const auth = require("../middleware/auth");

router.post("/", auth, ctrl.addReview);
router.get("/", ctrl.getAllReviews);
router.get("/my", auth, ctrl.getMyReviews);
router.get("/:id", auth, ctrl.getReview);
router.put("/:id", auth, ctrl.updateReview);
router.delete("/:id", auth, ctrl.deleteReview);

module.exports = router;
