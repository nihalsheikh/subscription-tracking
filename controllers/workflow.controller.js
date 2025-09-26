import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
	// console.log("🚀 Workflow started with payload:", context.requestPayload);

	const { subscriptionId } = context.requestPayload;

	// console.log("📝 Processing subscription ID:", subscriptionId);

	const subscription = await fetchSubscription(context, subscriptionId);

	// console.log("💾 Found subscription:", subscription);

	if (!subscription || subscription.status !== "active") {
		// console.log("❌ Subscription not active, stopping workflow");
		return;
	}

	const renewalDate = dayjs(subscription.renewalDate);

	// console.log("📅 Renewal date:", renewalDate.format());

	if (renewalDate.isBefore(dayjs())) {
		console.log(
			`Renewal date has passed for subscription ${subscriptionId}. Stopping Workflow`
		);
		return;
	}

	for (const daysBefore of REMINDERS) {
		const reminderDate = renewalDate.subtract(daysBefore, "day");

		if (reminderDate.isAfter(dayjs())) {
			await sleepUntilReminder(
				context,
				`Reminder ${daysBefore} days before`,
				reminderDate
			);
		}

		await triggerReminder(context, `Reminder ${daysBefore} days before`);
	}
});

const fetchSubscription = async (context, subscriptionId) => {
	return await context.run("get subscription", async () => {
		return Subscription.findById(subscriptionId).populate(
			"user",
			"name email"
		);
	});
};

const sleepUntilReminder = async (context, label, date) => {
	console.log(`Sleeping until ${label} reminder at ${date}`);
	await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
	return await context.run(label, () => {
		console.log(`Triggering ${label} reminder`);

		// Send email, sms, whatsapp chat msg, push notification...
	});
};
