
import 'dotenv/config'
import {createClient} from '@sanity/client'
import {geoMercator, geoPath} from 'd3-geo'
import sharp from 'sharp'
import type {FeatureCollection} from 'geojson'

const DATA_URL =
  'https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson'

const SIZE = 512
const PADDING = 24
const MAP_COLOR = '#22c55e'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
})

type Country = {
  _id: string
  _rev: string
  name: string
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('Missing SANITY_API_TOKEN')
  }

  console.log('Downloading country boundaries...')

  const response = await fetch(DATA_URL)

  if (!response.ok) {
    throw new Error(`Map download failed: ${response.status}`)
  }

  const geoData = (await response.json()) as FeatureCollection

  const countries = await client.fetch<Country[]>(`
    *[
      _type == "country" &&
      !defined(countryImage.asset._ref)
    ] | order(name asc) {
      _id,
      _rev,
      name
    }
  `)

  const limit = Number(process.env.LIMIT || countries.length)
  const selected = countries.slice(0, limit)

  console.log(`Found ${countries.length} countries missing images`)
  console.log(`Processing ${selected.length} countries`)

  let successful = 0
  const failed: string[] = []

  for (const [index, country] of selected.entries()) {
    try {
      const code = country._id
        .replace('country-', '')
        .toUpperCase()

      const feature = geoData.features.find((item) => {
        const properties = item.properties

        return (
          properties?.['ISO3166-1-Alpha-3'] === code ||
          (code === 'XKX' && properties?.name === 'Kosovo')
        )
      })

      if (!feature) {
        throw new Error(`No geographical data for ${code}`)
      }

      const projection = geoMercator().fitExtent(
        [
          [PADDING, PADDING],
          [SIZE - PADDING, SIZE - PADDING],
        ],
        feature
      )

      const path = geoPath(projection)(feature)

      if (!path) {
        throw new Error('Unable to generate map')
      }

      const svg = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${SIZE}"
          height="${SIZE}"
          viewBox="0 0 ${SIZE} ${SIZE}"
        >
          <path d="${path}" fill="${MAP_COLOR}" />
        </svg>
      `

      const image = await sharp(Buffer.from(svg))
        .png()
        .toBuffer()

      const asset = await client.assets.upload(
        'image',
        image,
        {
          filename: `${code.toLowerCase()}-map.png`,
          contentType: 'image/png',
        }
      )

      await client
        .patch(country._id)
        .ifRevisionId(country._rev)
        .set({
          countryImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit()

      successful++

      console.log(
        `[${index + 1}/${selected.length}] Added ${country.name}`
      )
    } catch (error) {
      failed.push(country.name)
      console.error(`Failed: ${country.name}`, error)
    }
  }

  console.log('\n--- Import complete ---')
  console.log(`Successful: ${successful}`)
  console.log(`Failed: ${failed.length}`)

  if (failed.length) {
    console.log('Missing countries:', failed.join(', '))
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
