import {defineField, defineType} from 'sanity'

export const country = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',

  icon: () => '🌎',

  fields: [
    // ─────────────────────────────────────────────
    // BASIC INFORMATION
    // ─────────────────────────────────────────────

    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      description: 'The common English name of the country.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'country image',
        title: 'Country Image',
        type: 'image',
        description: 'An image representing the shape of the country.',
        options: {
          hotspot: true,
        },
    }),
    defineField({
        name: 'flag image',
        title: 'Flag Image',
        type: 'image',
        description: 'An image of the country flag.',
        options: {
          hotspot: true,
        },
    }),
    defineField({
      name: 'officialName',
      title: 'Official Name',
      type: 'string',
      description: 'The country’s official constitutional or formal name.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the country URL, e.g. /countries/united-states.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'nativeName',
      title: 'Native Name',
      type: 'string',
      description: 'The country name in its primary/native language.',
    }),

    defineField({
      name: 'nativeNames',
      title: 'Native Names',
      type: 'array',
      description: 'Country names in additional official or commonly used languages.',
      of: [
        {
          type: 'object',
          name: 'nativeName',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'language',
            },
          },
        },
      ],
    }),

    defineField({
      name: 'countryCode',
      title: 'ISO Alpha-2 Code',
      type: 'string',
      description: 'Two-letter ISO 3166-1 alpha-2 code, e.g. US.',
      validation: (Rule) =>
        Rule.regex(/^[A-Z]{2}$/, {
          name: 'ISO Alpha-2',
        }),
    }),

    defineField({
      name: 'countryCode3',
      title: 'ISO Alpha-3 Code',
      type: 'string',
      description: 'Three-letter ISO 3166-1 alpha-3 code, e.g. USA.',
      validation: (Rule) =>
        Rule.regex(/^[A-Z]{3}$/, {
          name: 'ISO Alpha-3',
        }),
    }),

    defineField({
      name: 'numericCode',
      title: 'ISO Numeric Code',
      type: 'number',
      description: 'Three-digit ISO 3166-1 numeric code.',
      validation: (Rule) => Rule.integer().min(0).max(999),
    }),

    // ─────────────────────────────────────────────
    // GEOGRAPHY
    // ─────────────────────────────────────────────

    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          {title: 'Africa', value: 'africa'},
          {title: 'Asia', value: 'asia'},
          {title: 'Europe', value: 'europe'},
          {title: 'North America', value: 'north-america'},
          {title: 'South America', value: 'south-america'},
          {title: 'Oceania', value: 'oceania'},
          {title: 'Antarctica', value: 'antarctica'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Broad geographic region, such as Western Europe or Southeast Asia.',
    }),

    defineField({
      name: 'subregion',
      title: 'Subregion',
      type: 'string',
      description: 'More specific geographic grouping, if applicable.',
    }),

    defineField({
      name: 'capital',
      title: 'Capital',
      type: 'string',
      description: 'The country’s primary capital city.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'capitalCoordinates',
      title: 'Capital Coordinates',
      type: 'geopoint',
      description: 'Latitude and longitude of the capital.',
    }),

    defineField({
      name: 'coordinates',
      title: 'Country Coordinates',
      type: 'geopoint',
      description: 'Approximate geographic center of the country.',
    }),

    defineField({
      name: 'area',
      title: 'Area',
      type: 'number',
      description: 'Total area in square kilometers.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'landArea',
      title: 'Land Area',
      type: 'number',
      description: 'Land area in square kilometers, excluding inland water.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'waterArea',
      title: 'Water Area',
      type: 'number',
      description: 'Inland water area in square kilometers.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'highestPoint',
      title: 'Highest Point',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'elevation',
          title: 'Elevation (meters)',
          type: 'number',
          validation: (Rule) => Rule.min(-500),
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // POPULATION
    // ─────────────────────────────────────────────

    defineField({
      name: 'population',
      title: 'Population',
      type: 'number',
      description: 'Most recent population figure used by World Wise.',
      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: 'populationYear',
      title: 'Population Year',
      type: 'number',
      description: 'Year associated with the population figure.',
      validation: (Rule) =>
        Rule.integer().min(1800).max(new Date().getFullYear() + 1),
    }),

    defineField({
      name: 'populationDensity',
      title: 'Population Density',
      type: 'number',
      description: 'People per square kilometer.',
      validation: (Rule) => Rule.min(0),
    }),

    // ─────────────────────────────────────────────
    // GOVERNMENT & POLITICS
    // ─────────────────────────────────────────────

    defineField({
      name: 'governmentType',
      title: 'Government Type',
      type: 'string',
      description: 'General form of government.',
    }),

    defineField({
      name: 'headOfState',
      title: 'Head of State',
      type: 'string',
    }),

    defineField({
      name: 'headOfGovernment',
      title: 'Head of Government',
      type: 'string',
    }),

    defineField({
      name: 'independenceDate',
      title: 'Independence / Founding Date',
      type: 'date',
    }),

    // ─────────────────────────────────────────────
    // LANGUAGES
    // ─────────────────────────────────────────────

    defineField({
      name: 'officialLanguages',
      title: 'Official Languages',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'languages',
      title: 'Major Languages',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),

    // ─────────────────────────────────────────────
    // CURRENCY
    // ─────────────────────────────────────────────

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Currency Name',
          type: 'string',
        }),
        defineField({
          name: 'code',
          title: 'Currency Code',
          type: 'string',
          description: 'ISO 4217 code, e.g. USD.',
          validation: (Rule) =>
            Rule.regex(/^[A-Z]{3}$/, {
              name: 'ISO 4217',
            }),
        }),
        defineField({
          name: 'symbol',
          title: 'Symbol',
          type: 'string',
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // TIME & CALENDAR
    // ─────────────────────────────────────────────

    defineField({
      name: 'timeZones',
      title: 'Time Zones',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'drivesOn',
      title: 'Driving Side',
      type: 'string',
      options: {
        list: [
          {title: 'Right', value: 'right'},
          {title: 'Left', value: 'left'},
        ],
        layout: 'radio',
      },
    }),

    // ─────────────────────────────────────────────
    // BORDERS & NEIGHBORS
    // ─────────────────────────────────────────────

    defineField({
      name: 'landlocked',
      title: 'Landlocked',
      type: 'boolean',
    }),

    defineField({
      name: 'coastline',
      title: 'Has Coastline',
      type: 'boolean',
    }),

    defineField({
      name: 'borderingCountries',
      title: 'Bordering Countries',
      type: 'array',
      description: 'Countries sharing a land border.',
      of: [
        {
          type: 'reference',
          to: [{type: 'country'}],
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // ECONOMY
    // ─────────────────────────────────────────────

    defineField({
      name: 'gdp',
      title: 'GDP',
      type: 'number',
      description: 'GDP in USD.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'gdpPerCapita',
      title: 'GDP Per Capita',
      type: 'number',
      description: 'GDP per capita in USD.',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'gdpYear',
      title: 'GDP Year',
      type: 'number',
      validation: (Rule) =>
        Rule.integer().min(1800).max(new Date().getFullYear() + 1),
    }),

    // ─────────────────────────────────────────────
    // CULTURE
    // ─────────────────────────────────────────────

    defineField({
      name: 'demonym',
      title: 'Demonym',
      type: 'string',
      description: 'What people from this country are called.',
    }),

    defineField({
      name: 'religions',
      title: 'Major Religions',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'nationalDay',
      title: 'National Day',
      type: 'object',
      fields: [
        defineField({
          name: 'date',
          title: 'Date',
          type: 'string',
          description: 'Month and day, e.g. July 4.',
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // NATIONAL SYMBOLS
    // ─────────────────────────────────────────────

    defineField({
      name: 'flag',
      title: 'Flag',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'coatOfArms',
      title: 'Coat of Arms',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'anthem',
      title: 'National Anthem',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'composer',
          title: 'Composer',
          type: 'string',
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // MEDIA
    // ─────────────────────────────────────────────

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Primary image used on the country page.',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // CONTENT
    // ─────────────────────────────────────────────

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Short overview used in cards, search results, and previews.',
      rows: 4,
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Long-form editorial description of the country.',
      of: [
        {
          type: 'block',
        },
      ],
    }),

    defineField({
      name: 'funFacts',
      title: 'Fun Facts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'funFact',
          fields: [
            defineField({
              name: 'fact',
              title: 'Fact',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'fact',
            },
          },
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // TOURISM
    // ─────────────────────────────────────────────

    defineField({
      name: 'popularFor',
      title: 'Popular For',
      type: 'array',
      description: 'Things the country is particularly known for.',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),

    // ─────────────────────────────────────────────
    // DATA / EXTERNAL IDENTIFIERS
    // ─────────────────────────────────────────────

    defineField({
      name: 'wikidataId',
      title: 'Wikidata ID',
      type: 'string',
      description: 'Wikidata identifier, e.g. Q30 for the United States.',
    }),

    defineField({
      name: 'officialWebsite',
      title: 'Official Government Website',
      type: 'url',
    }),

    // ─────────────────────────────────────────────
    // EDITORIAL / DATA MANAGEMENT
    // ─────────────────────────────────────────────

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Whether to feature this country prominently in World Wise.',
      initialValue: false,
    }),

    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Whether this country should appear in the public application.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'capital',
      media: 'flag',
    },
  },

  orderings: [
    {
      title: 'Country Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Population',
      name: 'populationDesc',
      by: [{field: 'population', direction: 'desc'}],
    },
  ],
})
