/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('budget_items').del()
  await knex('budget_items').insert([
    { id: 1, budget_id: 1, category_id: 1, amount: 500.0 },
    { id: 2, budget_id: 2, category_id: 1, amount: 200.0 },
    { id: 3, budget_id: 2, category_id: 2, amount: 300.0 },
  ])
}
