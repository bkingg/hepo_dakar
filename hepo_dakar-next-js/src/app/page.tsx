import SliderSection from "@/components/sections/SliderSection";
import LogoListSection from "@/components/sections/LogoListSection";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

export default async function Home() {
  const HOMEPAGE_QUERY = `*[
    _type == "page"
    && slug.current == "accueil"
  ][0]{
    _id, 
    sections
  }`;
  const home = await sanityFetch<SanityDocument>({ query: HOMEPAGE_QUERY });
  return home.sections.map((section: any) => {
    if (section._type == "slider") {
      return <SliderSection key={section._key} slides={section.slides} />;
    }
    if (section._type == "logo_list") {
      return <LogoListSection section={section} />;
    }
  });
}
