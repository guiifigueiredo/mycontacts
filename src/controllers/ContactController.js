const ContactsRepository = require('../repositories/ConstactsRepository');

class ContactsController {
  // mostra todos os contatos
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  // mostra um contato
  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact Not Found' });
    }

    res.json(contact);
  }

  // cria um novo contato
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const emailExist = await ContactsRepository.findByEmail(email);

    if (emailExist) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  // atualiza um contato
  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExist = await ContactsRepository.findById(id);

    if (!contactExist) {
      res.json({ message: 'User not found' });
    }

    const contactEmail = await ContactsRepository.findByEmail(email);

    if (contactEmail && contactEmail.id !== id) {
      res.status(400).json({ message: 'This email is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  // deleta um contato
  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.staus(404).json({ message: 'Contact Not Found' });
    }

    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

// singleton
module.exports = new ContactsController();
