import React from 'react';

export default function Home({ onSelectRole }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Control de Horas de Empleados</h1>
      <p>Selecciona tu tipo de usuario para continuar:</p>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <button onClick={() => onSelectRole('Admin')}>Administrador</button>
        <button onClick={() => onSelectRole('TL')}>Team Leader</button>
        <button onClick={() => onSelectRole('Empleado')}>Empleado</button>
      </nav>
    </div>
  );
}
