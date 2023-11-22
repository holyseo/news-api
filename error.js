exports.handlePsqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid request" });
  } else {
    next(err);
  }
};

exports.handleCustomErros = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};

exports.handleErrors = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ error: err.msg });
  } else if (err.status === 404) {
    res.status(404).send({ error: err.msg });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
