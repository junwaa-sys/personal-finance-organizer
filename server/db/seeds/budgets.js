/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('budgets').del()
  await knex('budgets').insert([
    { id: 1, period_type: 'Monthly', period_ending: '31/03/2023', user_id: 1 },
    { id: 2, period_type: 'Monthly', period_ending: '31/03/2023', user_id: 2 },
    { id: 3, period_type: 'Annual', period_ending: '31/12/2023', user_id: 3 },
  ])
}
