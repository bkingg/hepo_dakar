import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {frFRLocale} from '@sanity/locale-fr-fr'
import { tags } from 'sanity-plugin-tags'


export default defineConfig({
  name: 'default',
  title: 'Hepo Dakar',

  projectId: 't6xq19hy',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), frFRLocale(), tags({})],

  schema: {
    types: schemaTypes,
  },
})
