import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Pages',
  name: 'page',
  type: 'document',
  fields: [
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
        title: 'Description',
        name: 'description',
        type: 'array',
        of: [
          {type: 'block'},
          {type: 'image'}
        ]
    }),
    defineField({
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'slider' },
        { type: 'logo_list' },
      ],
      options: {
        sortable: true,
      },
    }),
  ],
});