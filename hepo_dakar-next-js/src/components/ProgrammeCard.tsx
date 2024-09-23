import { SanityDocument } from "next-sanity";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import Image from "next/image";

interface ProgrammeCardProps {
  programme: Programme | SanityDocument;
}

interface Programme {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  niveau?: string;
}

export default async function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const programmeImageUrl = programme.image
    ? urlFor(programme.image).size(500, 500).fit("crop").url()
    : "";
  return (
    <>
      <Link
        href={`/programmes/${programme.slug.current}`}
        className="programme col mb-5"
      >
        <div className="card h-100">
          <Image
            src={programmeImageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={programme.title}
            title={programme.title}
            className="card-img-top"
          />
          <div className="card-body">
            <span className="niveau badge rounded-pill text-bg-light">
              {programme.niveau}
            </span>
            <h5 className="card-title">{programme.title}</h5>
            {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
            <button className="btn btn-light">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
