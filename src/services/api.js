const API_URL = import.meta.env.VITE_APP_API_URL;

export async function createUser(data) {
  const res = await fetch(`${API_URL}/admin/create-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function createProject(data, role = 'admin') {
  const endpoint = role === 'admin' ? '/admin/create-project' : '/tl/create-project';
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function registerHour(data, role = 'employer') {
  let endpoint = '/employer/start';
  if (role === 'tl') endpoint = '/tl/hours';
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function modifyHour(data,userId, role = 'employer') {
  let endpoint = `/hours/${userId}`;
  if (role === 'tl') endpoint = `/hours/${userId}`;
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return res.json();
}
