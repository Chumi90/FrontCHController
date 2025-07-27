import React, { useState } from 'react';
import { createUser, createProject } from '../services/api';

export default function PanelAdmin() {
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'Empleado' });
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleUserChange = e => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleProjectChange = e => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async e => {
    e.preventDefault();
    const res = await createUser(userForm);
    setMessage(res.error ? res.error : 'Usuario creado');
  };

  const handleProjectSubmit = async e => {
    e.preventDefault();
    const res = await createProject(projectForm);
    setMessage(res.error ? res.error : 'Proyecto creado');
  };

  return (
    <div>
      <h2>Panel Administrador</h2>
      <form onSubmit={handleUserSubmit}>
        <h3>Crear Usuario</h3>
        <input name="name" placeholder="Nombre" value={userForm.name} onChange={handleUserChange} required />
        <input name="email" placeholder="Email" value={userForm.email} onChange={handleUserChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={userForm.password} onChange={handleUserChange} required />
        <select name="role" value={userForm.role} onChange={handleUserChange}>
          <option value="Admin">Admin</option>
          <option value="TL">TL</option>
          <option value="Empleado">Empleado</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>
      <form onSubmit={handleProjectSubmit}>
        <h3>Crear Proyecto</h3>
        <input name="name" placeholder="Nombre" value={projectForm.name} onChange={handleProjectChange} required />
        <input name="description" placeholder="Descripción" value={projectForm.description} onChange={handleProjectChange} />
        <button type="submit">Crear Proyecto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
