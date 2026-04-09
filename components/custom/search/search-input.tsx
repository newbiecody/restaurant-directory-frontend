"use client";

import { Input } from "@/components/ui/input";
import { MagnifyingGlass, XCircle } from "@phosphor-icons/react/ssr";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search dishes...",
  disabled = false,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlass
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-9"
      />
      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <XCircle size={18} />
        </button>
      )}
    </div>
  );
}
