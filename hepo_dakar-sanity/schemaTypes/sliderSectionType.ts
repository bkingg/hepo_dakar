import { defineField, defineType } from "sanity"

export default defineType({
    name: 'slider', 
    type: 'object',
    title: 'Bannière',
    fields: [
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
        }),
        defineField({
            title: 'Slides',
            name: 'slides', 
            type: 'array',
            of: [
                defineField({
                    type: "object",
                    name: "slide",
                    fields: [
                        defineField({
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            options: {
                                hotspot: true // <-- Defaults to false
                            }
                        }),
                        defineField({
                            title: 'Titre',
                            name: 'title',
                            type: 'string',
                        }),
                        defineField({
                            title: 'Description',
                            name: 'description',
                            type: 'string',
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
                    ]
                })
            ]
        })
    ]
});