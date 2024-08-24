import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Sections from "@/components/sections/Sections";

export default async function Home() {
  const HOMEPAGE_QUERY = groq`*[
    _type == "page"
    && slug.current == "accueil"
  ][0]{
    _id, 
    sections[]{
      ...,
      "brochureUrl": brochure.asset->url,
    },
  }`;

  const home = await sanityFetch<SanityDocument>({ query: HOMEPAGE_QUERY });
  return <Sections sections={home.sections} />;
}
