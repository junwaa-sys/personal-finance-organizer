/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payables', (table) => {
    table.increments('id')
    table.integer('payee_id')
    table.double('amount')
    table.string('due_date')
    table.boolean('completed')
    table.string('invoice')
    table.string('user_id')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payables')
}
