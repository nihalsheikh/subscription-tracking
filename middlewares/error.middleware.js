// Centralised Error Handling through Middleware to track all errors
// we will globally handle all the errors through this middleware

// process:
// create a subscription -> middleware (check for renewal date) -> middleware (check for errors) -> next -> controller
const errorMiddleware = (err, req, res, next) => {
	// here we get the thing that happend before error, the request, the response and what's next step
	try {
		let error = { ...err };

		error.message = err.message;

		console.error(err);

		// type of error: Mongoose bad ObjectId
		if (err.name === "CastError") {
			const message = "Resource not found";

			error = new Error(message);
			error.statusCode = 404;
		}

		// type of error: Mongoose duplicate key
		if (err.code === 11000) {
			const message = "Duplicate field value entered";
			error = new Error(message);
			error.statusCode = 400;
		}

		// type of error: Mongoose validation error
		if (err.name === "ValidationError") {
			const message = Object.values(err.errors).map((val) => val.message);
			error = new Error(message.join(", "));
			error.statusCode = 400;
		}

		res.status(error.statusCode || 500).json({
			success: false,
			error: error.message || "Server Error",
		});
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
