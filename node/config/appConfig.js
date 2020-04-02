let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    // uri : 'mongodb://localhost:27017/blog',
    uri: 'mongodb+srv://blog:Goodbye2k20@blog-rcywk.mongodb.net/blog?retryWrites=true&w=majority',
}
appConfig.apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    enviornment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}