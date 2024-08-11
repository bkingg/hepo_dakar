import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

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
  const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
    footerMenus[]{
      _key, title, menu->{items}
    },
    facebook,
    twitter,
    instagram
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });
  console.log("settings", siteSettings);
  const footerMenus = siteSettings.footerMenus;
  return (
    <footer className="py-5">
      <div className="container">
        <div className="row">
          {footerMenus?.map((menu: FooterMenu) => {
            return (
              <div key={menu._key} className="col-6 col-md-2 mb-3">
                <h5>{menu.title}</h5>
                <ul className="nav flex-column">
                  {menu.menu.items?.map((link: MenuItem) => {
                    return (
                      <li className="nav-item mb-2">
                        <Link
                          key={link._key}
                          className="nav-link p-0 text-body-secondary"
                          href={link.url}
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Souscrire à la Newsletter</h5>
              <p>Résumé mensuel de nos activités</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2024 Hepo Dakar</p>
          <ul className="list-unstyled d-flex">
            {siteSettings.twitter && (
              <li className="ms-3">
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
              <li className="ms-3">
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
              <li className="ms-3">
                <Link
                  className="link-body-emphasis"
                  href={siteSettings.facebook}
                  target="_blank"
                >
                  <i className="bi bi-facebook"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
