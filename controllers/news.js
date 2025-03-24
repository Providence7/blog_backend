import  express from "express";
import Subscriber from "../models/news.model.js";

export const subscribe  =  async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
