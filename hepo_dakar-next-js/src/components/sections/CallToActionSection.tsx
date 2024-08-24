import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

interface CallToActionSectionProps {
  section: any;
}

export default function CallToActionSection({
  section,
}: CallToActionSectionProps) {
  console.log("section", section);
  return (
    <section
      style={{
        backgroundColor: "rgba(44, 35, 107, 1)",
        backgroundImage: urlFor(section.image).width(700).url()
          ? `linear-gradient(to top, rgba(44, 35, 107, 0.7), rgba(44, 35, 107, 1) 95%), url(${urlFor(section.image).width(700).url()})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="section text-center bg-primary text-light section__cta"
    >
      <div className="container">
        {section.title && <h1>{section.title}</h1>}
        {section.description && <p>{section.description}</p>}
        {section.ctaText &&
          ((section.ctaUrl && (
            <Link className="btn btn-secondary" href={section.ctaUrl}>
              {section.ctaText}
            </Link>
          )) ||
            (section.brochure && (
              <a
                className="btn btn-secondary"
                href={section.brochureUrl + "?dl"}
                download
              >
                {section.ctaText}
              </a>
            )))}
      </div>
    </section>
  );
}
