const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db/contacts.json");

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(list);
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  const LIST = await listContacts();
  const item = LIST.find((el) => el.id === contactId);
  return item;
}

async function removeContact(contactId) {
  const FILTER = await getContactById(contactId);
  if (FILTER) {
    const LIST = await listContacts();
    const newList = LIST.filter((el) => el.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newList), "utf-8");
    return newList;
  } else {
    return "contact not found";
  }
}

async function addContact(name, email, phone) {
  const LIST = await listContacts();
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  const FILTER = await getContactById(newContact.id);
  if (!FILTER) {
    LIST.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(LIST), "utf-8");
    return LIST
  } else {
    ("Such contact already exists");
  }
}


module.exports = { listContacts, getContactById, removeContact, addContact };
