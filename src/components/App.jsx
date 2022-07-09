import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../styles/styles.scss';
import FormNewContact from './FormNewContact/FormNewContact';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import Notification from './Notification/Notification';
import SearchContact from './SearchContact/SearchContact';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-0', name: 'wer', number: '232459-12-56' },
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedСontacts = JSON.parse(contacts);

    if (parsedСontacts) {
      this.setState({ contacts: parsedСontacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  filterContacts() {
    const { filter, contacts } = this.state;
    if (filter) {
      return [
        ...contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        ),
      ];
    }
    return contacts;
  }

  addContact = ({ name, number }) => {
    const normalizedFind = name.toLowerCase();
    const findName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) {
      return alert(`${name} is already in contacts.`);
    }

    const findNumber = this.state.contacts.find(
      contact => contact.number === number
    );
    if (findNumber) {
      return alert(`This phone number is already in use.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [{ name, number, id: nanoid() }, ...contacts],
    }));
  };

  removeContact = id => {
    this.setState(prev => ({
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <Section title={'Phonebook'}>
          <FormNewContact onSubmit={this.addContact} />
        </Section>
        <Section title={'Contacts'}>
          {contacts.length ? (
            <>
              <SearchContact
                searchValue={filter}
                handleChange={this.handleChange}
              />
              <ContactsList
                // searchValue={filter}
                contacts={this.filterContacts()} //how it fires???
                removeContact={this.removeContact}
              />
            </>
          ) : (
            <Notification message={'Phonebook is empty, add someone'} />
          )}
        </Section>
      </>
    );
  }
}