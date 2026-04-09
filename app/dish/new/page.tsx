"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

export default function NewDishPage() {
  useRequireAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !restaurantId.trim()) {
      toast.error("Name and restaurant are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/dishes", {
        name,
        description,
        price: price ? parseFloat(price) : null,
        restaurantId: parseInt(restaurantId),
      });

      toast.success("Dish created successfully!");
      router.push("/");
    } catch {
      toast.error("Failed to create dish");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add a New Dish</h1>
        <p className="text-muted-foreground mt-2">Help others discover new dishes</p>
      </div>

      <div className="space-y-4 border rounded-lg p-6">
        <div>
          <label className="text-sm font-medium">Dish Name</label>
          <Input
            placeholder="e.g., Margherita Pizza"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Restaurant ID</label>
          <Input
            type="number"
            placeholder="Enter restaurant ID"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            disabled={isSubmitting}
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the dish..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Price</label>
          <Input
            type="number"
            step="0.01"
            placeholder="e.g., 12.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isSubmitting}
            className="mt-2"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !name.trim() || !restaurantId.trim()}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Creating..." : "Create Dish"}
          </Button>
          <Button onClick={() => router.back()} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
