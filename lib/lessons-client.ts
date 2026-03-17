"use client";

import type { Lesson } from "@/types";

// Client-side lesson data (duplicated from server for client components)
const lessonsData: Lesson[] = [
  {
    slug: "01-hello-world",
    title: "Hello World",
    description: "Write your first OCaml program and learn about the toplevel",
    chapter: "01-getting-started",
    chapterTitle: "Getting Started",
    order: 1,
    content: "",
  },
];

export async function getAdjacentLessons(
  chapterSlug: string,
  lessonSlug: string
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const currentIndex = lessonsData.findIndex(
    (l) => l.chapter === chapterSlug && l.slug === lessonSlug
  );

  return {
    prev: currentIndex > 0 ? lessonsData[currentIndex - 1] : null,
    next: currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null,
  };
}
