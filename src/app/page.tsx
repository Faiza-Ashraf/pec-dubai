import { HomePage } from "@/components/sections/home-page";
import { buildOrganizationSchema } from "@/lib/schema";

export default function Home() {
  const schema = buildOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomePage />
    </>
  );
}
