/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id')
    table.string('transaction_date')
    table.string('payee')
    table.double('amount')
    table.string('code')
    table.string('particular')
    table.string('reference')
    table.string('user_id')
    table.integer('category_id')
    table.text('note')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions')
}
