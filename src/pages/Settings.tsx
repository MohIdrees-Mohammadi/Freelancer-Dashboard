import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Laptop,
  Mail,
  MessageSquare,
  DollarSign,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newOrders: true,
    messages: true,
    payments: true,
    marketing: false
  });
  const { toast } = useToast();

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    });
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
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and system settings.
            </p>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Globe className="h-4 w-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="account">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to be notified about important updates.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Communication Channels</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(value) => handleNotificationChange('email', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(value) => handleNotificationChange('push', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(value) => handleNotificationChange('sms', value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Activity Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Orders</p>
                          <p className="text-sm text-muted-foreground">When someone places a new order</p>
                        </div>
                        <Switch
                          checked={notifications.newOrders}
                          onCheckedChange={(value) => handleNotificationChange('newOrders', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-muted-foreground">New messages from clients</p>
                        </div>
                        <Switch
                          checked={notifications.messages}
                          onCheckedChange={(value) => handleNotificationChange('messages', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Payments</p>
                          <p className="text-sm text-muted-foreground">Payment confirmations and updates</p>
                        </div>
                        <Switch
                          checked={notifications.payments}
                          onCheckedChange={(value) => handleNotificationChange('payments', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing</p>
                          <p className="text-sm text-muted-foreground">Tips, offers, and platform updates</p>
                        </div>
                        <Switch
                          checked={notifications.marketing}
                          onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Control your privacy and what information is visible to others.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                      </div>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="clients">Clients Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Online Status</p>
                        <p className="text-sm text-muted-foreground">Show when you're online</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-sm text-muted-foreground">Show average response time</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Last Seen</p>
                        <p className="text-sm text-muted-foreground">Show when you were last active</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-medium">•••• •••• •••• 4242</span>
                        </div>
                        <Badge variant="secondary">Primary</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Withdrawal Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="minWithdrawal">Minimum Withdrawal Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="minWithdrawal" className="pl-10" defaultValue="50" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="autoWithdraw">Auto-withdraw frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="manual">Manual only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <CardTitle>Appearance & Language</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Theme</Label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("light")}
                          className="flex items-center gap-2"
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("dark")}
                          className="flex items-center gap-2"
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("system")}
                          className="flex items-center gap-2"
                        >
                          <Laptop className="h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger className="w-64">
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
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle>Data Export</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Download your account data and activity history.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Account Data
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      You'll receive an email with your data within 24 hours.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 border-destructive/20" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Irreversible and destructive actions.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This will permanently delete your account and all associated data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <div className="flex gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;