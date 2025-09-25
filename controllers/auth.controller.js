import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
	// Implement our Sign-up logic here
	const session = await mongoose.startSession(); // not user session, but mongoose transaction session
	session.startTransaction();

	try {
		// Create a new user here
		const { name, email, password } = req.body;

		// check if the user already exits
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error("User already exists");
			error.statusCode = 409;
			throw error;
		}

		// Hashing a password, never save password in a plain text
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// now we create the new user
		const newUsers = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session }
		);

		// generate token for user to sign in
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: {
				token,
				user: newUsers[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const signIn = async (req, res, next) => {
	// Implement our Sign-up logic here
};

export const signOut = async (req, res, next) => {
	// Implement our Sign-up logic here
};
