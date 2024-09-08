import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { fetchContacts } from './redux/contactsOps';
import { selectError } from './redux/contactsSlice';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import css from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.App}>
      <h1>PhoneBook</h1>
      <div className={css.App__container}>
        <ContactForm />
        <SearchBox />
      </div>
      <ContactList />
      <Toaster />
    </div>
  );
}

export default App;
