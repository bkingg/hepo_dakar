import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ProgrammeCard from "@/components/ProgrammeCard";
import { li } from "framer-motion/client";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Liste des Programmes",
};

const SITE_SETTINGS_QUERY = groq`*[
  _type == "siteSettings"
][0]{
  mainMenu->{
    _id, 
    title, 
    handle,
    items[]{
      _key,
      title,
      linkType,
      internalLink->{_id, _type, title, slug, image},
      externalUrl,
      submenuItems[]{
        _key,
        title,
        linkType,
        internalLink->{_id, _type, title, slug, image},
        externalUrl,
        submenuItems[]{
          _key,
          title,
          linkType,
          internalLink->{_id, _type, title, slug, image},
          externalUrl,
          submenuItems[]
        }
      }
    }
  },
}`;

export default async function Programmes() {
  let programmes = Array();

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Programmes</h1>
      </PageHeader>
      <div className="section">
        <div className="container">
          <ul className="nav nav-underline mb-4">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Tous
              </a>
            </li>
            {siteSettings.mainMenu?.items?.map((menuItem: any) => {
              const niveau = menuItem?.title;
              if (menuItem?.internalLink?._type == "programme") {
                menuItem.internalLink.niveau = niveau;
                programmes = [...programmes, menuItem?.internalLink];
              }

              {
                menuItem?.submenuItems?.map((menuItem: any) => {
                  if (menuItem?.internalLink?._type == "programme") {
                    programmes = [...programmes, menuItem?.internalLink];
                    menuItem.internalLink.niveau = niveau;
                  }

                  {
                    menuItem?.submenuItems?.map((menuItem: any) => {
                      if (menuItem?.internalLink?._type == "programme") {
                        programmes = [...programmes, menuItem?.internalLink];
                        menuItem.internalLink.niveau = niveau;
                      }
                    });
                  }
                });
              }

              const menuItemContainsProgramme = menuItem?.submenuItems?.some(
                (menuItem: any) => {
                  const menuItemContainsProgramme =
                    menuItem?.internalLink?._type === "programme" ||
                    menuItem?.submenuItems?.some((menuItem: any) => {
                      return menuItem?.internalLink?._type === "programme";
                    });
                  return menuItemContainsProgramme;
                }
              );
              if (menuItemContainsProgramme)
                return (
                  <li key={menuItem._key} className="nav-item">
                    <a className="nav-link" href="#">
                      {menuItem.title}
                    </a>
                  </li>
                );
            })}
          </ul>
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
            {programmes.length === undefined && (
              <p>Aucun Programme disponible.</p>
            )}
            {programmes
              .sort((a, b) => {
                return a.title.localeCompare(b.title, "fr", {
                  sensitivity: "accent", // Ensures accents are considered in sorting
                  ignorePunctuation: true, // Ignores special punctuation if any
                });
              })
              .map((programme) => {
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
