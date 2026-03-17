import matter from "gray-matter";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import type { Lesson, Chapter } from "@/types";

const LESSONS_DIR = join(process.cwd(), "content/lessons");

interface LessonFrontmatter {
  title: string;
  description: string;
  order: number;
}

export async function getLesson(
  chapterSlug: string,
  lessonSlug: string
): Promise<(Lesson & { content: string }) | null> {
  try {
    const filePath = join(LESSONS_DIR, chapterSlug, `${lessonSlug}.mdx`);
    const fileContent = await readFile(filePath, "utf-8");

    const { data, content } = matter(fileContent);
    const frontmatter = data as LessonFrontmatter;
    const chapterTitle = await getChapterTitle(chapterSlug);

    return {
      slug: lessonSlug,
      title: frontmatter.title,
      description: frontmatter.description,
      chapter: chapterSlug,
      chapterTitle,
      order: frontmatter.order,
      content,
    };
  } catch {
    return null;
  }
}

export async function getChapterTitle(chapterSlug: string): Promise<string> {
  try {
    const chapters = await getChapters();
    const chapter = chapters.find((c) => c.slug === chapterSlug);
    return chapter?.title || chapterSlug;
  } catch {
    return chapterSlug;
  }
}

export async function getChapters(): Promise<Chapter[]> {
  const chapters: Chapter[] = [];

  try {
    const chapterDirs = await readdir(LESSONS_DIR);

    for (const chapterDir of chapterDirs) {
      const chapterPath = join(LESSONS_DIR, chapterDir);
      const lessonFiles = await readdir(chapterPath);

      const lessons: Lesson[] = [];
      for (const file of lessonFiles) {
        if (file.endsWith(".mdx")) {
          const lessonSlug = file.replace(".mdx", "");
          const filePath = join(chapterPath, file);
          const fileContent = await readFile(filePath, "utf-8");
          const { data } = matter(fileContent);
          const frontmatter = data as LessonFrontmatter;

          lessons.push({
            slug: lessonSlug,
            title: frontmatter.title,
            description: frontmatter.description,
            chapter: chapterDir,
            chapterTitle: "", // Will be filled in later
            order: frontmatter.order,
            content: "",
          });
        }
      }

      lessons.sort((a, b) => a.order - b.order);

      const order = parseInt(chapterDir.split("-")[0]) || 0;
      const title = chapterDir
        .split("-")
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Fill in chapter titles for lessons
      lessons.forEach((lesson) => {
        lesson.chapterTitle = title;
      });

      chapters.push({
        slug: chapterDir,
        title,
        order,
        lessons,
      });
    }

    chapters.sort((a, b) => a.order - b.order);
  } catch {
    // Directory might not exist yet
  }

  return chapters;
}

export async function getAllLessons(): Promise<Lesson[]> {
  const chapters = await getChapters();
  return chapters.flatMap((c) => c.lessons);
}

export async function getAdjacentLessons(
  chapterSlug: string,
  lessonSlug: string
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const lessons = await getAllLessons();
  const currentIndex = lessons.findIndex(
    (l) => l.chapter === chapterSlug && l.slug === lessonSlug
  );

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  };
}
