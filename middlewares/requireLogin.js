module.exports = (req, res, next) => {
    if (!req.user) {
        return res.statues(401).send({error: ' you must log in!'});
    }

    next();
};