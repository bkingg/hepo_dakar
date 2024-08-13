import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import SliderSection from "@/components/sections/SliderSection";
import LogoListSection from "@/components/sections/LogoListSection";
import LatestArticlesSection from "@/components/sections/LatestArticlesSection";

export default async function Home() {
  const HOMEPAGE_QUERY = groq`*[
    _type == "page"
    && slug.current == "accueil"
  ][0]{
    _id, 
    sections[]
  }`;

  const home = await sanityFetch<SanityDocument>({ query: HOMEPAGE_QUERY });
  return (
    <>
      {home.sections.map(
        (section: any) =>
          (section._type == "slider" && (
            <SliderSection key={section._key} slides={section.slides} />
          )) ||
          (section._type == "logo_list" && (
            <LogoListSection key={section._key} section={section} />
          )) ||
          (section._type == "latest_articles" && (
            <LatestArticlesSection key={section._key} section={section} />
          ))
      )}
    </>
  );
}
