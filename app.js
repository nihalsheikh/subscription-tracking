import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Welcome ot the Subscription Tracker API");
});

app.listen(PORT, () => {
	console.log(
		"Subscription Tracker API is running on http://localhost:3000 "
	);
});

export default app;
