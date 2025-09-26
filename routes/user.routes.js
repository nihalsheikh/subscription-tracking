import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id -> get user by id

// Get all users
userRouter.get("/", getUsers);

// Get the details of a single user
userRouter.get("/:id", authorize, getUser);

// Create a new user
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));

// Update details of user
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

// Delete a user
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
