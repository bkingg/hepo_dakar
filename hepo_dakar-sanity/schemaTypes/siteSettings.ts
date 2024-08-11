import { defineField, defineType } from "sanity";

// schemas/siteSettings.js
export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Paramètres',
  groups: [
    {
      name: 'header',
      title: 'En Tête',
    },
    {
        name: 'footer',
        title: 'Pied de Page',
    },
    {
        name: 'social',
        title: 'Social',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      group: 'header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainMenu',
      type: 'reference', to: [{type: 'menu'}],
      title: 'Menu Principal',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Facebook URL',
      name: 'facebook',
      type: 'url',
      group: 'social'
    }),
    defineField({
      title: 'Twitter URL',
      name: 'twitter',
      type: 'url',
      group: 'social'
    }),
    defineField({
      title: 'Instagram URL',
      name: 'instagram',
      type: 'url',
      group: 'social'
    }),
    defineField({
      title: 'LinkedIn URL',
      name: 'linkedin',
      type: 'url',
      group: 'social'
    }),
    defineField({
      title: 'Pied de page',
      name: 'footerMenus',
      group: 'footer',
      type: 'array',
      validation: (rule) => rule.max(5),
      of: [
        defineField({
          title: 'Menu de Pied de Page',
          name: 'footerMenu',
          type: 'object', 
          fields: [
            defineField({
              title: 'Titre',
              name: 'title',
              type: 'string'
            }),
            defineField({
              title: 'Menu',
              name: 'menu',
              type: 'reference', to: [{type: 'menu'}],
              validation: (rule) => rule.required(),
            })
          ]
        })
      ],
      options: {
        sortable: true, // Enable sorting
      }
    }),
  ],
  initialValue: {
    title: 'Paramètres du Site',
  }
});
  