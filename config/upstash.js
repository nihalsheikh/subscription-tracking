import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_URL, QSTASH_TOKEN } from "./env.js";

export const workflowClient = new WorkflowClient({
	baseUrl: process.env.QSTASH_URL || QSTASH_URL || "http://127.0.0.1:8080",
	token: process.env.QSTASH_TOKEN || QSTASH_TOKEN,
});
