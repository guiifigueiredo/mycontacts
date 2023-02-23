const { v4 } = require('uuid');
const { update } = require('../controllers/ContactController');
const db = require('../database');

let contacts = [
  {
    id: v4(),
    name: 'Guilherme',
    email: 'guilherme@email.com',
    phone: '31203828',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Luiz',
    email: 'luiz@email.com',
    phone: '311252828',
    category_id: v4(),
  },
];

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);

    return rows;
   }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4) RETURNING *`, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }
};

  //     contacts = contacts.map((contact) => (
  //       contact.id === id ? updatedContact : contact
  //     ));

  //     resolve(updatedContact);
  //   });
  // }

  // delete(id) ;{
  //   return new Promise((resolve) => {
  //     contacts.filter((contact) => contact.id !== id);
  //     resolve();
  //   });
  // }
module.exports = new ContactsRepository();
