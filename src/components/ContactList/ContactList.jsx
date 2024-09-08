import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectFilteredContacts, selectLoading } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';
import css from './ContactList.module.css';


const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  if (isLoading) return <Loader />; 
  if (!filteredContacts.length) return <Notification />;

  return (
    <ul className={css.ContactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact 
          key={id} 
          name={name}
          number={number}
          onDelete={() => handleDeleteContact(id)}
        />
      ))}
    </ul>
  );
}

export default ContactList;