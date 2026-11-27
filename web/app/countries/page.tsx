import Image from "next/image";
import Link from "next/link";
import { client } from "../client";

type Country = {
  _id: string;
  name: string;
  slug: string;
  flagUrl: string | null;
};

export default async function CountriesPage() {
  const countries = await client.fetch<Country[]>(
    `*[_type == "country" && defined(name) && defined(slug.current)] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "flagUrl": flagImage.asset->url
    }`
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">
          Countries of the World
        </h1>

        <p className="mb-8 text-slate-400">
          Explore {countries.length} countries
        </p>

        <ul className="divide-y divide-slate-800">
          {countries.map((country) => (
            <li key={country._id}>
              <Link
                href={`/countries/${country.slug}`}
                className="flex items-center gap-10 py-8 text-lg transition-colors hover:text-emerald-400 cursor-pointer"
              >
                {country.flagUrl && (
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    width={100}
                    height={80}
                    className="rounded-sm object-cover"
                  />
                )}

                <span className="font-medium">
                  {country.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}