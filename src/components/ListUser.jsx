import axios from 'axios';
import { useEffect, useState } from 'react';
import "./User.css";

export function ListUser() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get('http://localhost:8005/api/').then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8005/api/index.php?id=${id}`).then((response) => {
      console.log(response.data);
      getUsers();
    });
  }

  const editUser = (user) => {
    setEditingUser(user.id);
    setForm({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  };
  
  const handleUpdate = (id) => {
    axios.put('http://localhost:8005/api/index.php', {
      id: id,
      name: form.name,
      email: form.email,
      mobile: form.mobile,
    }).then((response) => {
      console.log(response.data);
      setEditingUser(null);
      getUsers();
    });
  };


  return (
    <>
      <h2>User List</h2>
      <div className="userList">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          {users.map((user, key) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              {editingUser === user.id ? (
                <>
                  <td>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </td>
                  <td>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value})} />
                  </td>
                  <td>
                    <input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(user.id)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  <button onClick={() => editUser(user)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default ListUser;