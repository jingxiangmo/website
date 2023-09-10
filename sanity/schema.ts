import { type SchemaTypeDefinition } from 'sanity'

import project from './schemas/project'
import about from './schemas/about'
import photo from './schemas/photo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about, photo],
}
