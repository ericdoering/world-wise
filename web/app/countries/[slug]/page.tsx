import Image from "next/image";
import Link from "next/link";
import { client } from "../../client";
import { notFound } from "next/navigation";

type Country = {
  _id: string;
  name: string;
  flagUrl: string | null;
};

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const country = await client.fetch<Country | null>(
    `*[_type == "country" && slug.current == $slug][0] {
      _id,
      name,
      "flagUrl": flagImage.asset->url
    }`,
    { slug }
  );

  if (!country) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/countries"
          className="mb-8 inline-block text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Countries
        </Link>

        <div className="flex items-center gap-6">
          {country.flagUrl && (
            <Image
              src={country.flagUrl}
              alt={`${country.name} flag`}
              width={150}
              height={100}
              className="rounded-sm object-cover"
            />
          )}

          <h1 className="text-5xl font-bold">
            {country.name}
          </h1>
        </div>
      </div>
    </main>
  );
}