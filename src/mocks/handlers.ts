import { http, HttpResponse } from "msw";
import user1 from "./responses/users/user1.json";
import user2 from "./responses/users/user2.json";
import dishesResponse from "./responses/dish/dishes.json";
import dishDetails from "./responses/dish/dishDetails.json";
import dishReviews from "./responses/dish/dishReviews.json";
import placeById from "./responses/places/placeById.json";
import userActivity1 from "./responses/users/userActivity1.json";
import userActivity2 from "./responses/users/userActivity2.json";
import bookmarks from "./responses/users/bookmarks";
import blogFeed from "./responses/blog/blogfeed.json";
import { mockBlogPostResponse } from "./responses/blog/blogPost";
import { getMockReviewResponse } from "./responses/dish/submitNewDishReview";
import { uploadResult } from "./responses/upload/singleUpload";

export const handlers = [
  // Auth
  http.get("*/api/auth/me", () => HttpResponse.json(user1)),

  // Dishes
  http.get("*/api/dishes", () => HttpResponse.json(dishesResponse)),
  http.get("*/api/dishes/:id", () => HttpResponse.json(dishDetails)),

  // Reviews
  http.get("*/api/reviews", () => HttpResponse.json(dishReviews)),
  http.post("*/api/reviews", () => HttpResponse.json(getMockReviewResponse())),
  http.delete("*/api/reviews/:id", () => new HttpResponse(null, { status: 204 })),

  // Places
  http.get("*/api/places/:id", () => HttpResponse.json(placeById)),

  // Activities
  http.get("*/api/activities", ({ request }) => {
    const url = new URL(request.url);
    return url.searchParams.has("userId")
      ? HttpResponse.json(userActivity2)
      : HttpResponse.json(userActivity1);
  }),

  // Bookmarks
  http.get("*/api/bookmarks", () => HttpResponse.json(bookmarks)),
  http.post("*/api/bookmarks", () => HttpResponse.json({ id: 999 })),
  http.delete("*/api/bookmarks", () => new HttpResponse(null, { status: 204 })),

  // Users
  http.get("*/api/users/:id", () => HttpResponse.json(user2)),

  // Blog
  http.get("*/api/blog", () => HttpResponse.json(blogFeed)),
  http.get("*/api/blog/:id", () => HttpResponse.json(mockBlogPostResponse)),

  // Uploads
  http.post("*/api/upload/single", () => HttpResponse.json(uploadResult))
];
