module.exports = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Server Error";

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 404;
        message = "Resource not found";
    }

    // Duplicate Key
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value";
    }

    // Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};