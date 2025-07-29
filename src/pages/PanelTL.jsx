
import React, { useEffect, useState } from 'react';
import { createProject, registerHour } from '../services/api';


async function fetchUsers() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}admin/users`);
  return res.json();
}
async function fetchProjects() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}admin/projects`);
  return res.json();
}


export default function PanelTL() {
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [hourForm, setHourForm] = useState({ userId: '', projectId: '', date: '', startTime: '', endTime: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchProjects().then(setProjects);
  }, []);

  const handleProjectChange = e => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };
  const handleHourChange = e => {
    setHourForm({ ...hourForm, [e.target.name]: e.target.value });
  };

  const handleProjectSubmit = async e => {
    e.preventDefault();
    const res = await createProject(projectForm, 'tl');
    setMessage(res.error ? res.error : 'Proyecto creado');
  };

  const handleHourSubmit = async e => {
    e.preventDefault();
    const res = await registerHour(hourForm, 'tl');
    setMessage(res.error ? res.error : 'Hora registrada');
  };

  return (
    <div>
      <h2>Panel TL</h2>
      <form onSubmit={handleProjectSubmit}>
        <h3>Crear Proyecto</h3>
        <input name="name" placeholder="Nombre" value={projectForm.name} onChange={handleProjectChange} required />
        <input name="description" placeholder="Descripción" value={projectForm.description} onChange={handleProjectChange} />
        <button type="submit">Crear Proyecto</button>
      </form>
      <form onSubmit={handleHourSubmit}>
        <h3>Registrar Hora de Usuario</h3>
        <select name="userId" value={hourForm.userId} onChange={handleHourChange} required>
          <option value="">Selecciona usuario</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
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
    </div>
  );
}
