import type { Express } from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertSubscriberSchema, chatMessageSchema } from "@shared/schema";
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

  const server = createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  // Keep track of all connected WebSocket clients
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);

    ws.on('message', (data: string) => {
      try {
        const message = chatMessageSchema.parse({
          ...JSON.parse(data),
          timestamp: new Date(),
        });

        // Broadcast the message to all connected clients
        const messageString = JSON.stringify(message);
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
          }
        });
      } catch (error) {
        console.error('Invalid message format:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  // You would add your platform-specific chat bots here
  // Example:
  // setupTwitchBot(clients);
  // setupYouTubeBot(clients);
  // setupKickBot(clients);
  // setupDiscordBot(clients);

  return server;
}