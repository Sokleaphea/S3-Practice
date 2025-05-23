function validateQuery(req, res, next) {
    const { minCredits, maxCredits } = req.query;

    if (minCredits && maxCredits) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ error: "minCredit and maxCredit must be number"});
        }
        if (min > max) {
            return res.status(400).json({ error: "minCredit must be smaller than max credit"});
        }
    }

    next();
}

export default validateQuery;