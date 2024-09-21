import { defineField, defineType } from "sanity"

export default defineType({
    name: 'programmes', 
    type: 'object',
    title: 'Programmes',
    fields: [
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'programmes',
            title: 'Programmes Phares',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  { type: 'programme' },
                ],
              },
            ],
            validation: (Rule) => Rule.max(8).warning('Vous ne pouvez ajouter que 8 programmes phares.'),
        }),
        defineField({
            title: 'CTA Texte',
            name: 'ctaText',
            type: 'string',
        }),
        defineField({
            title: 'CTA URL',
            name: 'ctaUrl',
            type: 'url',
            initialValue: "#",
            validation: (rule) => rule
                .required()
                .uri({
                    allowRelative: true
                }),
        }),
    ],
    initialValue: {
        title: 'Programmes Phares',
        description: "Découvrez nos programmes les plus populaires"
    }
});