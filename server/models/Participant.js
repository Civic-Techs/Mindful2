/* eslint-disable no-useless-catch */
const knex = require('../db/knex');

class Participant {
  constructor(user_id, challenge_id) {
    this.id = `${user_id}-${challenge_id}`;
    this.user_id = user_id;
    this.challenge_id = challenge_id;
  }

  static async create({ user_id, challenge_id }) {
    try {
      const query = `
                INSERT INTO participants (user_id, challenge_id)
                VALUES (?, ?)
                RETURNING *;
            `;

      const { rows } = await knex.raw(query, [user_id, challenge_id]);
      return new Participant(rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async list() {
    const query = `SELECT * FROM participants`;
    const { rows } = await knex.raw(query);
    return rows.map((participant) => new Participant(participant));
  }

  static async find(user_id, challenge_id) {
    if (!user_id || !challenge_id) {
      console.error('Both user_id and challenge_id are required.');
      return null;
    }

    const query = `SELECT * FROM participants WHERE user_id = ? and challenge_id = ?`;
    const { rows } = await knex.raw(query, [user_id, challenge_id]);
    const participant = rows[0];
    return participant ? new Participant(participant) : null;
  }

  static async findByUser(user_id) {
    const query = `SELECT * FROM participants WHERE user_id = ?`;
    const { rows } = await knex.raw(query, [user_id]);
    return rows.map((participant) => new Participant(participant));
  }

  static async findByChallenge(challenge_id) {
    const query = `SELECT * FROM participants WHERE challenge_id = ?`;
    const { rows } = await knex.raw(query, [challenge_id]);
    return rows.map((participant) => new Participant(participant));
  }

  static async delete(user_id, challenge_id) {
    if (!user_id || !challenge_id) {
      console.error('Both user_id and challenge_id are required.');
    }

    const query = `
            DELETE FROM participants
            WHERE user_id = ? and challenge_id = ?
            RETURNING *;
        `;

    const { rows } = await knex.raw(query, [user_id, challenge_id]);
    return rows[0] ? new Participant(rows[0]) : null;
  }

  static async deleteAll() {
    return knex('participants').del();
  }

  // Method to fetch challenge titles by user ID
  static async getChallengeTitlesByUserId(user_id) {
    const query = `
      SELECT c.title
      FROM participants p
      JOIN challenges c ON p.challenge_id = c.id
      WHERE p.user_id = ?;
    `;
    const { rows } = await knex.raw(query, [user_id]);
    return rows; // Returns an array of challenge titles
  }
}

module.exports = Participant;
