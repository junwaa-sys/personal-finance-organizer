/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payees', (table) => {
    table.increments('id').primary
    table.string('name')
    table.string('bank_name')
    table.string('bank_account')
    table.string('description')
    table.string('contact')
    table.string('user_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payees')
}
