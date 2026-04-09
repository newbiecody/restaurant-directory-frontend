"use client";

import { useUser } from "@/context/user-context";

export default function GreetingSection() {
  const { user } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const name = user?.username || "Guest";

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">
        {getGreeting()}, <span className="text-orange-600">{name}</span>!
      </h1>
      <p className="text-lg text-muted-foreground">Discover amazing restaurants and dishes</p>
    </div>
  );
}
