export const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
  const data = await response.json();
  return data;
};
