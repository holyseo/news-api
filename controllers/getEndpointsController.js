const fs = require("fs");

exports.getEndpoints = (req, res) => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8", (err, data) => {
    const parsedData = JSON.parse(data);
    res.status(200).send(parsedData);
  });
};
