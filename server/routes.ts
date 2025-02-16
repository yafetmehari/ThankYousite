import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.get("/api/episodes", async (_req, res) => {
    const episodes = await storage.getEpisodes();
    res.json(episodes);
  });

  app.get("/api/episodes/:id", async (req, res) => {
    const episode = await storage.getEpisode(parseInt(req.params.id));
    if (!episode) {
      res.status(404).json({ message: "Episode not found" });
      return;
    }
    res.json(episode);
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(data);
      res.json(subscriber);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid email address" });
        return;
      }
      throw error;
    }
  });

  return createServer(app);
}
