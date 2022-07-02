import { Component } from 'react';

export class FormNewContact extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm() {
    this.setState({ name: '', number: '' });
  }

  hasName(name) {
    const contacts = this.props.contacts;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('This contact name already exists!');
      return true;
    }
    return false;
  }

  handleSubmit = e => {
    const name = e.target.name.value;
    const number = e.target.number.value;
    e.preventDefault();
    //check if name alrady exists
    if (this.hasName(name)) return;
    //use App method as prop
    this.props.addContact(name, number);
    this.resetForm();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default FormNewContact;
