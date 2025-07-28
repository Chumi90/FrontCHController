

import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PanelAdmin from './pages/PanelAdmin';
import PanelTL from './pages/PanelTL';
import PanelEmpleado from './pages/PanelEmpleado';
import PanelHorasMes from './pages/PanelHorasMes';

const API_URL = import.meta.env.VITE_APP_API_URL;

function App() {
  const [role, setRole] = useState(null);
  const [showHorasMes, setShowHorasMes] = useState(false);

  const handleHome = () => {
    setRole(null);
    setShowHorasMes(false);
  };
  const handleShowHorasMes = () => setShowHorasMes(true);

  if (!role) {
    return <Home onSelectRole={setRole} />;
  }

  return (
    <div>
      <Navbar onHome={handleHome} role={role} onShowHorasMes={handleShowHorasMes} />
      {showHorasMes ? (
        <PanelHorasMes />
      ) : (
        <>
          {role === 'Admin' && <PanelAdmin />}
          {role === 'TL' && <PanelTL />}
          {role === 'Empleado' && <PanelEmpleado />}
          {!(role === 'Admin' || role === 'TL' || role === 'Empleado') && <div>Rol no reconocido</div>}
        </>
      )}
    </div>
  );
}

export default App;
