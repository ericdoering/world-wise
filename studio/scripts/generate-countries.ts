
import {writeFileSync} from 'node:fs'

const DATA_URL =
  'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'

type SourceCountry = {
  name: {common: string}
  cca2?: string
  cca3?: string
  unMember?: boolean
  region?: string
  subregion?: string
  capital?: string[]
  currencies?: Record<string, {name: string; symbol?: string}>
  languages?: Record<string, string>
}

// Kosovo is included explicitly because not every
// ISO-based country dataset includes it.
const kosovo: SourceCountry = {
  name: {common: 'Kosovo'},
  cca2: 'XK',
  cca3: 'XKX',
  unMember: false,
  region: 'Europe',
  subregion: 'Southern Europe',
  capital: ['Pristina'],
  currencies: {
    EUR: {name: 'Euro', symbol: '€'},
  },
  languages: {
    sqi: 'Albanian',
    srp: 'Serbian',
  },
}

function continentFor(country: SourceCountry): string {
  if (country.region === 'Americas') {
    const southAmericanRegions = [
      'South America',
    ]

    return southAmericanRegions.includes(country.subregion ?? '')
      ? 'south-america'
      : 'north-america'
  }

  const mapping: Record<string, string> = {
    Africa: 'africa',
    Asia: 'asia',
    Europe: 'europe',
    Oceania: 'oceania',
    Antarctic: 'antarctica',
    Antarctica: 'antarctica',
  }

  const continent = mapping[country.region ?? '']

  if (!continent) {
    throw new Error(
      `Unknown continent for ${country.name.common}`
    )
  }

  return continent
}

function makeSlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  const response = await fetch(DATA_URL)

  if (!response.ok) {
    throw new Error(`Country fetch failed: ${response.status}`)
  }

  const source = (await response.json()) as SourceCountry[]

  const selected = source.filter(
    (country) =>
      country.unMember === true ||
      ['VAT', 'PSE', 'TWN', 'XKX'].includes(country.cca3 ?? '')
  )

  if (!selected.some((country) => country.cca3 === 'XKX')) {
    selected.push(kosovo)
  }

  if (selected.length !== 197) {
    throw new Error(
      `Expected 197 countries, found ${selected.length}. Review source membership.`
    )
  }

  const documents = selected.map((country) => {
    const name = country.name.common
    const slug = makeSlug(name)
    const currencyEntry = Object.entries(
      country.currencies ?? {}
    )[0]

    const currency = currencyEntry
      ? {
          _type: 'object',
          name: currencyEntry[1].name,
          code: currencyEntry[0],
          symbol: currencyEntry[1].symbol ?? '',
        }
      : undefined

    const capital =
      country.capital?.[0] ??
      (country.cca3 === 'NRU' ? 'Yaren' : undefined)

    if (!capital) {
      throw new Error(`Missing capital: ${name}`)
    }

    const flagImage = country.cca2
      ? {
          _type: 'image',
          _sanityAsset:
            `image@https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
        }
      : undefined

    return {
      _id: `country-${country.cca3?.toLowerCase()}`,
      _type: 'country',
      name,
      slug: {
        _type: 'slug',
        current: slug,
      },
      continent: continentFor(country),
      region: country.subregion ?? '',
      capital,
      officialLanguages: Object.values(country.languages ?? {}),
      ...(currency ? {currency} : {}),
      ...(flagImage ? {flagImage} : {}),
    }
  })

  const slugs = documents.map((doc) => doc.slug.current)

  if (new Set(slugs).size !== documents.length) {
    throw new Error('Duplicate slugs found')
  }

  writeFileSync(
    'countries.ndjson',
    documents.map((doc) => JSON.stringify(doc)).join('\n') + '\n'
  )

  console.log(`Generated ${documents.length} country documents`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
