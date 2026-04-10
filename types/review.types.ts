import type ReviewPhoto from "./photo.types";

export interface ReviewUser {
  id: number;
  username: string;
  picture: string;
}

export interface ReviewVote {
  voteId: number;
  reviewId: number;
  userId: number;
  voteType: string;
  votedAt: string;
}

export default interface Review {
  id: number;
  place_id: number;
  user: ReviewUser;
  rating: number;
  comment: string;
  created_at: string;
  reviewPhotos: ReviewPhoto[];
  reviewVotes: ReviewVote[];
}
