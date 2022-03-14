const fs = require("fs");

function dynamizeHTML(file, title, description, url) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }

      // replace the special strings with server generated strings
      data = data.replace(/__title__/g, title);
      data = data.replace(/__description__/g, description);
      data = data.replace(/__url__/g, url);

      resolve(data);
    });
  });
}

module.exports = dynamizeHTML;
