exports.handlePsqlErrors = (err, req, res, next) => {
  console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid request" });
  } else if (err.code === "23503") {
    res.status(400).send({ msg: "invalid content" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    console.log(err);
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
