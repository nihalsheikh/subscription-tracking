import express from "express";
import { PORT } from "./config/env.js";
import { authRouter, userRouter, subscriptionRouter } from "./routes/index.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Express built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// "use" keyword is used with MIDDLEWARE telling it we are using JSON or else when using routes

// what's happeneing in below code is we are prepending our route with authRouter
// to look like this: "/api/vi/auth/sign-up"
app.use("/api/v1/auth", authRouter);
// routes look like this: "/api/v1/users/"
app.use("/api/v1/users", userRouter);
// routes look like this: "/api/v1/subscriptions"
app.use("/api/v1/subscriptions", subscriptionRouter);

// Custom-made Error Middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
	res.send("Welcome ot the Subscription Tracker API");
});

app.listen(PORT, async () => {
	console.log(
		`Subscription Tracker API is running on http://localhost:${PORT}`
	);

	// connect to database
	await connectToDatabase();
});

export default app;
