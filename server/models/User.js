/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable default-param-last */
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

class User {
  #passwordHash = null; // a private property

  // Create a User instance with the password hidden
  // Instances of User can be sent to clients without exposing the password
  constructor({
    id,
    name,
    dob,
    bio = "",
    profile_img = "",
    email,
    username,
    password_hash,
  }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.email = email;
    this.username = username;
    this.#passwordHash = password_hash;
    this.bio = bio;
    this.profile_img = profile_img;
  }

  // Controllers can use this instance method to validate passwords prior to sending responses
  isValidPassword = async (password) =>
    bcrypt.compare(password, this.#passwordHash);

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash.
  static async create(
    name,
    dob,
    bio = "",
    profile_img = "",
    email,
    username,
    password
  ) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `
        INSERT INTO users (name, dob, bio, profile_img, email, username, password_hash)
        VALUES(?, ?, ?, ?, ?, ?, ?)
        RETURNING *
    `;
    const { rows } = await knex.raw(query, [
      name,
      dob,
      bio,
      profile_img,
      email,
      username,
      passwordHash,
    ]);

    return new User(rows[0]);
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(id, username, bio) {
    const query = `
      UPDATE users
      SET username=?, bio=?
      WHERE id=?
      RETURNING *
    `;
    const result = await knex.raw(query, [username, bio, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async deleteAll() {
    return knex("users").del();
  }
}

module.exports = User;
