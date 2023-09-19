const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UnauthorizedError = require("../errors/unauthorizedError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, "Минимальная длина поля- 2 символа"],
      maxlength: [30, "Максимальная длина поля- 30 символов"],
    },
    email: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      unique: true,
      validate: {
        validator: function checkEmail(email) {
          return email && validator.isEmail(email);
        },
        message: "Введите e-mail",
      },
    },
    password: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Неправильные почта или пароль");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Неправильные почта или пароль");
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
