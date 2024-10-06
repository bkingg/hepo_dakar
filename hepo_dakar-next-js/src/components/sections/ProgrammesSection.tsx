import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ProgrammeCard from "../ProgrammeCard";
import Link from "next/link";
import urlFor from "@/lib/urlFor";

interface ProgrammesSectionProps {
  section: any;
}

interface Programme {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export default async function ProgrammesSection({
  section,
}: ProgrammesSectionProps) {
  const programmes = section.programmes;
  return (
    <section className="section section__actualites">
      <div className="container">
        {section.title && <h1 className="text-center">{section.title}</h1>}
        {section.description && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {programmes.map((programme: Programme) => {
            programme.imageUrl = programme.image
              ? urlFor(programme.image).size(500, 500).fit("crop").url()
              : "";
            return <ProgrammeCard key={programme._id} programme={programme} />;
          })}
        </div>
        <div className="text-center my-2">
          <Link href="/programmes" className="btn btn-primary">
            Voir tous les Programmes
          </Link>
        </div>
      </div>
    </section>
  );
}
