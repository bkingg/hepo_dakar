import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";

interface ArticleTag {
  _key: string;
  label: string;
  name: string;
}

const ACTUALITES_QUERY = groq`*[
  _type == "article"
  && defined(slug.current)
] | order(_createdAt desc)
{_id, title, slug, tags[], image, description, _createdAt}`;

export default async function Actualites() {
  const actualites = await sanityFetch<SanityDocument[]>({
    query: ACTUALITES_QUERY,
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Actualités</h1>
      </PageHeader>
      <div className="section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
            {actualites.length === undefined && (
              <p>Aucun Article disponible.</p>
            )}
            {actualites.map((actualite) => {
              return (
                <Link
                  href={`/actualites/${actualite.slug.current}`}
                  className="col"
                  key={actualite._id}
                >
                  <div className="card h-100">
                    <Image
                      src={urlFor(actualite.image)
                        .size(400, 400)
                        .crop("center")
                        .url()}
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
                      {actualite.tags.map((tag: ArticleTag) => (
                        <span key={tag._key}>
                          <span className="badge rounded-pill bg-light text-dark">
                            {tag.label}
                          </span>
                          &nbsp;
                        </span>
                      ))}
                    </div>
                    <div className="card-footer">
                      Publié le&nbsp;
                      <time dateTime={actualite._createdAt}>
                        {format(parseISO(actualite._createdAt), "d LLLL yyyy", {
                          locale: fr,
                        })}
                      </time>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary">Voir Plus</button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
