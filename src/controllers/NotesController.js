const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body
    const { user_id } = request.params

    const [note_id] = await knex('notes').insert({
      title,
      user_id,
      description
    })

    const insertLinks = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex('links').insert(insertLinks)

    const insertTags = tags.map(name => {
      return {
        note_id,
        user_id,
        name
      }
    })

    await knex('tags').insert(insertTags)
    

    response.json()
  }
}

module.exports = NotesController