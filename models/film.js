const mongoose = require("mongoose");
const validator = require("validator");

const filmSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
    director: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
    duration: {
      type: Number,
      required: [true, "Поле должно быть заполнено"],
    },
    year: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
    description: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
    image: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      validate: {
        validator: function checkUrl(url) {
          return url && validator.isURL(url);
        },
        message: "Введите URL",
      },
    },
    trailerLink: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      validate: {
        validator: function checkUrl(url) {
          return url && validator.isURL(url);
        },
        message: "Введите URL",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      validate: {
        validator: function checkUrl(url) {
          return url && validator.isURL(url);
        },
        message: "Введите URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, "Поле должно быть заполнено"],
    },
    nameRU: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
    nameEN: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("film", filmSchema);
