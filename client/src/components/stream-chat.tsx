import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { SiYoutube, SiTwitch, SiDiscord } from "react-icons/si";
import type { ChatMessage } from "@shared/schema";
import * as signalR from "@microsoft/signalr";

const PlatformIcon = ({ platform }: { platform: ChatMessage["platform"] }) => {
  switch (platform) {
    case "youtube":
      return <SiYoutube className="h-4 w-4 text-red-500" />;
    case "twitch":
      return <SiTwitch className="h-4 w-4 text-purple-500" />;
    case "discord":
      return <SiDiscord className="h-4 w-4 text-blue-500" />;
    case "kick":
      return <span className="h-4 w-4 text-green-500">K</span>;
    default:
      return null;
  }
};

export function StreamChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);
  const hubConnection = useRef<signalR.HubConnection>();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chathub")  // Update this URL to your C# backend
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    connection.start()
      .then(() => {
        setConnected(true);
        hubConnection.current = connection;
      })
      .catch((err) => console.error("SignalR Connection Error:", err));

    return () => {
      connection.stop();
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !hubConnection.current) return;

    const chatMessage: ChatMessage = {
      platform: "web",
      username: "You",
      content: message,
      timestamp: new Date(),
    };

    try {
      await hubConnection.current.invoke("SendMessage", chatMessage);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Stream Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={msg.platform} />
                  <span className="font-bold">{msg.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            disabled={!connected}
          />
          <Button type="submit" size="icon" disabled={!connected}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}