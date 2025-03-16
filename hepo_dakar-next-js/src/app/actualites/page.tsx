import PageHeader from "@/components/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import urlFor from "@/lib/urlFor";

const SITE_SETTINGS_QUERY = groq`*[
  _type == "siteSettings"
][0]{
  actualitesPageImage
}`;

const ACTUALITES_QUERY = groq`*[
  _type == "article"
  && defined(slug.current)
] | order(_createdAt desc)
{_id, title, slug, tags[], image, description, _createdAt}`;

export default async function Actualites() {
  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const actualitesPageImageUrl = siteSettings?.actualitesPageImage
    ? urlFor(siteSettings?.actualitesPageImage)
        .size(1000, 1000)
        .crop("center")
        .url()
    : "";

  const actualites = await sanityFetch<SanityDocument[]>({
    query: ACTUALITES_QUERY,
  });

  return (
    <>
      <PageHeader image={actualitesPageImageUrl}>
        <h1 className="page__title">Actualités</h1>
      </PageHeader>
      <div className="section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
            {actualites.length === undefined && (
              <p>Aucun Article disponible.</p>
            )}
            {actualites.map((actualite) => {
              return <ArticleCard key={actualite._id} actualite={actualite} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
