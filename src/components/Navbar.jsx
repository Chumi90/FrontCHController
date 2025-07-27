import React from 'react';

export default function Navbar({ onHome, role, onShowHorasMes }) {
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
      <button onClick={onHome}>Inicio</button>
      <button onClick={onShowHorasMes}>Ver horas por empleado y mes</button>
    </nav>
  );
}
