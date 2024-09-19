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
        title: 'Programmes',
        description: "Découvrez nos programmes"
    }
});