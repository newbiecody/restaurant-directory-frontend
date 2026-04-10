"use client";

export const REVIEW_SORT_OPTIONS = [
  { label: "Most Helpful", value: "helpfulCount,desc" },
  { label: "Most Recent", value: "createdAt,desc" },
  { label: "Highest Rating", value: "rating,desc" },
  { label: "Lowest Rating", value: "rating,asc" },
] as const;

interface ReviewSortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ReviewSortSelect({
  value,
  onChange,
}: ReviewSortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {REVIEW_SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
