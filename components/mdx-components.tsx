import { CodePlayground } from "./editor/CodePlayground";

export const mdxComponents = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <pre
        {...props}
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
      >
        {children}
      </pre>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isOcaml = className?.includes("language-ocaml");
    const code = String(children).replace(/\n$/, "");

    if (isOcaml) {
      return (
        <CodePlayground
          defaultCode={code}
          height="200px"
          className="my-6"
        />
      );
    }

    return (
      <code
        {...props}
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400"
      >
        {children}
      </code>
    );
  },
};
