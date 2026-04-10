"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useUserActions } from "@/context/user-context";
import { UserIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import MenuItem from "./MenuItem";

function NavBar() {
  const { user, isLoading } = useUser();
  const { logout } = useUserActions();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (_error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="border-b border-gray-200 px-4 py-2 md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Yums!
        </Link>
        <div className="flex items-center gap-2">
          {user && (
            <Link href="/blog/new" className="md:hidden">
              <Button className="shadow" size="sm">
                New Blog Post
              </Button>
            </Link>
          )}
          <button
            className="md:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div
        className={`md:flex md:items-center md:space-x-4 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col md:flex-row md:space-x-4">
            <MenuItem label="Home" href="/" />
            <MenuItem label="Explore" href="/explore" />
            <MenuItem label="Activity" href="/activity" />
            <MenuItem label="Bookmarked" href="/user/overview?tab=savedDishes" />
            <MenuItem label="Blog Posts" href="/blog" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden md:flex gap-2 items-center">
        {user && (
          <Link href="/blog/new">
            <Button className="shadow">New Blog Post</Button>
          </Link>
        )}
        {!user && !isLoading ? (
          <>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Sign Up
              </Button>
            </Link>
          </>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="border">
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/user/overview">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </nav>
  );
}

export default NavBar;
