import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MoreHorizontal, Paperclip, Smile } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    client: "Sarah Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Can you add the contact form to the homepage?",
    timestamp: "2 min ago",
    unread: 2,
    project: "E-commerce Website",
    status: "active"
  },
  {
    id: 2,
    client: "Mike Chen",
    avatar: "/placeholder.svg",
    lastMessage: "The design looks great! When can we start development?",
    timestamp: "1 hour ago",
    unread: 0,
    project: "Mobile App UI",
    status: "active"
  },
  {
    id: 3,
    client: "Emily Davis",
    avatar: "/placeholder.svg",
    lastMessage: "Thank you for the quick delivery!",
    timestamp: "3 hours ago",
    unread: 0,
    project: "Logo Design",
    status: "completed"
  },
  {
    id: 4,
    client: "David Wilson",
    avatar: "/placeholder.svg",
    lastMessage: "I need some revisions on the dashboard",
    timestamp: "1 day ago",
    unread: 1,
    project: "Admin Dashboard",
    status: "revision"
  }
];

const messages = [
  {
    id: 1,
    sender: "client",
    message: "Hi! I'd like to discuss the project requirements.",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    sender: "me",
    message: "Hello! I'd be happy to help. Could you please share more details about what you're looking for?",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    sender: "client",
    message: "I need a modern e-commerce website with payment integration and inventory management.",
    timestamp: "10:35 AM"
  },
  {
    id: 4,
    sender: "me",
    message: "That sounds like a great project! I have experience building similar e-commerce platforms. The timeline would be approximately 3-4 weeks.",
    timestamp: "10:37 AM"
  },
  {
    id: 5,
    sender: "client",
    message: "Can you add the contact form to the homepage?",
    timestamp: "11:45 AM"
  }
];

const Messages = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "revision": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FreelancerSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-80"
        }`}
      >
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Messages
            </h1>
            <p className="text-muted-foreground">
              Communicate with your clients and manage project discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors ${
                        selectedConversation === conv.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conv.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.avatar} alt={conv.client} />
                          <AvatarFallback>{conv.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm truncate">{conv.client}</p>
                            {conv.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">{conv.unread}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conv.project}</p>
                          <p className="text-sm text-muted-foreground truncate mb-2">{conv.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                            <Badge className={`text-xs ${getStatusColor(conv.status)}`}>
                              {conv.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="border-0 h-full flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader className="pb-3 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">E-commerce Website</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              msg.sender === "me"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${
                              msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;