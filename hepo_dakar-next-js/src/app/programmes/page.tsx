import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ProgrammeCard from "@/components/ProgrammeCard";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Liste des Programmes",
};

const PROGRAMMES_QUERY = groq`*[
  _type == "programme"
  && defined(slug.current)
] | order(title asc)
{_id, title, slug, image, sections[]}`;

export default async function Programmes() {
  const programmes = await sanityFetch<SanityDocument[]>({
    query: PROGRAMMES_QUERY,
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Programmes</h1>
      </PageHeader>
      <div className="section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
            {programmes.length === undefined && (
              <p>Aucun Programme disponible.</p>
            )}
            {programmes.map((programme) => {
              const programmeImageUrl = programme.image
                ? urlFor(programme.image).size(500, 500).fit("crop").url()
                : "";
              return (
                <ProgrammeCard key={programme._id} programme={programme} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
