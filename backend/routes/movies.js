const router = require("express").Router();
const ctrl = require("../controllers/movieController");
const auth = require("../middleware/auth");

router.post("/", auth, ctrl.addMovie);
router.get("/", ctrl.getMovies);
router.get("/:id", ctrl.getMovie);

module.exports = router;
