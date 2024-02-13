import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function History() {
  //const [users, setUsers] = useState([]);
  const [hashes, setHash] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, user} = useStateContext();

  useEffect(() => {
    getHashes();
  }, [user])

  const onDeleteClick = hash => {
    if (!window.confirm("Are you sure you want to delete this hash?")) {
      return
    }
    axiosClient.delete(`/hash/${hash.id}`)
      .then(() => {
        setNotification('Hash was successfully deleted')
        getHashes()
      })
  }

  const getHashes = () => {
    setLoading(true)
    axiosClient.get('/history')
    .then(({ data }) => {
        console.log(data);
        setLoading(false)
        setHash(data.data.filter(entry => entry.user_id == user.id))
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>History of hashes</h1>
        <Link className="btn-add" to="/hash">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Input text</th>
            <th>Hash value</th>
            <th>Used algorithm</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {hashes.map(h => (
              <tr key={h.id}>
                <td>{h.input_text}</td>
                <td>{h.hash_value}</td>
                <td>{h.algorithm}</td>
                <td>{h.created_at}</td>
                <td>
                  <button className="btn-delete" onClick={ev => onDeleteClick(h)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
