import React, { useEffect, useState } from 'react';

async function fetchUsers() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}admin/users`);
  return res.json();
}
async function fetchHours(userId, month) {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}admin/hours/${userId}`);
  const allHours = await res.json();
  // Filtrar por mes
  return allHours.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() + 1 === Number(month);
  });
}

export default function PanelHorasMes() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchHours(selectedUser, selectedMonth).then(setHours);
    }
  }, [selectedUser, selectedMonth]);

  return (
    <div>
      <h2>Horas registradas por empleado</h2>
      <label>
        Empleado:
        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
          <option value="">Selecciona empleado</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
      </label>
      <label>
        Mes:
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          {[...Array(12)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Proyecto</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Duración (min)</th>
          </tr>
        </thead>
        <tbody>
          {hours.map(h => (
            <tr key={h._id}>
              <td>{new Date(h.date).toLocaleDateString()}</td>
              <td>{h.project?.name || h.project}</td>
              <td>{h.startTime ? new Date(h.startTime).toLocaleTimeString() : ''}</td>
              <td>{h.endTime ? new Date(h.endTime).toLocaleTimeString() : ''}</td>
              <td>{h.duration || ''} </td>
              <td>
                <form action="" onSubmit={async (e) => {
                  e.preventDefault();
                  const newDuration = e.target.elements[0].value;
                  const res = await modifyHour({ duration: newDuration }, h._id, role="employer");
                  if (res.error) {
                    alert(res.error);
                  } else {
                    alert('Hora modificada');
                  }
                }}>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
