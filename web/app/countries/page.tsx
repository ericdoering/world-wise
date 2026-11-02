
// import { createClient } from "next-sanity";

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2025-01-01",
//   useCdn: false,
// });

// type Country = {
//   _id: string;
//   name: string;
// };

export default async function CountriesPage() {
  // const countries = await client.fetch<Country[]>(
  //   `*[_type == "country" && defined(name)] | order(name asc) {
  //     _id,
  //     name
  //   }`
  // );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-bold">
          Countries of the World
        </h1>

        {/* <p className="mb-8 text-slate-400">
          Explore {countries.length} countries
        </p>

        <ul className="divide-y divide-slate-800">
          {countries.map((country) => (
            <li
              key={country._id}
              className="py-3 text-lg transition-colors hover:text-emerald-400"
            >
              {country.name}
            </li>
          ))}
        </ul> */}
      </div>
    </main>
  );
}
