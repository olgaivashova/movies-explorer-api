const router = require("express").Router();
const {
  celebrateAddFilm,
  celebrateGetFilmById,
} = require("../middlewares/joi");
const { addFilm, getFilms, deleteFilm } = require("../controllers/films");

router.get("/", getFilms);
router.post("/", celebrateAddFilm, addFilm);
router.delete("/:_id", celebrateGetFilmById, deleteFilm);

module.exports = router;
