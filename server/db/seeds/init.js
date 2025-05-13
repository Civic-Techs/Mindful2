const { faker } = require('@faker-js/faker');
const knex = require('../knex');
console.log('Seeding into DB:', knex.client.config.connection.database);

exports.seed = async function () {
  const users = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    dob: faker.date.birthdate(),
    bio: faker.person.bio(),
    profile_img: faker.image.urlLoremFlickr(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    password_hash: faker.internet.password(),
  }));

  await knex('users').insert(users);

  const user_ids = await knex('users').select('id');

  if (user_ids.length === 0) {
    throw new Error('No users found! Seed users first.');
  }

  await knex('categories').insert([
    { title: 'Art' },
    { title: 'Crafts' },
    { title: 'Active' },
    { title: 'Outdoors' },
    { title: 'Technical' },
    { title: 'Self-Expression' },
  ]);

  await knex('challenges').insert([
    {
      title: 'Cozy Creations',
      description: 'Crochet a wearable accessory (hat, scarf, or gloves).',
      img: null,
      is_contest: false,
      created_at: faker.date.recent(),
      end_time: null,
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Knit-a-Thon',
      description: 'Knit a 12-inch square using a cable pattern!',
      img: null,
      is_contest: true,
      created_at: faker.date.recent(),
      end_time: faker.date.soon(),
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Marathon Milestones',
      description: 'Run a total of 10km over 3 days.',
      img: null,
      is_contest: false,
      created_at: faker.date.recent(),
      end_time: null,
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Dance Fusion',
      description: 'Create a 1-minute dance that mixes hip-hop and salsa',
      img: null,
      is_contest: true,
      created_at: faker.date.recent(),
      end_time: faker.date.soon(),
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Scenic Cycling',
      description:
        'Cycle at least 20km and take a photo of your most scenic stop. Share your route!',
      img: null,
      is_contest: false,
      created_at: faker.date.recent(),
      end_time: null,
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Natural Wonders',
      description:
        'Capture a photo of a natural landscape taken during golden hour.',
      img: null,
      is_contest: true,
      created_at: faker.date.recent(),
      end_time: faker.date.soon(),
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Flash Fiction Frenzy',
      description:
        "Write a story under 500 words using the phrase 'beneath the old bridge'.",
      img: null,
      is_contest: true,
      created_at: faker.date.recent(),
      end_time: faker.date.soon(),
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Delicious Desserts',
      description: 'Bake any dessert with chocolate and share your recipe.',
      img: null,
      is_contest: false,
      created_at: faker.date.recent(),
      end_time: null,
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Blooming Beauties',
      description:
        'Plant a new flower or vegetable and track growth over 2 weeks.',
      img: null,
      is_contest: false,
      created_at: faker.date.recent(),
      end_time: null,
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
    {
      title: 'Algorithm Adventure',
      description:
        "Solve the classic 'Two Sum' problem and post your solution in JavaScript.",
      img: null,
      is_contest: true,
      created_at: faker.date.recent(),
      end_time: faker.date.soon(),
      user_id: user_ids[Math.floor(Math.random() * user_ids.length)].id,
    },
  ]);

  const categoryChallengePairs = [
    { category_title: 'Art', challenge_title: 'Natural Wonders' },
    { category_title: 'Crafts', challenge_title: 'Cozy Creations' },
    { category_title: 'Crafts', challenge_title: 'Knit-a-Thon' },
    { category_title: 'Active', challenge_title: 'Marathon Milestones' },
    { category_title: 'Active', challenge_title: 'Dance Fusion' },
    { category_title: 'Outdoors', challenge_title: 'Scenic Cycling' },
    {
      category_title: 'Self-Expression',
      challenge_title: 'Flash Fiction Frenzy',
    },
    {
      category_title: 'Self-Expression',
      challenge_title: 'Delicious Desserts',
    },
    { category_title: 'Outdoors', challenge_title: 'Blooming Beauties' },
    { category_title: 'Technical', challenge_title: 'Algorithm Adventure' },
  ];

  const categoryMap = await knex('categories').select('id', 'title');
  const challengeMap = await knex('challenges').select('id', 'title');

  const categoriesByTitle = Object.fromEntries(
    categoryMap.map((c) => [c.title, c.id])
  );
  const challengesByTitle = Object.fromEntries(
    challengeMap.map((c) => [c.title, c.id])
  );

  const categoryChallenges = categoryChallengePairs.map((pair) => ({
    category_id: categoriesByTitle[pair.category_title],
    challenge_id: challengesByTitle[pair.challenge_title],
  }));

  await knex('category_challenges').insert(categoryChallenges);
};
