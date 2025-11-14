const router = require("express").Router();
const ctrl = require("../controllers/reviewController");
const auth = require("../middleware/auth");

router.post("/", auth, ctrl.addReview);
router.get("/:movie_id", ctrl.getReviews);

module.exports = router;
