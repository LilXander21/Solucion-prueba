import React, { useState } from 'react';

const style = {
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px',
      display: 'block'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightsteelblue'
    }
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [firstName, setFirstName] = useState('Coder');
  const [lastName, setLastName] = useState('Byte');
  const [phone, setPhone] = useState('8885559999');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) return;
    
    addEntryToPhoneBook({ firstName, lastName, phone });
    // Resetear a valores iniciales después de enviar
    setFirstName('Coder');
    setLastName('Byte');
    setPhone('8885559999');
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>Last name:</label>
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label>Phone:</label>
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input 
        style={style.form.submitBtn}
        className='submitButton'
        type='submit' 
        value='Add User' 
        disabled={!firstName || !lastName || !phone}
      />
    </form>
  );
}

function InformationTable({ entries }) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{entry.firstName}</td>
            <td style={style.tableCell}>{entry.lastName}</td>
            <td style={style.tableCell}>{entry.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application() {
  const [phoneBook, setPhoneBook] = useState([]);

  const addEntryToPhoneBook = (entry) => {
    setPhoneBook(prev => {
      const newPhoneBook = [...prev, entry];
      // Ordenar por apellido
      return newPhoneBook.sort((a, b) => a.lastName.localeCompare(b.lastName));
    });
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable entries={phoneBook} />
    </section>
  );
}

export default Application;