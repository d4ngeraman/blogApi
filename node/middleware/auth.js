const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')

let isAuthenticated = (req, res, next) => {
    if (
      req.params.authToken ||
      req.query.authToken ||
      req.header("authToken")
    ) {
      if (
        req.params.authToken == "d4ngeraman" ||
        req.query.authToken == "d4ngeraman" ||
        req.header(authToken) == "d4ngeraman"
      ) {
        req.user = { fullName: "Aman Gupta", userId: "d4ngeraman" };
        next();
      } else {
        logger.error(
          "Incorrect Authentication token",
          "Authentication Middleware",
          5
        );
        let apiResponse = response.generate(
          true,
          "Incorrect Authenctication token",
          403,
          null
        );
        res.send(apiResponse);
      }
    } else {
      logger.error(
        "Authentication token missing",
        "Authentication Middleware",
        5
      );
      let apiResponse = response.generate(
        true,
        "Authenctication token missing required",
        403,
        null
      );
      res.send(apiResponse);
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}