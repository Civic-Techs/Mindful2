/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.date('dob').notNullable();
      table.string('bio').notNullable();
      table.string('profile_img');
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('password_hash').notNullable();
    })
    .createTable('challenges', function (table) {
      // Move 'challenges' before 'posts'
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('img');
      table.boolean('is_contest');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('end_time').nullable();
      table.integer('user_id').unsigned().notNullable();
      // Foreign Keys
      table.foreign('user_id').references('id').inTable('users');
    })
    .createTable('posts', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('img');
      table.integer('votes').notNullable();
      table.boolean('is_winner');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.integer('challenge_id').unsigned().notNullable();
      // Foreign Keys
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .foreign('challenge_id')
        .references('id')
        .inTable('challenges')
        .onDelete('cascade');
    })
    .createTable('comments', function (table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.integer('post_id').unsigned().notNullable();
      table.integer('parent_comment_id').unsigned().nullable();
      // Foreign Keys
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .foreign('post_id')
        .references('id')
        .inTable('posts')
        .onDelete('cascade');
      table
        .foreign('parent_comment_id')
        .references('id')
        .inTable('comments')
        .onDelete('cascade');
    })
    .createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
    })
    .createTable('category_challenges', function (table) {
      table.integer('category_id').unsigned().notNullable();
      table.integer('challenge_id').unsigned().notNullable();
      // Foreign Keys
      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('cascade');
      table
        .foreign('challenge_id')
        .references('id')
        .inTable('challenges')
        .onDelete('cascade');
      // Composite Primary Key
      table.primary(['category_id', 'challenge_id']);
    })
    .createTable('participants', function (table) {
      table.integer('user_id').unsigned().notNullable();
      table.integer('challenge_id').unsigned().notNullable();
      // Foreign Keys
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .foreign('challenge_id')
        .references('id')
        .inTable('challenges')
        .onDelete('cascade');
      // Composite Primary Key
      table.primary(['user_id', 'challenge_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('participants')
    .dropTable('category_challenges')
    .dropTable('comments')
    .dropTable('posts')
    .dropTable('challenges')
    .dropTable('categories')
    .dropTable('users');
};
