import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import MenuItem from "./MenuItem";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  NavbarBrand,
  NavLink,
  NavbarCollapse,
  NavbarToggle,
  DropdownItem,
  DropdownDivider,
} from "react-bootstrap";

interface MenuItem {
  _key: string;
  title: string;
  url: string;
  submenuItems: MenuItem[];
}

export default async function Navigation() {
  const SITE_SETTINGS_QUERY = groq`*[
    _type == "siteSettings"
  ][0]{
    logo,
    mainMenu->{
      _key, 
      title, 
      handle,
      items
    },
  }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });

  const menu = siteSettings.mainMenu;

  console.log(siteSettings);

  const menuShow = (items: MenuItem[]) => {
    return items.map((item: MenuItem) => {
      if (item.submenuItems) {
        return (
          <NavDropdown
            title={item.title}
            key={item._key}
            renderMenuOnMount={true}
          >
            {menuShow(item.submenuItems)}
          </NavDropdown>
        );
      } else {
        return (
          <NavLink href={item.url} key={item._key}>
            {item.title}
          </NavLink>
        );
      }
    });
  };
  return (
    <Navbar expand="sm" sticky="top" className="header" variant="dark">
      <Container>
        <NavbarBrand href="/">
          <Image
            src={urlFor(siteSettings.logo).width(300).crop("center").url()}
            width={200}
            height={0}
            alt="Hepo Dakar"
            title="Hepo Dakar"
            className="img-fluid"
          />
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">{menuShow(menu.items)}</Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavbarBrand href="#home">React-Bootstrap</NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#link">Link</NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <DropdownItem href="#action/3.1">Action</DropdownItem>
                <DropdownItem href="#action/3.2">Another action</DropdownItem>
                <DropdownItem href="#action/3.3">Something</DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#action/3.4">Separated link</DropdownItem>
              </NavDropdown>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <nav className="header navbar navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              src={urlFor(siteSettings.logo)
                .size(300, 300)
                .crop("center")
                .url()}
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
    </>
  );
}
