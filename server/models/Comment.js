const knex = require("../db/knex");

class Comment {
    constructor({
        content,
        post_id,
        user_id,
        parent_comment_id
    }) {
        this.content = content;
        this.post_id = post_id;
        this.user_id = user_id;
        this.parent_comment_id = parent_comment_id;
    }

    static async create({
        content = '',
        post_id,
        user_id,
        parent_comment_id
    }) {
        const query = `
            INSERT INTO comments (content, post_id, user_id, parent_comment_id)
            VALUES (?, ?, ?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [content, post_id, user_id, parent_comment_id]);
        return new Comment(rows[0]);
    }

    static async list() {
        const query = `SELECT * FROM comments`;
        const { rows } = await knex.raw(query);
        return rows.map(comment => new Comment(comment));
    }

    static async find(id) {
        const query = `SELECT * FROM comments WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const comment = rows[0];
        return comment ? new Comment(comment) : null;
    }

    static async findByUser(user_id) {
        const query = `SELECT * FROM comments WHERE user_id = ?`;
        const { rows } = await knex.raw(query, [user_id]);
        return rows.map(comment => new Comment(comment));
    }

    static async findByPost(post_id) {
        const query = `SELECT * FROM comments WHERE post_id = ?`;
        const { rows } = await knex.raw(query, [post_id]);
        return rows.map(comment => new Comment(comment));
    }

    static async findByParentComment(parent_comment_id) {
        const query = `SELECT * FROM comments WHERE parent_comment_id = ?`;
        const { rows } = await knex.raw(query, [parent_comment_id]);
        return rows.map(comment => new Comment(comment));
    }

    static async editComment({content, id}) {
        if (id === undefined || content === undefined) {
            return null;
        }

        const query = `
            UPDATE comments
            SET content = ?
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [content, id]);
        const updatedComment = rows[0];
        return updatedComment ? new Comment(updatedComment) : null;
    }

    static async delete({id}) {
        const query = `
            DELETE FROM comments
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [id]);
        return rows[0] ? new Comment(rows[0]) : null;
    }

    static async deleteAll() {
        return knex('comments').del();
    }
}
