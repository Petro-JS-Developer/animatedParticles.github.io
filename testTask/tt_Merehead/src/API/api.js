const BASE_URL = `https://mate-api.herokuapp.com`;

const request = (url,  id = '', options) => fetch(
  `${BASE_URL}/${url}/${id}`, options,
)
  .then(result => result.json())
  .then(result => result.data);

export const getUser = (userId = '') => request(`users${userId}`);

export const addUser = options => request('users', '', options);

export const editUser = (id, options) => request('users', id, options);

export const deleteUser = userId => request('users', userId, {
  method: 'DELETE'
});