import PageHeader from "@/components/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

const PAGES_QUERY = `*[
  _type == "page"
  && defined(slug.current)
]{_id, title, slug, image, description}`;

export default async function Pages() {
  const pages = await sanityFetch<SanityDocument[]>({ query: PAGES_QUERY });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Pages</h1>
      </PageHeader>
      <div className="container">
        <ul>
          {pages.map((page) => (
            <li className="bg-white p-4 rounded-lg" key={page._id}>
              <Link href={`/pages/${page.slug.current}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
