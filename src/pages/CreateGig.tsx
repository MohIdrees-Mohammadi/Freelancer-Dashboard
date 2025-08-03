import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateGig = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const addImage = () => {
    if (images.length < 3) {
      setImages([...images, ""]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gig Created Successfully!",
      description: "Your gig has been published and is now live.",
    });
    navigate("/gigs");
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
          <div className="mb-8 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/gigs")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Create New Gig
              </h1>
              <p className="text-muted-foreground">
                Set up your new service offering for clients.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Gig Title</Label>
                      <Input
                        id="title"
                        placeholder="I will create a modern website for your business"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-development">Mobile Development</SelectItem>
                          <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                          <SelectItem value="graphic-design">Graphic Design</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="writing">Writing & Translation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your service in detail. What will you deliver and what makes you the best choice?"
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="Add relevant tags"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTag} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gig Images */}
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Gig Images (Showcase)</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Add up to 3 images to showcase your work
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className="relative aspect-video border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
                        >
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Upload Image {index + 1}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {images.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addImage}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Image ({images.length}/3)
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Pricing & Packages */}
              <div className="space-y-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="price">Starting Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="25"
                        min="5"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="delivery">Delivery Time</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="7">1 Week</SelectItem>
                          <SelectItem value="14">2 Weeks</SelectItem>
                          <SelectItem value="30">1 Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="revisions">Revisions Included</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of revisions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Revision</SelectItem>
                          <SelectItem value="2">2 Revisions</SelectItem>
                          <SelectItem value="3">3 Revisions</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="What information do you need from buyers to get started?"
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Publish Gig
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/gigs")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateGig;