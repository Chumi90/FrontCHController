

import React, { useEffect, useState } from 'react';
import { registerHour } from '../services/api';


async function fetchHours(userId) {
  const res = await fetch(`https://backchcontroller.onrender.com/admin/hours/${userId}`);
  return res.json();
}

async function fetchUsers() {
  const res = await fetch('https://backchcontroller.onrender.com/admin/users');
  return res.json();
}
async function fetchProjects() {
  const res = await fetch('https://backchcontroller.onrender.com/admin/projects');
  return res.json();
}


export default function PanelEmpleado() {
  const [hourForm, setHourForm] = useState({ userId: '', projectId: '', date: '', startTime: '', endTime: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hours, setHours] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      if (data.length > 0) {
        setHourForm(f => ({ ...f, userId: data[1]._id }));
      }
    });
    fetchProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (hourForm.userId) {
      fetchHours(hourForm.userId).then(setHours);
    }
  }, [hourForm.userId]);

  const handleHourChange = e => {
    setHourForm({ ...hourForm, [e.target.name]: e.target.value });
  };

  const handleHourSubmit = async e => {
    e.preventDefault();
    // Construir startTime y endTime como fechas completas ISO
    const { date, startTime, endTime } = hourForm;
    let startISO = '';
    let endISO = '';
    if (date && startTime) {
      startISO = `${date}T${startTime}`;
    }
    if (date && endTime !== undefined && endTime !== '') {
      endISO = `${date}T${endTime}`;
    } else {
      endISO = null;
    }

    // Calcular duración en minutos
    let duration = '';
    if (startTime && endTime) {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      duration = (eh * 60 + em) - (sh * 60 + sm);
    }

    const res = await registerHour({
      ...hourForm,
      startTime: startISO,
      endTime: endISO,
      duration
    });
    setMessage(res.error ? res.error : 'Hora registrada');
  };

  // Filtrar horas por mes seleccionado usando startTime
  const horasMes = hours.filter(h => {
    const d = h.startTime ? new Date(h.startTime) : (h.date ? new Date(h.date) : null);
    return d && (d.getMonth() + 1 === Number(selectedMonth));
  });

  return (
    <div>
      <h2>Panel Empleado</h2>
      <form onSubmit={handleHourSubmit}>
        <h3>Registrar Hora</h3>
        <div>
          <strong>Usuario: </strong>
          <select name="userId" value={hourForm.userId} onChange={handleHourChange} required>
            <option value="">Selecciona usuario</option>
            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </div>
        <select name="projectId" value={hourForm.projectId} onChange={handleHourChange} required>
          <option value="">Selecciona proyecto</option>
          {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <input name="date" type="date" value={hourForm.date} onChange={handleHourChange} required />
        <input name="startTime" type="time" value={hourForm.startTime} onChange={handleHourChange} required />
        <input name="endTime" type="time" value={hourForm.endTime} onChange={handleHourChange} />
        <button type="submit">Registrar Hora</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Horas registradas este mes</h3>
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
            <th>Inicio </th>
            <th>Fin</th>
            <th>Duración imputada (min)</th>
          </tr>
        </thead>
        <tbody>
          {horasMes.map(h => {
            const fecha = h.startTime ? new Date(h.startTime) : (h.date ? new Date(h.date) : null);
            const proyecto = projects.find(p => p._id === h.project || p._id === h.projectId);
            return (
              <tr key={h._id}>
                <td>{fecha ? fecha.toLocaleDateString() : ''}</td>
                <td>{proyecto ? proyecto.name : (h.project?.name || h.project || h.projectId || '')}</td>
                <td>{h.startTime ? new Date(h.startTime).toLocaleTimeString() : ''}</td>
                <td>{h.endTime ? new Date(h.endTime).toLocaleTimeString() : ''}</td>
                <td>{h.duration || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
