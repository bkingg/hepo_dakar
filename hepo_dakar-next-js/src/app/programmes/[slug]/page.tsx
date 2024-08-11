import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";

export default async function Page({ params }: { params: { slug: string } }) {
  const PROGRAMME_QUERY = `
      *[
        _type == "programme"
        && defined(slug.current)
        && slug.current == "${params.slug}"
      ][0]{_id, title, image, slug, description}`;
  const programme = await sanityFetch<SanityDocument>({
    query: PROGRAMME_QUERY,
  });

  const programmeImageUrl = programme.image
    ? urlFor(programme.image).size(1000, 1000).crop("center").url()
    : "";

  return (
    <>
      <PageHeader image={programmeImageUrl ? programmeImageUrl : undefined}>
        <h1 className="page__title">{programme.title}</h1>
      </PageHeader>
      <div className="container">
        <PortableText value={programme.description} />
      </div>
    </>
  );
}
