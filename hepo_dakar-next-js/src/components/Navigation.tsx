import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import MenuItem from "./MenuItem";
import urlFor from "@/lib/urlFor";
import Image from "next/image";

interface MenuItem {
  _key: string;
  title: string;
  url: string;
  submenuItems: MenuItem[];
}

export default async function Navigation() {
  const SITE_SETTINGS_QUERY = `*[
    _type == "siteSettings"
  ][0]{
    _id, 
    logo,
    mainMenu->{handle},
    facebook,
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const MENU_QUERY = `*[
    _type == "menu"
    && handle.current == "${siteSettings.mainMenu.handle.current}"
  ][0]{
    _key, 
    title, 
    handle,
    items
  }`;

  const menu = await sanityFetch<SanityDocument>({ query: MENU_QUERY });

  console.log(siteSettings);

  return (
    <nav className="header navbar navbar-expand-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <Image
            src={urlFor(siteSettings.logo).size(300, 300).crop("center").url()}
            width={200}
            height={200}
            alt="Hepo Dakar"
            title="Hepo Dakar"
            className="img-fluid"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {menu.items.map((item: MenuItem) => {
              return <MenuItem isRoot={true} item={item} key={item._key} />;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
