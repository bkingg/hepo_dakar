import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import urlFor from "@/lib/urlFor";
import PageHeader from "@/components/PageHeader";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import { notFound } from "next/navigation";

interface ArticleTag {
  _key: string;
  label: string;
  name: string;
}

export default async function Actualite({
  params,
}: {
  params: { slug: string };
}) {
  const ACTUALITE_QUERY = groq`
    *[
      _type == "article"
      && defined(slug.current)
      && slug.current == "${params.slug}"
    ][0]{
      _id, 
      title, 
      image, 
      tags[], 
      slug, 
      description, 
      _createdAt
    }`;
  const actualite = await sanityFetch<SanityDocument>({
    query: ACTUALITE_QUERY,
  });

  if (!actualite) notFound();

  const actualiteImageUrl = actualite.image
    ? urlFor(actualite.image).width(1000).url()
    : undefined;

  return (
    <>
      <PageHeader image={actualiteImageUrl ? actualiteImageUrl : undefined}>
        <h1 className="page__title">{actualite.title}</h1>
      </PageHeader>
      <div className="container">
        <PortableText value={actualite.description} />
        <p className="pt-5">
          <i className="bi bi-tag pe-1"></i>
          {actualite.tags.map((tag: ArticleTag) => (
            <span key={tag._key}>
              <span className="badge rounded-pill bg-light text-dark">
                {tag.label}
              </span>
              &nbsp;
            </span>
          ))}
        </p>
        <p className="pb-5">
          Publié le&nbsp;
          <time dateTime={actualite._createdAt}>
            {format(parseISO(actualite._createdAt), "d LLLL yyyy", {
              locale: fr,
            })}
          </time>
        </p>
      </div>
    </>
  );
}
