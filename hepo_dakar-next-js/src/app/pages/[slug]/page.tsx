import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";

export default async function Page({ params }: { params: { slug: string } }) {
  const PAGE_QUERY = `
      *[
        _type == "page"
        && defined(slug.current)
        && slug.current == "${params.slug}"
      ][0]{_id, title, slug, image, description}`;
  const page = await sanityFetch<SanityDocument>({ query: PAGE_QUERY });

  const pageImageUrl = page.image
    ? urlFor(page.image).size(1000, 1000).crop("center").url()
    : undefined;
  return (
    <>
      <PageHeader image={pageImageUrl}>
        <h1 className="page__title">{page.title}</h1>
      </PageHeader>
      <div className="container">
        <PortableText value={page.description} />
      </div>
    </>
  );
}
