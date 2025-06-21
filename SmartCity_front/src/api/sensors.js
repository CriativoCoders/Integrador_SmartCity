const API_URL = "http://127.0.0.1:8000/api/sensores/";

// Buscar todos os sensores (com filtro opcional via URL)
export async function getSensores(url = API_URL) {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

// Adicionar um novo sensor
export async function addSensor(sensor, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sensor)
  });
  return await res.json();
}

// Buscar sensor por ID
export async function getSensorById(id, token) {
  const res = await fetch(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

// Atualizar sensor existente
export async function updateSensor(id, sensor, token) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sensor)
  });
  return await res.json();
}

// Excluir sensor por ID
export async function deleteSensor(id, token) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.ok;
}