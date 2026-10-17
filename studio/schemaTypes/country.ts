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
        name: 'countryImage',
        title: 'Country Image',
        type: 'image',
        description: 'An image representing the shape of the country.',
        options: {
          hotspot: true,
        },
    }),
    defineField({
        name: 'flagImage',
        title: 'Flag Image',
        type: 'image',
        description: 'An image of the country flag.',
        options: {
          hotspot: true,
        },
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

    // ─────────────────────────────────────────────
    // GOVERNMENT & POLITICS
    // ─────────────────────────────────────────────

    defineField({
      name: 'governmentType',
      title: 'Government Type',
      type: 'string',
      description: 'General form of government.',
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

    // ─────────────────────────────────────────────
    // FUN FACTS
    // ─────────────────────────────────────────────

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
