import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  DollarSign,
  MessageCircle,
  User,
  Settings,
  Star,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import profilePhoto from "@/assets/profile-photo.jpg";

const navItems = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "My Gigs", href: "/gigs", icon: Briefcase },
  { title: "Earnings", href: "/earnings", icon: DollarSign },
  { title: "Messages", href: "/messages", icon: MessageCircle },
  { title: "Edit Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
];

interface FreelancerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function FreelancerSidebar({ collapsed, onToggle }: FreelancerSidebarProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-card to-secondary border-r border-border transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-80"
      }`}
      style={{
        background: "var(--gradient-soft)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute top-4 right-4 h-8 w-8 hover:bg-primary/10"
      >
        {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      {/* Profile Section */}
      <div className="p-6 pt-16 text-center border-b border-border/50">
        <div className="relative inline-block">
          <img
            src={profilePhoto}
            alt="Profile"
            className={`rounded-full object-cover border-4 border-primary/20 transition-all duration-300 ${
              collapsed ? "w-10 h-10" : "w-24 h-24"
            }`}
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-card rounded-full"></div>
        </div>
        
        {!collapsed && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg text-foreground">Alex Morgan</h3>
            <p className="text-sm text-muted-foreground font-medium">Full Stack Developer</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">4.9 (127 reviews)</span>
            </div>
            <Badge variant="secondary" className="mt-2 text-xs">
              Top Rated Plus
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-card hover:shadow-sm text-foreground"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${collapsed ? "mx-auto" : ""} ${
                      active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.title}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      {!collapsed && (
        <div className="absolute bottom-6 left-4 right-4 p-4 bg-card rounded-lg border border-border/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Monthly Goal</p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-foreground">
              <span className="font-semibold">$3,750</span> / $5,000
            </p>
          </div>
        </div>
      )}
    </div>
  );
}