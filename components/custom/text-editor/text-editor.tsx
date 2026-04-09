"use client";

import { useCaretFormatting } from "@/hooks/use-caret-formatting";
import { useEditor } from "@/hooks/use-editor";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TextEditorProps {
  placeholder?: string;
  onChange?: (content: string) => void;
  value?: string;
}

export default function TextEditor({
  placeholder = "Start writing...",
  onChange,
  value,
}: TextEditorProps) {
  const { editorRef, getContent } = useEditor();
  const { toggleBold, toggleItalic, toggleUnderline, applyFormat } = useCaretFormatting();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (value && editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    const content = getContent();
    onChange?.(content);
  };

  const handleBold = () => {
    toggleBold();
    setIsBold(document.queryCommandState("bold"));
  };

  const handleItalic = () => {
    toggleItalic();
    setIsItalic(document.queryCommandState("italic"));
  };

  const handleUnderline = () => {
    toggleUnderline();
    setIsUnderline(document.queryCommandState("underline"));
  };

  const handleHeading = () => {
    applyFormat("formatBlock", "<h2>");
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted border-b p-2 flex gap-1 flex-wrap">
        <Button
          variant={isBold ? "default" : "outline"}
          size="sm"
          onClick={handleBold}
          className="font-bold"
        >
          B
        </Button>
        <Button
          variant={isItalic ? "default" : "outline"}
          size="sm"
          onClick={handleItalic}
          className="italic"
        >
          I
        </Button>
        <Button
          variant={isUnderline ? "default" : "outline"}
          size="sm"
          onClick={handleUnderline}
          className="underline"
        >
          U
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={handleHeading}
        >
          H2
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => applyFormat("insertUnorderedList")}
        >
          List
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-96 p-4 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 rounded-b"
        data-placeholder={placeholder}
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      />
    </div>
  );
}
