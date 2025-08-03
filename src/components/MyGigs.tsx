import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Eye, Play, Pause, Star, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initialGigs = [
  {
    id: 1,
    title: "Full Stack Web Application Development",
    status: "active",
    orders: 12,
    price: "$1,200",
    rating: 4.9,
    views: 245,
    impressions: 1200,
  },
  {
    id: 2,
    title: "React.js Frontend Development",
    status: "active",
    orders: 8,
    price: "$800",
    rating: 5.0,
    views: 189,
    impressions: 950,
  },
  {
    id: 3,
    title: "API Integration & Backend Setup",
    status: "paused",
    orders: 5,
    price: "$600",
    rating: 4.8,
    views: 134,
    impressions: 670,
  },
  {
    id: 4,
    title: "Database Design & Optimization",
    status: "active",
    orders: 15,
    price: "$900",
    rating: 4.9,
    views: 298,
    impressions: 1480,
  },
];

export function MyGigs() {
  const [gigs, setGigs] = useState(initialGigs);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
        Paused
      </Badge>
    );
  };

  const handleEdit = (gigId: number) => {
    navigate(`/gigs/edit/${gigId}`);
  };

  const handleView = (gigId: number) => {
    navigate(`/gigs/view/${gigId}`);
  };

  const handleToggleStatus = (gigId: number) => {
    setGigs(gigs.map(gig => 
      gig.id === gigId 
        ? { ...gig, status: gig.status === "active" ? "paused" : "active" }
        : gig
    ));
    const gig = gigs.find(g => g.id === gigId);
    toast({
      title: `Gig ${gig?.status === "active" ? "Paused" : "Activated"}`,
      description: `Your gig has been ${gig?.status === "active" ? "paused" : "activated"} successfully.`,
    });
  };

  const handleDelete = (gigId: number) => {
    setGigs(gigs.filter(gig => gig.id !== gigId));
    toast({
      title: "Gig Deleted",
      description: "Your gig has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">My Gigs</CardTitle>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => navigate("/gigs/create")}
        >
          Create New Gig
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {gigs.map((gig) => (
            <Card
              key={gig.id}
              className="border-0 hover:shadow-lg transition-all duration-300"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2 text-lg">{gig.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{gig.orders} orders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{gig.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{gig.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">{gig.price}</span>
                      {getStatusBadge(gig.status)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(gig.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(gig.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(gig.id)}>
                        {gig.status === "active" ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(gig.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-border/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                    <p className="font-semibold">{gig.impressions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Click Rate</p>
                    <p className="font-semibold">{((gig.views / gig.impressions) * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Queue</p>
                    <p className="font-semibold">{gig.orders} orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}