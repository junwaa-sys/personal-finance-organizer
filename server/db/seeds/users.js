/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      name: 'admin',
      user_id: 'admin',
      password: 'admin',
      email: 'juny.jeong@gmail.com',
    },
    {
      id: 2,
      name: 'Joon Young Jeong',
      user_id: 'junwaa',
      password: 'abcd1234',
      email: 'juny.jeong@gmail.com',
    },
    {
      id: 3,
      name: 'Narae Jeong',
      user_id: 'narae',
      password: 'abcd1234',
      email: 'narae@gmail.com',
    },
  ])
}
