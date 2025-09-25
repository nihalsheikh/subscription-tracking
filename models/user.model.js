import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "User Name is required"],
			trim: true,
			minLength: 2,
			maxLength: 50,
		},
		email: {
			type: String,
			required: [true, "User Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			match: [
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
				"Please provide a valid email address", // example@email.com
			],
		},
		password: {
			type: String,
			required: [true, "User Password is required"],
			minLength: 8,
			match: [
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
				"Please provide a strong password", // Testing@123!
			],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User; // {name: "John Doe", email: "johndoe@gmail.com", password: "Testing@123s"}
