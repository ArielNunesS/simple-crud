import { useState, useEffect, useRef } from 'react';
import './style.css'
import Trash from '../../assets/trash-icon.png'
import api from '../../services/api'

function Home() {
  const [ users, setUsers ] = useState([])

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

    async function getUsers() {
      const usersApi = await api.get('/users');

      setUsers(usersApi.data)
      console.log(users)
    }

    async function createUsers() {
      const usersApi = await api.post('/users', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      });

      getUsers()
    }

    async function deleteUsers(id) {
      const usersApi = await api.delete(`/users/${id}`);
      getUsers();
    }

    useEffect(() => {
      getUsers()
    }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastras Usuários</h1>
          <input name='Nome' placeholder='Nome' type='text' ref={inputName}/>
          <input name='Idade' placeholder='Idade' type='number' ref={inputAge}/>
          <input name='Email' placeholder='Email' type='email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

    { users.map( user => (
      <div key={user.id} className='card'>
        <div>
            <p>Nome:  <span>{user.name}   </span> </p>
            <p>Idade: <span>{user.age}    </span> </p>
            <p>Email: <span>{user.email}  </span> </p>
        </div>

        <button onClick={ () => deleteUsers(user.id)}>
          <img src={Trash}/>
        </button>
      </div>
    ))}

    </div>
  )
}

export default Home;