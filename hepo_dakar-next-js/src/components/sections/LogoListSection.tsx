import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

interface LogoListSectionProps {
  section: any;
}

interface Logo {
  _key: string;
  image: object;
  url: string;
  title: string;
}

export default function LogoListSection({ section }: LogoListSectionProps) {
  return (
    <section className="section section__logo-list">
      <div className="container">
        {section.title !== undefined && <h1>{section.title}</h1>}
        {section.description !== undefined && <p>{section.description}</p>}
        <div className="section__logo-list__logos row justify-content-evenly">
          {section.logos.map((logo: Logo) => {
            return (
              <div className="col-sm-6 col-md-2">
                {logo.url !== "#" ? (
                  <Link key={logo._key} href={logo.url} target="_blank">
                    <Image
                      src={urlFor(logo.image)
                        .size(200, 200)
                        .crop("center")
                        .url()}
                      width={150}
                      height={150}
                      alt={logo.title}
                      title={logo.title}
                      className="img-fluid"
                    />
                  </Link>
                ) : (
                  <Image
                    src={urlFor(logo.image).size(200, 200).crop("center").url()}
                    width={150}
                    height={150}
                    alt={logo.title}
                    title={logo.title}
                    className="img-fluid"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}