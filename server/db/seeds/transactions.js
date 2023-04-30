/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert([
    {
      id: 1,
      transaction_date: '01/03/2023',
      payee: 'IRD',
      amount: 100.0,
      code: 'ird number',
      particular: 'test particular',
      reference: 'reference',
      user_id: 'google-oauth2|105121944184778286463',
      category_id: 4,
      note: 'this is a test note',
    },
    {
      id: 2,
      transaction_date: '01/03/2023',
      payee: 'Dev Academy',
      amount: 100.0,
      code: 'course fee',
      particular: 'tohora-2023',
      reference: 'joon',
      user_id: 'google-oauth2|105121944184778286463',
      category_id: 5,
    },
    {
      id: 3,
      transaction_date: '03/03/2023',
      payee: 'Candy Shop',
      amount: 100.0,
      code: '',
      particular: '',
      reference: 'auckland',
      user_id: '1',
      category_id: 1,
    },
  ])
}
