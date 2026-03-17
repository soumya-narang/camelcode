"use client";

import { useState, useCallback } from "react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CodeExecutionResult } from "@/types";

interface OCamlRunnerProps {
  code: string;
  className?: string;
}

export function OCamlRunner({ code, className }: OCamlRunnerProps) {
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setResult(null);

    try {
      // TODO: Integrate js_of_ocaml for real OCaml execution
      // For now, we'll simulate execution with a mock response
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simple pattern matching for demo purposes
      const trimmedCode = code.trim();
      let output = "";
      let error = null;

      if (trimmedCode.includes("print_endline")) {
        const match = trimmedCode.match(/"([^"]*)"/);
        output = match ? match[1] : "Hello World";
      } else if (trimmedCode.includes("let")) {
        const match = trimmedCode.match(/let\s+(\w+)\s*=\s*(.+)/);
        if (match) {
          const [, name, value] = match;
          output = `val ${name} : int = ${value.trim()}`;
        }
      } else if (trimmedCode.includes("+")) {
        try {
          // Simple arithmetic evaluation
          const expr = trimmedCode.replace(/;;/g, "").trim();
          // eslint-disable-next-line no-eval
          const result = eval(expr);
          output = `- : int = ${result}`;
        } catch {
          output = trimmedCode;
        }
      } else {
        output = trimmedCode || "No output";
      }

      setResult({
        output,
        error,
        success: true,
      });
    } catch (err) {
      setResult({
        output: "",
        error: err instanceof Error ? err.message : "Unknown error",
        success: false,
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const clearOutput = () => {
    setResult(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <button
          onClick={runCode}
          disabled={isRunning}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            isRunning
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          )}
        >
          <Play className="w-4 h-4" />
          {isRunning ? "Running..." : "Run Code"}
        </button>
        {result && (
          <button
            onClick={clearOutput}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {result && (
        <div
          className={cn(
            "rounded-lg p-4 font-mono text-sm",
            result.success
              ? "bg-gray-900 border border-gray-700"
              : "bg-red-950/50 border border-red-800"
          )}
        >
          {result.success ? (
            <div>
              <div className="text-gray-400 mb-2">Output:</div>
              <pre className="text-emerald-400 whitespace-pre-wrap">
                {result.output}
              </pre>
            </div>
          ) : (
            <div>
              <div className="text-red-400 mb-2">Error:</div>
              <pre className="text-red-300 whitespace-pre-wrap">{result.error}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
