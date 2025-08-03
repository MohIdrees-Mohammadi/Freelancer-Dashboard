import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus, X, MapPin, Globe, Linkedin, Github, Twitter, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState([
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Fluent" },
    { name: "French", level: "Conversational" }
  ]);
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const portfolioItems = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern React-based e-commerce solution",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure banking application with real-time features",
      image: "/placeholder.svg",
      technologies: ["React Native", "Firebase", "TypeScript"]
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      description: "Analytics dashboard for business intelligence",
      image: "/placeholder.svg",
      technologies: ["Next.js", "PostgreSQL", "Tailwind"]
    }
  ];

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
              Edit Profile
            </h1>
            <p className="text-muted-foreground">
              Update your professional information and showcase your skills.
            </p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="settings">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      Change Photo
                    </Button>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="location" className="pl-10" defaultValue="San Francisco, CA" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="pst">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pst">Pacific Standard Time</SelectItem>
                              <SelectItem value="est">Eastern Standard Time</SelectItem>
                              <SelectItem value="cst">Central Standard Time</SelectItem>
                              <SelectItem value="mst">Mountain Standard Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" defaultValue="Full Stack Developer" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell clients about your experience and expertise..."
                        className="min-h-[120px]"
                        defaultValue="Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies."
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input id="hourlyRate" type="number" defaultValue="75" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select defaultValue="5-10">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <Button onClick={addSkill} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {languages.map((lang, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{lang.name}</span>
                            <Badge variant="outline">{lang.level}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Portfolio</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item) => (
                      <Card key={item.id} className="border border-border/50">
                        <div className="aspect-video bg-muted rounded-t-lg"></div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="website" className="pl-10" placeholder="https://your-website.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="linkedin" className="pl-10" placeholder="https://linkedin.com/in/username" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="github" className="pl-10" placeholder="https://github.com/username" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="twitter" className="pl-10" placeholder="https://twitter.com/username" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline" className="w-full">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <div className="flex gap-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;