import Link from "next/link";
import { BookOpen, Code2, Play, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
            <BookOpen className="w-8 h-8" />
            <span>CamelCode</span>
          </div>
          <Link
            href="/learn/01-getting-started/01-hello-world"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Learn OCaml
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              Interactively
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Master OCaml with hands-on lessons and an embedded compiler.
            Write, run, and experiment with code directly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/01-getting-started/01-hello-world"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Learning
            </Link>
            <a
              href="https://ocaml.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg transition-colors"
            >
              <Code2 className="w-5 h-5" />
              About OCaml
            </a>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Code
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Write and execute OCaml code directly in your browser. No
              installation required.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Structured Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Progress through carefully designed lessons covering OCaml
              fundamentals to advanced topics.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real Compiler
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Powered by js_of_ocaml - the actual OCaml compiler running in your
              browser.
            </p>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 dark:text-gray-400">
        <p>Built with Next.js, Tailwind CSS, and js_of_ocaml</p>
      </footer>
    </div>
  );
}
