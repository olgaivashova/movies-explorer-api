require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

// eslint-disable-next-line operator-linebreak
const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const routerSignup = require("./routes/signup");
const routerLogin = require("./routes/signin");
const auth = require("./middlewares/auth");
const routerUsers = require("./routes/users");
const routerFilms = require("./routes/films");
const middlewarePath = require("./middlewares/nonexistentPath");
const centralHandle = require("./middlewares/centralHandle");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(cors());
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(helmet());
app.use(requestLogger);
app.use("/signup", routerSignup);
app.use("/signin", routerLogin);
app.use(auth);
app.use("/users", routerUsers);
app.use("/movies", routerFilms);
app.use("*", middlewarePath);

app.use(errorLogger); // подключаем логгер ошибок после роутов, но до обработчиков ошибок
app.use(errors());
app.use(centralHandle);

app.listen(PORT);
