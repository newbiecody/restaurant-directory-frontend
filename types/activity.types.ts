import type User from "./user.types";

export enum ActionType {
  USER_UPDATED = "USER_UPDATED",
  REVIEW_CREATED = "REVIEW_CREATED",
  DISH_CREATED = "DISH_CREATED",
  REVIEW_DELETED = "REVIEW_DELETED",
  DISH_DELETED = "DISH_DELETED",
  BOOKMARK_CREATED = "BOOKMARK_CREATED",
  BOOKMARK_DELETED = "BOOKMARK_DELETED",
  PLACE_CREATED = "PLACE_CREATED",
  PLACE_UPDATED = "PLACE_UPDATED",
  PLACE_DELETED = "PLACE_DELETED",
  BLOG_CREATED = "BLOG_CREATED",
  BLOG_DELETED = "BLOG_DELETED",
}

export enum TargetType {
  DISH = "DISH",
  PLACE = "PLACE",
  USER = "USER",
}

export interface BaseActivity {
  id: number;
  userId: string;
  user: User;
  actionType: ActionType;
  targetType: TargetType;
  targetId: number;
  createdAt: string;
}

export interface ReviewCreatedActivity extends BaseActivity {
  actionType: ActionType.REVIEW_CREATED;
  targetType: TargetType.DISH | TargetType.PLACE;
  reviewId: number;
}

export interface ReviewDeletedActivity extends BaseActivity {
  actionType: ActionType.REVIEW_DELETED;
  targetType: TargetType.DISH | TargetType.PLACE;
  reviewId: number;
}

export interface DishCreatedActivity extends BaseActivity {
  actionType: ActionType.DISH_CREATED;
  targetType: TargetType.DISH;
  dishId: number;
}

export interface DishDeletedActivity extends BaseActivity {
  actionType: ActionType.DISH_DELETED;
  targetType: TargetType.DISH;
  dishId: number;
}

export interface BookmarkCreatedActivity extends BaseActivity {
  actionType: ActionType.BOOKMARK_CREATED;
  targetType: TargetType.DISH;
  bookmarkId: number;
}

export interface BookmarkDeletedActivity extends BaseActivity {
  actionType: ActionType.BOOKMARK_DELETED;
  targetType: TargetType.DISH;
  bookmarkId: number;
}

export interface PlaceCreatedActivity extends BaseActivity {
  actionType: ActionType.PLACE_CREATED;
  targetType: TargetType.PLACE;
  placeId: number;
}

export interface PlaceUpdatedActivity extends BaseActivity {
  actionType: ActionType.PLACE_UPDATED;
  targetType: TargetType.PLACE;
  placeId: number;
}

export interface PlaceDeletedActivity extends BaseActivity {
  actionType: ActionType.PLACE_DELETED;
  targetType: TargetType.PLACE;
  placeId: number;
}

export interface BlogCreatedActivity extends BaseActivity {
  actionType: ActionType.BLOG_CREATED;
  targetType: TargetType.USER;
  blogId: number;
}

export interface BlogDeletedActivity extends BaseActivity {
  actionType: ActionType.BLOG_DELETED;
  targetType: TargetType.USER;
  blogId: number;
}

export interface UserUpdatedActivity extends BaseActivity {
  actionType: ActionType.USER_UPDATED;
  targetType: TargetType.USER;
  updatedUserId: string;
}

export type Activity =
  | ReviewCreatedActivity
  | ReviewDeletedActivity
  | DishCreatedActivity
  | DishDeletedActivity
  | BookmarkCreatedActivity
  | BookmarkDeletedActivity
  | PlaceCreatedActivity
  | PlaceUpdatedActivity
  | PlaceDeletedActivity
  | BlogCreatedActivity
  | BlogDeletedActivity
  | UserUpdatedActivity;

export default Activity;
