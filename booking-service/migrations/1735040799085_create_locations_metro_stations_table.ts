import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations_metro_stations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table
        .integer('metro_station_id')
        .unsigned()
        .references('id')
        .inTable('metro_stations')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
