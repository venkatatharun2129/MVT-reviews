module.exports = (model, options = {}) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = options.limit || 20;

            const filter =
                typeof options.filter === "function"
                    ? options.filter(req)
                    : options.filter || {};

            const sort = options.sort || { createdAt: -1 };

            const total = await model.countDocuments(filter);

            let query = model.find(filter);

            if (options.populate) {
                query = query.populate(options.populate);
            }

            const results = await query
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();

            res.locals.movies = results;

            res.locals.pagination = {
                page,
                pages: Math.ceil(total / limit),
                total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
                nextPage: page + 1,
                prevPage: page - 1
            };

            next();
        } catch (err) {
            next(err);
        }
    };
};