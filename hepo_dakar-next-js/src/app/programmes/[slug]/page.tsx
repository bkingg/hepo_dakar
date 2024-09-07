import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import Sections from "@/components/sections/Sections";
import { ResolvingMetadata, Metadata } from "next";

let programme: SanityDocument;
let programmeImageUrl: string;

export default async function Page({ params }: { params: { slug: string } }) {
  const PROGRAMME_QUERY = groq`
      *[
        _type == "programme"
        && defined(slug.current)
        && slug.current == "${params.slug}"
      ][0]{
        _id, title, image, slug, description, 
        sections[]{
          ...,
          "brochureUrl": brochure.asset->url,
        },
      }`;
  programme = await sanityFetch<SanityDocument>({
    query: PROGRAMME_QUERY,
  });

  if (!programme) notFound();

  const programmeImageUrl = programme.image
    ? urlFor(programme.image).width(1000).url()
    : undefined;

  return (
    <div className="programme">
      <PageHeader image={programmeImageUrl ? programmeImageUrl : undefined}>
        <h1 className="page__title">{programme.title}</h1>
      </PageHeader>
      {programme.sections && <Sections sections={programme.sections} />}
    </div>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: programme?.title,
    openGraph: {
      images: [programmeImageUrl],
    },
  };
}
