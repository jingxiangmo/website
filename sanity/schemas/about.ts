import {defineField, defineType} from 'sanity'

export default {
    name: 'about',
    type: 'document',
    title: 'About',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Writing'
      }
    ]
  }