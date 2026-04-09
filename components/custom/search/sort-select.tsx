"use client";

export const SORT_OPTIONS = [
  { label: "Top Rated", value: "simpleRating,desc" },
  { label: "Lowest Price", value: "price,asc" },
  { label: "Highest Price", value: "price,desc" },
  { label: "Newest", value: "createdAt,desc" },
] as const;

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function SortSelect({
  value,
  onChange,
  disabled = false,
}: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
