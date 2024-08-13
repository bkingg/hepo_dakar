import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import Tags from "./Tags";

interface ArticleCardProps {
  actualite: SanityDocument;
}

interface ArticleTag {
  _key: string;
  label: string;
  name: string;
}

interface Actualite {
  _id: string;
  title: string;
  slug: { current: string };
  tags: ArticleTag[];
  image: string;
  description: string;
  _createdAt: string;
}

export default async function ArticleCard({ actualite }: ArticleCardProps) {
  return (
    <>
      <Link href={`/actualites/${actualite.slug.current}`} className="col mb-5">
        <div className="card h-100">
          <Image
            src={urlFor(actualite.image).size(400, 400).crop("center").url()}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={actualite.title}
            title={actualite.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{actualite.title}</h5>
            {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
          </div>
          <div className="card-footer">
            <Tags tags={actualite.tags} />
          </div>
          <div className="card-footer">
            Publié il y a&nbsp;
            <time dateTime={actualite._createdAt}>
              {formatDistance(Date.now(), parseISO(actualite._createdAt), {
                locale: fr,
              })}
            </time>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Voir Plus</button>
          </div>
        </div>
      </Link>
    </>
  );
}
