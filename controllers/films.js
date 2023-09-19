const { HTTP_STATUS_CREATED } = require("http2").constants;
const Film = require("../models/film");

const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

module.exports.getFilms = (req, res, next) => {
  Film.find({ owner: req.user._id })
    .populate(["owner"])
    .then((film) => res.send(film))
    .catch(next);
};
module.exports.addFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Film.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((film) => {
      res.status(HTTP_STATUS_CREATED).send(film);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteFilm = (req, res, next) => {
  Film.findById(req.params._id)
    .then((film) => {
      if (!film) {
        throw new NotFoundError("Фильм не найден");
      } else if (film.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "Фильм не может быть удален,т.к. принадлежит другому пользователю",
        );
      } else {
        Film.deleteOne(film)
          .then(() => res.send({ message: "Фильм удален" }))
          .catch((err) => next(err));
      }
    })
    .catch(next);
};
