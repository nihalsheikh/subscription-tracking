import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
	try {
		const decision = await aj.protect(req, { requested: 1 });

		if (decision.isDenied()) {
			// Rate limit
			if (decision.reason.isRateLimit())
				return res.status(429).json({ error: "Rate limit exceeded" });

			// Bot protection
			if (decision.reason.isBot())
				return res.status(403).json({ error: "Bot detected" });

			// none of the above, but error exists
			return res.status(403).json({ error: "Access denied" });
		}

		next();
	} catch (error) {
		console.log(`Arcjet Middleware Error: ${error}`);
		next(error);
	}
};

export default arcjetMiddleware;
