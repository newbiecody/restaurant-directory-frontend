import { useState, useRef, useCallback } from "react";

export function useEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const getContent = useCallback(() => {
    return editorRef.current?.innerHTML || "";
  }, []);

  const setEditorContent = useCallback((html: string) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
      setContent(html);
    }
  }, []);

  const clear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setContent("");
    }
  }, []);

  return {
    editorRef,
    content,
    setContent,
    getContent,
    setEditorContent,
    clear,
  };
}
