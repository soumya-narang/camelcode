"use client";

import { cn } from "@/lib/utils";
import type { Lesson } from "@/types";
import { LessonNavigation } from "./LessonNavigation";

interface LessonLayoutProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export function LessonLayout({ lesson, children }: LessonLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="text-sm text-gray-500 mb-2">
          {lesson.chapterTitle} • Lesson {lesson.order}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {lesson.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {lesson.description}
        </p>
      </header>

      <article
        className={cn(
          "prose prose-lg dark:prose-invert max-w-none",
          "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
          "prose-p:text-gray-700 dark:prose-p:text-gray-300",
          "prose-code:text-emerald-600 dark:prose-code:text-emerald-400",
          "prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800",
          "prose-blockquote:border-l-emerald-500"
        )}
      >
        {children}
      </article>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <LessonNavigation
          chapter={lesson.chapter}
          lesson={lesson.slug}
        />
      </footer>
    </div>
  );
}
