const BASE_URL = "http://localhost:3003";

function checkStatus(res) {
  if (!res.ok) {
    return Promise.reject(`${res.status}`);
  }
  return res.json();
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}

export function getContacts(Bearer) {
  return fetch(`${BASE_URL}/contacts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Bearer}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}
export function deleteContact(id, Bearer) {
  return fetch(`${BASE_URL}/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Bearer}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}
export async function patchContact(inputs, Bearer) {
  return await fetch(`${BASE_URL}/contacts/${inputs.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
    }),
    headers: {
      Authorization: `Bearer ${Bearer}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}
export async function createContact(inputs, Bearer) {
  return await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify({
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
    }),
    headers: {
      Authorization: `Bearer ${Bearer}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
}
