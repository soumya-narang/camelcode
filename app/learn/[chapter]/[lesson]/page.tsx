import { notFound } from "next/navigation";
import { getLesson, getChapters } from "@/lib/lessons";
import { LessonLayout } from "@/components/lesson/LessonLayout";
import { mdxComponents } from "@/components/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface LessonPageProps {
  params: Promise<{
    chapter: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const chapters = await getChapters();
  const params: { chapter: string; lesson: string }[] = [];

  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      params.push({
        chapter: chapter.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { chapter, lesson } = await params;
  const lessonData = await getLesson(chapter, lesson);

  if (!lessonData) {
    return {
      title: "Lesson Not Found | CamelCode",
    };
  }

  return {
    title: `${lessonData.title} | CamelCode`,
    description: lessonData.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapter, lesson } = await params;
  const lessonData = await getLesson(chapter, lesson);

  if (!lessonData) {
    notFound();
  }

  return (
    <LessonLayout lesson={lessonData}>
      <MDXRemote
        source={lessonData.content}
        components={mdxComponents}
      />
    </LessonLayout>
  );
}
