// This middleware is used to handle 404 errors. It is placed at the end of the middleware chain.
const notFound = (req, res) => res.status(404).send("Route does not exist");
module.exports = notFound;
