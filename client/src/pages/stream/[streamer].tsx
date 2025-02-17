import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiTwitch, SiKick, SiYoutube } from "react-icons/si";
import { StreamChat } from "@/components/stream-chat";

const streamers = {
  streamer1: {
    name: "Streamer 1",
    twitch: "streamer1",
    kick: "streamer1",
    youtube: "@streamer1",
    youtubeEmbed: "https://www.youtube.com/embed/live_stream?channel=streamer1",
    lastVideo: {
      title: "My Latest Adventure",
      thumbnail: "https://picsum.photos/400/225",
      url: "https://youtube.com/watch?v=abc123",
      date: "2025-02-15"
    },
    lastBlog: {
      title: "Behind the Scenes",
      excerpt: "Take a peek into my streaming setup and daily routine...",
      url: "/blog/streamer1-setup",
      date: "2025-02-14"
    }
  },
  streamer2: {
    name: "Streamer 2",
    twitch: "streamer2",
    kick: "streamer2",
    youtube: "@streamer2",
    youtubeEmbed: "https://www.youtube.com/embed/live_stream?channel=streamer2",
    lastVideo: {
      title: "Gaming Highlights",
      thumbnail: "https://picsum.photos/400/225",
      url: "https://youtube.com/watch?v=def456",
      date: "2025-02-16"
    },
    lastBlog: {
      title: "My Streaming Journey",
      excerpt: "From beginner to partnered streamer, here's my story...",
      url: "/blog/streamer2-journey",
      date: "2025-02-13"
    }
  },
  streamer3: {
    name: "Streamer 3",
    twitch: "streamer3",
    kick: "streamer3",
    youtube: "@streamer3",
    youtubeEmbed: "https://www.youtube.com/embed/live_stream?channel=streamer3",
    lastVideo: {
      title: "Community Event Highlights",
      thumbnail: "https://picsum.photos/400/225",
      url: "https://youtube.com/watch?v=ghi789",
      date: "2025-02-17"
    },
    lastBlog: {
      title: "Community Updates",
      excerpt: "Check out what's new with our amazing community...",
      url: "/blog/streamer3-updates",
      date: "2025-02-16"
    }
  },
};

export default function StreamerPage() {
  const [, params] = useRoute("/stream/:streamer");
  const streamer = params?.streamer ? streamers[params.streamer as keyof typeof streamers] : null;

  if (!streamer) {
    return <div className="container py-12">Streamer not found</div>;
  }

  return (
    <div className="container py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{streamer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src={streamer.youtubeEmbed}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" size="lg" asChild>
                  <a href={`https://twitch.tv/${streamer.twitch}`} target="_blank" rel="noopener noreferrer">
                    <SiTwitch className="mr-2 h-5 w-5" />
                    Twitch
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href={`https://kick.com/${streamer.kick}`} target="_blank" rel="noopener noreferrer">
                    <SiKick className="mr-2 h-5 w-5" />
                    Kick
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href={`https://youtube.com/${streamer.youtube}`} target="_blank" rel="noopener noreferrer">
                    <SiYoutube className="mr-2 h-5 w-5" />
                    YouTube
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Latest Video Card */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img 
                  src={streamer.lastVideo.thumbnail} 
                  alt={streamer.lastVideo.title}
                  className="w-full rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{streamer.lastVideo.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Posted on {new Date(streamer.lastVideo.date).toLocaleDateString()}
                  </p>
                  <Button variant="link" asChild className="px-0">
                    <a href={streamer.lastVideo.url} target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Blog Post Card */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{streamer.lastBlog.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Posted on {new Date(streamer.lastBlog.date).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground">{streamer.lastBlog.excerpt}</p>
                <Button variant="link" asChild className="px-0">
                  <a href={streamer.lastBlog.url}>
                    Read More
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <StreamChat />
      </div>
    </div>
  );
}