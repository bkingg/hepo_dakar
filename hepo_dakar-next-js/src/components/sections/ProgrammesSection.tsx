import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ProgrammeCard from "../ProgrammeCard";
import Link from "next/link";

interface LatestArticlesSectionProps {
  section: any;
}

interface Actualite {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  description: string;
}

const PROGRAMMES_QUERY = groq`*[
  _type == "programme"
  && defined(slug.current)
  && defined(image)
][0..7]
{_id, title, slug, image}`;

export default async function ProgrammesSection({
  section,
}: LatestArticlesSectionProps) {
  const programmes = await sanityFetch<SanityDocument[]>({
    query: PROGRAMMES_QUERY,
  });
  return (
    <section className="section section__actualites">
      <div className="container">
        {section.title && <h1 className="text-center">{section.title}</h1>}
        {section.description && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {programmes.map((programme) => {
            return <ProgrammeCard key={programme._id} programme={programme} />;
          })}
        </div>
        <div className="text-center my-2">
          <Link href="/programmes">Voir Plus...</Link>
        </div>
      </div>
    </section>
  );
}
