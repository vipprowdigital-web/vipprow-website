"use client";

import { useMemo } from "react";
import {
  usePublicCaseStudies,
  usePublicCaseStudyCategories,
} from "@/app/features/case-study/hook/useCaseStudy";
import { CaseStudy } from "@/types/case-study";
import ClientCaseStudyGridScroller from "../ui/cards/ClientCaseStudyGridScroller";
import PrimaryHeading from "../ui/heading/PrimaryHeading";

const FALLBACK_LOGO = "/assets/images/articals/1x1.webp";

const categoryId = (c: CaseStudy) =>
  typeof c.category === "object" && c.category ? c.category._id : c.category;

export default function ClientCaseStudyList() {
  const { data: categoryData, isLoading: categoriesLoading } =
    usePublicCaseStudyCategories();
  const { data: caseStudyData, isLoading: caseStudiesLoading } =
    usePublicCaseStudies({ limit: 200 });

  const grouped = useMemo(() => {
    const categories = [...(categoryData?.data ?? [])].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
    const studies = caseStudyData?.data ?? [];

    return categories
      .map((category) => ({
        category,
        items: studies.filter((s) => categoryId(s) === category._id),
      }))
      .filter((group) => group.items.length > 0);
  }, [categoryData, caseStudyData]);

  // Stay invisible until we know there's something to show — this section is
  // optional and the rest of the page (client logo walls) stands on its own.
  if (categoriesLoading || caseStudiesLoading) return null;
  if (!grouped.length) return null;

  return (
    <section className="pt-20">
      <PrimaryHeading
        heading="In-Depth Client Case Studies"
        des="Explore the full story behind our work — the background, the challenge, our approach, and the measurable results."
      />
      {grouped.map(({ category, items }) => (
        <div key={category._id} className="pt-0 max-w-7xl mx-auto">
          <PrimaryHeading
            heading={category.heading || category.name}
            des={category.description || ""}
          />
          <ClientCaseStudyGridScroller
            clients={items.map((study) => ({
              image: study.clientLogo || FALLBACK_LOGO,
              title: study.clientName,
              subtitle: study.title,
              tag: category.name,
              href: `/client-case-study/details/${study._id}`,
            }))}
          />
        </div>
      ))}
    </section>
  );
}
