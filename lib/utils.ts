import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TLocation = {
  latitude: number;
  longitude: number;
};

const toRadians = (deg: number) => (deg * Math.PI) / 180;
/**
 * Calculates distance using the Haversine formula.
 * @returns Distance in KM
 */
export const calculateDistance = (
  locationOne: TLocation,
  locationTwo: TLocation
) => {
  const EARTH_RADIUS = 6371; // in km

  const latOneRadians = toRadians(locationOne.latitude);
  const latTwoRadians = toRadians(locationTwo.latitude);
  const diffLatRadians = toRadians(locationTwo.latitude - locationOne.latitude);
  const diffLonRadians = toRadians(
    locationTwo.longitude - locationOne.longitude
  );

  const a =
    Math.sin(diffLatRadians / 2) ** 2 +
    Math.cos(latOneRadians) *
      Math.cos(latTwoRadians) *
      Math.sin(diffLonRadians / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c; // returns distance in kilometers
};

export const kmToHumanReadable = (distance: number) => {
  return distance < 1
    ? `${parseFloat(distance.toFixed(3)) * 1000} m`
    : `${distance.toFixed(2)} km`;
};

export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

type MealPeriod = {
  name: string;
  start: number; // hour
  end: number; // hour
};

const MEAL_PERIODS: MealPeriod[] = [
  { name: "breakfast", start: 5, end: 11 },
  { name: "lunch", start: 11, end: 15 },
  { name: "tea", start: 15, end: 18 },
  { name: "dinner", start: 18, end: 22 },
  { name: "supper", start: 22, end: 24 },
  { name: "late night", start: 0, end: 5 },
];

export function getMealTime(date: Date = new Date()): string {
  const hour = date.getHours();

  for (const m of MEAL_PERIODS) {
    // handles times crossing midnight
    if (m.start <= hour && hour < m.end) {
      return m.name;
    }
  }

  return "unknown";
}

export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomISODate = () => {
  const now = Date.now();
  const past = now - randInt(0, 1000 * 60 * 60 * 24 * 14);
  return new Date(past).toISOString();
};
