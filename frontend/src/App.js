import React, { useEffect, useState } from 'react';
import './App.css'; 

const API_BASE = 'http://192.168.12.224:5050/api/v1';

function App() {
  const [bookings, setBookings] = useState([]); 
  const [form, setForm] = useState({ Date: '', Room: '', Type: '', Slot: '', Host: '' }); 
  const [editingId, setEditingId] = useState(null);

  const fetchBookings = async () => { 
    try {
      const res = await fetch(`${API_BASE}/getalluser`); 
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json(); 
      setBookings(data);   
    } catch (err) {  
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchBookings();   
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_BASE}/updateuser/${editingId}` : `${API_BASE}/adduser`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save booking');
      }

      setForm({ Date: '', Room: '', Type: '', Slot: '', Host: '' });
      setEditingId(null);
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      const res = await fetch(`${API_BASE}/deleteuser/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booking');
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    const formattedDate = new Date(item.Date).toISOString().split('T')[0];
    setForm({
      Date: formattedDate,
      Room: item.Room,
      Type: item.Type,
      Slot: item.Slot,
      Host: item.Host,
    });
    setEditingId(item.id);
  };

  return (
    <div className="container">
      <h2>{editingId ? 'Edit Booking' : 'Take a Slot for Meeting'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type='date' name="Date" value={form.Date} onChange={handleChange} required />
        <input type='number' name="Room" value={form.Room} onChange={handleChange} placeholder="Room" required />
        <input name="Type" value={form.Type} onChange={handleChange} placeholder="Type" required />
        <input name="Slot" value={form.Slot} onChange={handleChange} placeholder="Slot" required />
        <input name="Host" value={form.Host} onChange={handleChange} placeholder="Host" required />
        <button type="submit" className="btn primary">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              setForm({ Date: '', Room: '', Type: '', Slot: '', Host: '' });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Reserved Slot</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Date</th>
            <th>Room</th>
            <th>Type</th>
            <th>Slot</th>
            <th>Host</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="center">No bookings found</td>
            </tr>
          ) : (
            bookings.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{new Date(item.Date).toLocaleDateString()}</td>
                <td>{item.Room}</td>
                <td>{item.Type}</td>
                <td>{item.Slot}</td>
                <td>{item.Host}</td>
                <td>
                  <button className="btn edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
