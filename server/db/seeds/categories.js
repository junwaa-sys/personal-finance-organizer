/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, name: 'food', description: 'food' },
    {
      id: 2,
      name: 'rent/maintenace',
      description: 'rent and expense for house maintenance',
      user_id: '',
    },
    { id: 3, name: 'entertainment', description: 'entertainment', user_id: '' },
    { id: 4, name: 'tax', description: 'tax', user_id: '' },
    { id: 5, name: 'education', description: 'education', user_id: '' },
  ])
}
