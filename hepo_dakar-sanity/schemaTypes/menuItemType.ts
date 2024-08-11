import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Menu Item',
    name: 'menuItem',
    type: 'object',
    fields: [
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
        }),
        defineField({
            title: 'URL',
            name: 'url',
            type: 'url',
            initialValue: "#",
            validation: (rule) => rule
                .required()
                .uri({
                    allowRelative: true
                }),
        }),
        defineField({
            title: 'Sous-Menus',
            name: 'submenuItems',
            type: 'array',
            of: [{ type: 'menuItem' }],
            options: {
                sortable: true, // Enable sorting
            },
        }),
    ],
});