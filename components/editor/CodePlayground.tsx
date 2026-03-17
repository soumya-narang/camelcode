"use client";

import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { OCamlRunner } from "./OCamlRunner";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
  defaultCode?: string;
  height?: string;
  className?: string;
  readOnly?: boolean;
}

export function CodePlayground({
  defaultCode = "(* Write your OCaml code here *)\n\n",
  height = "300px",
  className,
  readOnly = false,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <CodeEditor
          value={code}
          onChange={setCode}
          height={height}
          readOnly={readOnly}
        />
      </div>
      {!readOnly && <OCamlRunner code={code} />}
    </div>
  );
}
