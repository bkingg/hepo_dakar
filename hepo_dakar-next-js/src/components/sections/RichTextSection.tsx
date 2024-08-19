import { PortableText } from "@portabletext/react";

interface RichTextSectionProps {
  section: any;
}

export default async function RichTextSection({
  section,
}: RichTextSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <PortableText value={section.richText} />
      </div>
    </section>
  );
}
