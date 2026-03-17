"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lesson } from "@/types";
import { getAdjacentLessons } from "@/lib/lessons-client";
import { cn } from "@/lib/utils";

interface LessonNavigationProps {
  chapter: string;
  lesson: string;
}

export function LessonNavigation({ chapter, lesson }: LessonNavigationProps) {
  const [adjacent, setAdjacent] = useState<{
    prev: Lesson | null;
    next: Lesson | null;
  }>({ prev: null, next: null });

  useEffect(() => {
    const loadAdjacent = async () => {
      const result = await getAdjacentLessons(chapter, lesson);
      setAdjacent(result);
    };
    loadAdjacent();
  }, [chapter, lesson]);

  return (
    <div className="flex justify-between items-center">
      <div>
        {adjacent.prev && (
          <Link
            href={`/learn/${adjacent.prev.chapter}/${adjacent.prev.slug}`}
            className={cn(
              "flex items-center gap-2 text-gray-600 dark:text-gray-400",
              "hover:text-emerald-600 dark:hover:text-emerald-400",
              "transition-colors"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-sm">Previous</div>
              <div className="font-medium">{adjacent.prev.title}</div>
            </div>
          </Link>
        )}
      </div>

      <div>
        {adjacent.next && (
          <Link
            href={`/learn/${adjacent.next.chapter}/${adjacent.next.slug}`}
            className={cn(
              "flex items-center gap-2 text-gray-600 dark:text-gray-400",
              "hover:text-emerald-600 dark:hover:text-emerald-400",
              "transition-colors"
            )}
          >
            <div className="text-right">
              <div className="text-sm">Next</div>
              <div className="font-medium">{adjacent.next.title}</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
