import type ReviewPhoto from "./photo.types";

export interface ReviewVote {
  id: number;
  reviewId: number;
  userId: number;
  voteType: 1 | -1;
  createdAt: string;
}

export default interface Review {
  id: number;
  place_id: number;
  user: {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    picture: string;
    googleId: string;
    bio: string;
  };
  rating: number;
  comment: string;
  created_at: string;
  reviewPhotos: ReviewPhoto[];
  reviewVotes: ReviewVote[];
}
