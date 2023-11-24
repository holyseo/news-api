const { selectAllUsers } = require("../models/users");

exports.getAllUsers = (req, res) => {
  selectAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};
