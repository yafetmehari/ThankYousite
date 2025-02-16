import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiTwitch, SiKick, SiYoutube } from "react-icons/si";

const streamers = {
  streamer1: {
    name: "Streamer 1",
    twitch: "streamer1",
    kick: "streamer1",
    youtube: "@streamer1",
  },
  streamer2: {
    name: "Streamer 2",
    twitch: "streamer2",
    kick: "streamer2",
    youtube: "@streamer2",
  },
  streamer3: {
    name: "Streamer 3",
    twitch: "streamer3",
    kick: "streamer3",
    youtube: "@streamer3",
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
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{streamer.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
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
    </div>
  );
}
