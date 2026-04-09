"use client";

import DOMPurify from "dompurify";
import { useMemo } from "react";

interface SanitizedBlogContentProps {
  content: string;
}

export default function SanitizedBlogContent({ content }: SanitizedBlogContentProps) {
  const sanitized = useMemo(() => {
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "h1", "h2", "h3", "ul", "ol", "li"] });
  }, [content]);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
