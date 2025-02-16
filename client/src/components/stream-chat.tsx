import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import type { ChatMessage } from "@shared/schema";
import * as signalR from "@microsoft/signalr";
import { useToast } from "@/hooks/use-toast";

export function StreamChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);
  const hubConnection = useRef<signalR.HubConnection>();

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "https:" : "http:";
    const host = window.location.host;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${protocol}//${host}/chathub`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connection.on("ReceiveMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    async function startConnection() {
      try {
        await connection.start();
        setConnected(true);
        hubConnection.current = connection;
      } catch (err) {
        console.error("SignalR Connection Error:", err);
        toast({
          title: "Connection Error",
          description: "Could not connect to chat. Please refresh the page.",
          variant: "destructive",
        });
        setTimeout(startConnection, 5000); // Try to reconnect after 5 seconds
      }
    }

    startConnection();

    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [toast]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !hubConnection.current) return;

    const chatMessage: ChatMessage = {
      username: "You",
      content: message,
      timestamp: new Date(),
    };

    try {
      await hubConnection.current.invoke("SendMessage", chatMessage);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SiYoutube className="h-5 w-5 text-red-500" />
          YouTube Chat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
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