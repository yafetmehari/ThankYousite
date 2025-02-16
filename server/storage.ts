import { episodes, type Episode, type InsertEpisode, subscribers, type Subscriber, type InsertSubscriber } from "@shared/schema";

export interface IStorage {
  getEpisodes(): Promise<Episode[]>;
  getEpisode(id: number): Promise<Episode | undefined>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private episodes: Map<number, Episode>;
  private subscribers: Map<number, Subscriber>;
  private currentEpisodeId: number;
  private currentSubscriberId: number;

  constructor() {
    this.episodes = new Map();
    this.subscribers = new Map();
    this.currentEpisodeId = 1;
    this.currentSubscriberId = 1;

    // Add some sample episodes with YouTube embeds
    this.createEpisode({
      title: "The Beginning of Thank You",
      description: "In our first episode, we discuss the origins of the show and what to expect.",
      embedUrl: "https://www.youtube.com/embed/sample1",
      publishedAt: new Date(),
      thumbnailUrl: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea",
    });
  }

  async getEpisodes(): Promise<Episode[]> {
    return Array.from(this.episodes.values()).sort((a, b) => 
      b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getEpisode(id: number): Promise<Episode | undefined> {
    return this.episodes.get(id);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const id = this.currentEpisodeId++;
    const episode: Episode = {
      ...insertEpisode,
      id,
      thumbnailUrl: insertEpisode.thumbnailUrl || null,
    };
    this.episodes.set(id, episode);
    return episode;
  }

  async addSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date(),
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();