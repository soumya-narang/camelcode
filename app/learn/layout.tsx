import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getChapters } from "@/lib/lessons";

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = await getChapters();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xl"
            >
              <BookOpen className="w-6 h-6" />
              <span>CamelCode</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-6">
              {chapters.map((chapter) => (
                <div key={chapter.slug}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {chapter.title}
                  </h3>
                  <ul className="space-y-1">
                    {chapter.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/learn/${chapter.slug}/${lesson.slug}`}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm",
                            "text-gray-600 dark:text-gray-400",
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            "hover:text-gray-900 dark:hover:text-gray-100",
                            "transition-colors"
                          )}
                        >
                          {lesson.order}. {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
