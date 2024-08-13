import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

interface SliderSectionProps {
  slides: Slide[];
}

interface Slide {
  _key: string;
  image: object;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

export default function SliderSection({ slides }: SliderSectionProps) {
  return (
    <section className="section__slider">
      <Carousel interval={1000}>
        {slides.map((slide: Slide) => {
          return (
            <CarouselItem>
              <Image
                src={urlFor(slide.image).url()}
                width={1000}
                height={400}
                alt={slide.title}
                className="d-block w-100 img-fluid"
              />
              {(slide.title || slide.description) && (
                <CarouselCaption>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  {slide.ctaText && slide.ctaUrl && (
                    <Link className="btn btn-primary" href={slide.ctaUrl}>
                      {slide.ctaText}
                    </Link>
                  )}
                </CarouselCaption>
              )}
            </CarouselItem>
          );
        })}
      </Carousel>
    </section>
  );
}
