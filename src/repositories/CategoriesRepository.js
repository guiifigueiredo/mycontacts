const db = require('../database');

class CategoriesRepository {
  async listCategories() {
    const row = await db.query('SELECT * FROM categories ORDER BY name');

    return row;
  }

  async createCategory(name) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *
    `, [name])

    return row;
  }
}

module.exports = new CategoriesRepository();