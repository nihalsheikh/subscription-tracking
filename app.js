import express from "express";

import { PORT } from "./config/env.js";

import { authRouter, userRouter, subscriptionRouter } from "./routes/index.js";

const app = express();

// "use" keyword is used with MIDDLEWARE telling it we are using JSON or else when using routes

// what's happeneing in below code is we are prepending our route with authRouter
// to look like this: "/api/vi/auth/sign-up"
app.use("/api/v1/auth", authRouter);

// routes look like this: "/api/v1/users/"
app.use("/api/v1/users", userRouter);

// routes look like this: "/api/v1/subscriptions"
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
	res.send("Welcome ot the Subscription Tracker API");
});

app.listen(PORT, () => {
	console.log(
		`Subscription Tracker API is running on http://localhost:${PORT}`
	);
});

export default app;
