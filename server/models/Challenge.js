const knex = require("../db/knex");

class Challenge {
  constructor({
    id,
    title,
    description,
    img,
    is_contest,
    created_at,
    end_time,
    user_id,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.img = img;
    this.is_contest = is_contest;
    this.created_at = created_at;
    this.end_time = end_time;
    this.user_id = user_id;
  }

  static async create({
    title,
    description = "",
    img = "",
    is_contest = false,
    end_time = "",
    user_id,
  }) {
    const query = `
            INSERT INTO challenges (title, description, img, is_contest, end_time, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
            RETURNING *
        `;

    const { rows } = await knex.raw(query, [
      title,
      description,
      img,
      is_contest,
      end_time,
      user_id,
    ]);

    return new Challenge(rows[0]);
  }

  static async list() {
    const query = `SELECT * FROM challenges`;
    const { rows } = await knex.raw(query);

    return rows.map((challenge) => new Challenge(challenge));
  }

  static async find(id) {
    const query = `SELECT * FROM challenges WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const challenge = rows[0];
    return challenge ? new Challenge(challenge) : null;
  }

  static async findByUser(user_id) {
    const query = `SELECT * FROM challenges WHERE user_id = ?`;
    const { rows } = await knex.raw(query, [user_id]);
    return rows.map((challenge) => new Challenge(challenge));
  }

  static async editChallenge({ title, description, img, id }) {
    if (id === undefined) return null;

    const fields = [];
    const updates = [];

    if (title?.trim()) {
      updates.push("title = ?");
      fields.push(title);
    }
    if (description?.trim()) {
      updates.push("description = ?");
      fields.push(description);
    }
    if (img?.trim()) {
      updates.push("img = ?");
      fields.push(img);
    }

    if (updates.length === 0) return null;

    fields.push(id);

    const query = `
            UPDATE challenges
            SET ${updates.join(", ")}
            WHERE id = ?
            RETURNING *
        `;

    const { rows } = await knex.raw(query, fields);
    const updatedChallenge = rows[0];
    return updatedChallenge ? new Challenge(updatedChallenge) : null;
  }

  static async delete(id) {
    const query = `
            DELETE FROM challenges
            WHERE id = ?
            RETURNING *;
        `;

    const { rows } = await knex.raw(query, [id]);
    return rows[0] ? new Challenge(rows[0]) : null;
  }

  static async deleteAll() {
    return await knex("challenges").del();
  }
}

module.exports = Challenge;
