import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";

interface FooterMenu {
  _key: string;
  title: string;
  menu: MenuItems;
}

interface MenuItems {
  items: MenuItem[];
}

interface MenuItem {
  _key: string;
  title: string;
  url: string;
}

export default async function Footer() {
  const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
    // Header
    logo,
    // Footer
    footerBgImage,
    footerLogo,
    footerDescription,
    footerMenus[]{
      _key, title, menu->{items}
    },
    facebook,
    twitter,
    instagram,
    linkedin
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });
  const footerMenus = siteSettings.footerMenus;
  return (
    <footer
      style={{
        backgroundColor: "rgba(44, 35, 107, 1)",
        backgroundImage: urlFor(siteSettings.footerBgImage).width(800).url()
          ? `linear-gradient(to top, rgba(44, 35, 107, 0.7), rgba(44, 35, 107, 1) 95%), url(${urlFor(siteSettings.footerBgImage).width(800).url()})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="footer py-5 text-light"
    >
      <div className="container">
        <div className="footer__newsletter card mb-5">
          <form className="card-body">
            <div className="row d-flex align-items-center">
              <div className="col-sm-6">
                <h5>Souscrire à la Newsletter</h5>
                <p className="mb-0">Résumé mensuel de nos activités</p>
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Adresse Email
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Souscrire
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-3">
            {siteSettings.footerLogo && (
              <Image
                src={urlFor(siteSettings.footerLogo)
                  .width(300)
                  .crop("center")
                  .url()}
                width={200}
                height={0}
                alt="Hepo Dakar"
                title="Hepo Dakar"
                className="img-fluid mb-3"
              />
            )}
            {siteSettings.footerDescription && (
              <p>{siteSettings.footerDescription}</p>
            )}
          </div>
          {footerMenus?.map((menu: FooterMenu) => {
            return (
              <div key={menu._key} className="col-sm-6 col-md-3 mb-3">
                <h5 className="mb-3">{menu.title}</h5>
                <ul className="nav flex-column">
                  {menu.menu.items?.map((link: MenuItem) => (
                    <li className="nav-item mb-2" key={link._key}>
                      <Link
                        key={link._key}
                        className="nav-link p-0"
                        href={link.url}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 border-top">
          <p>© 2024 Hepo Dakar</p>
          <ul className="list-unstyled d-flex">
            {siteSettings.twitter && (
              <li className="ps-4">
                <Link
                  className="link-body-emphasis"
                  href={siteSettings.twitter}
                  target="_blank"
                >
                  <i className="bi bi-twitter"></i>
                </Link>
              </li>
            )}
            {siteSettings.instagram && (
              <li className="ps-4">
                <Link
                  className="link-body-emphasis"
                  href={siteSettings.instagram}
                  target="_blank"
                >
                  <i className="bi bi-instagram"></i>
                </Link>
              </li>
            )}
            {siteSettings.facebook && (
              <li className="ps-4">
                <Link
                  className="link-body-emphasis"
                  href={siteSettings.facebook}
                  target="_blank"
                >
                  <i className="bi bi-facebook"></i>
                </Link>
              </li>
            )}
            {siteSettings.linkedin && (
              <li className="ps-4">
                <Link
                  className="link-body-emphasis"
                  href={siteSettings.linkedin}
                  target="_blank"
                >
                  <i className="bi bi-linkedin"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
