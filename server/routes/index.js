module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./userRoutes.js')(router));
    app.use('/api', require('./holidayRecipeRoutes.js')(router));
};