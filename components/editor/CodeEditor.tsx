"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  height?: string;
  className?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  height = "300px",
  className,
  readOnly = false,
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-gray-900 rounded-lg flex items-center justify-center",
          className
        )}
        style={{ height }}
      >
        <span className="text-gray-500">Loading editor...</span>
      </div>
    );
  }

  return (
    <Editor
      height={height}
      defaultLanguage="ocaml"
      value={value}
      onChange={(value) => onChange?.(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        fontFamily: "var(--font-geist-mono), monospace",
      }}
      className={cn("rounded-lg overflow-hidden", className)}
    />
  );
}
