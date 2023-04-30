/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payees').del()
  await knex('payees').insert([
    {
      id: 1,
      name: 'Auckland Council',
      bank_name: 'BNZ',
      bank_account: '02-0000-0000000-000',
      description: 'test description',
      contact: 'ak@auckland.org.nz',
      user_id: 'google-oauth2|105121944184778286463',
    },
    {
      id: 2,
      name: 'Dev Academy',
      bank_name: 'BNZ',
      bank_account: '02-1111-1211111-111',
      description: 'dev academy coursefee account',
      contact: 'bill@devacademy.ac.nz',
      user_id: 'google-oauth2|105121944184778286463',
    },
    {
      id: 3,
      name: 'family doctor',
      bank_name: 'ASB',
      bank_account: '12-1111-1211111-111',
      description: '',
      contact: 'doctor@hospital.co.nz',
      user_id: '2',
    },
  ])
}
