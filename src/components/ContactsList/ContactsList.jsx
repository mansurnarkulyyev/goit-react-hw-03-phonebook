import ContactsItem from '../ContactsItem/ContactsItem';
const ContactsList = ({ contacts, removeContact }) => {
  // let filteredContacts = [];
  // if (!searchValue) {
  //   //do nothing
  //   filteredContacts = [...contacts];
  // } else {
  //   //filter with searchValue
  //   filteredContacts = [
  //     ...contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(searchValue.toLowerCase())
  //     ),
  //   ];
  // }

  return (
    <ul>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactsItem
            name={name}
            number={number}
            key={id}
            id={id}
            removeContact={removeContact}
          />
        );
      })}
    </ul>
  );
};

export default ContactsList;
