// backend/src/controllers/newsletter.controller.js

import {
  sendNewsletterSubscriptionEmail,
  sendNewArticleNotificationEmail,
} from "../services/email.service.js";
import Subscriber from "../models/subscriber.model.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const targetEmail = email.trim().toLowerCase();

    // 1. Save or Update the Subscriber in MongoDB
    // If they exist, ensure 'subscribed: true' updates their preference.
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: targetEmail },
      { $set: { subscribed: true, subscribedAt: new Date() } },
      { upsert: true, new: true },
    );

    // 2. Call the Resend email service
    const emailResult = await sendNewsletterSubscriptionEmail({
      email: targetEmail,
    });

    // 3. Handle service failures (e.g., API keys down, invalid domain restriction)
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to process email subscription delivery.",
        error: emailResult.error,
      });
    }

    // 4. Return success response to the frontend
    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to the newsletter! 🎉",
      id: emailResult.id,
    });
  } catch (e) {
    console.error("Newsletter Controller Error:", e.message);
    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing your subscription.",
    });
  }
};

export const broadcastNewArticle = async (articleData) => {
  const { title, category, url } = articleData;

  console.log(`🚀 Starting newsletter broadcast for article: "${title}"`);

  const BATCH_SIZE = 100;
  let skip = 0;
  let totalSent = 0;
  let totalFailed = 0;

  try {
    // 1. Get the total count of active subscribers to track progress
    const totalSubscribers = await Subscriber.countDocuments({
      subscribed: true,
    });

    if (totalSubscribers === 0) {
      console.log("ℹ️ No active subscribers found to broadcast to.");
      return { success: true, totalSent: 0 };
    }

    console.log(
      `📢 Found ${totalSubscribers} active subscribers. Processing in batches of ${BATCH_SIZE}...`,
    );

    // 2. Loop through subscribers in cursor batches to keep memory footprints low
    while (true) {
      const activeSubscribers = await Subscriber.find({ subscribed: true })
        .select("email")
        .skip(skip)
        .limit(BATCH_SIZE)
        .lean(); // .lean() converts documents to fast, lightweight plain JS objects

      if (activeSubscribers.length === 0) {
        break; // Loop exit when all subscribers are processed
      }

      // 3. Process the current batch concurrently
      const emailPromises = activeSubscribers.map(async (subscriber) => {
        try {
          const result = await sendNewArticleNotificationEmail({
            email: subscriber.email,
            articleTitle: title,
            category: category,
            articleUrl: url,
          });

          if (result.success) {
            totalSent++;
          } else {
            totalFailed++;
          }
        } catch (emailError) {
          console.error(
            `❌ Failed processing email block for ${subscriber.email}:`,
            emailError.message,
          );
          totalFailed++;
        }
      });

      // Wait for the current batch of 100 to complete before grabbing the next batch
      await Promise.all(emailPromises);

      skip += BATCH_SIZE;
      console.log(
        `📦 Progress: ${totalSent + totalFailed} / ${totalSubscribers} evaluated.`,
      );
    }

    console.log(
      `🏁 Broadcast finished. Sent: ${totalSent}, Failed: ${totalFailed}`,
    );
    return { success: true, totalSent, totalFailed };
  } catch (error) {
    console.error(
      "🚨 Critical failure in article broadcast worker:",
      error.message,
    );
    return { success: false, error: error.message };
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const subscriber = await Subscriber.findOne({
      email: email.toLowerCase(),
    });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    subscriber.subscribed = false;

    await subscriber.save();

    return res.status(200).json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
