let errorHandler = (err, req, res, next) => {
    console.log("application error handler called");
    console.log(err);

    res.send("Some Error occured at global level");
}

let notFoundHandler = (req, res, next) => {
    console.log("Global Not Found Handler Called");
    res.status(404).send("Route Not Found")
}

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}