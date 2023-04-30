/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payables').del()
  await knex('payables').insert([
    {
      id: 1,
      payee_id: 1,
      amount: 100.0,
      due_date: '30/03/2023',
      completed: false,
      invoice: '/data/invoice/1.pdf',
      user_id: '',
    },
    {
      id: 2,
      payee_id: 2,
      amount: 140.0,
      due_date: '23/03/2023',
      completed: false,
      invoice: '/data/invoice/2.pdf',
      user_id: '',
    },
  ])
}
