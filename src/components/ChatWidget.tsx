import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, MoreVertical } from "lucide-react";

const conversations = [
  {
    id: 1,
    client: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thank you for the quick delivery!",
    time: "2m ago",
    unread: 0,
    online: true,
  },
  {
    id: 2,
    client: "Michael Chen",
    avatar: "MC",
    lastMessage: "Can we schedule a call tomorrow?",
    time: "1h ago",
    unread: 2,
    online: false,
  },
  {
    id: 3,
    client: "Emma Wilson",
    avatar: "EW",
    lastMessage: "I've uploaded the requirements document",
    time: "3h ago",
    unread: 1,
    online: true,
  },
];

export function ChatWidget() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  return (
    <Card className="h-96 flex flex-col border-0" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground">Messages</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border/50 pr-4">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === conv.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/20 text-primary">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {conv.client}
                      </p>
                      {conv.unread > 0 && (
                        <Badge className="h-5 min-w-5 text-xs bg-primary text-primary-foreground">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 pl-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {/* Sample messages */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg rounded-br-sm max-w-xs">
                  <p className="text-sm">Perfect! The website is ready for review.</p>
                  <p className="text-xs opacity-70 mt-1">2:30 PM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2 rounded-lg rounded-bl-sm max-w-xs">
                  <p className="text-sm text-foreground">Thank you for the quick delivery!</p>
                  <p className="text-xs text-muted-foreground mt-1">2:31 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border-border/50"
            />
            <Button onClick={sendMessage} size="icon" className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}