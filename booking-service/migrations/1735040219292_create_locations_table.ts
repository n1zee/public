import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('short_name')
      table.string('address').notNullable()
      table.string('path_description')
      table.string('path_image')
      table.string('path_video')
      table.string('coordinates', 100).comment('lat,lng')
      table.string('phone')
      table.string('email')
      table.string('website')
      table.string('social_links').comment('facebook,instagram,twitter,youtube,...etc')
      table
        .string('opening_hours')
        .comment('monday,tuesday,wednesday,thursday,friday,saturday,sunday')
      table.string('description')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('city_id').unsigned().references('id').inTable('cities').onDelete('CASCADE')
      table
        .integer('district_id')
        .unsigned()
        .references('id')
        .inTable('districts')
        .onDelete('SET NULL')
        .nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('locations_metro_stations')
    this.schema.dropTable(this.tableName)
  }
}
