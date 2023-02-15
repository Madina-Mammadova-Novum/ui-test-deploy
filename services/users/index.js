export const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    const data = await response.json();
    return data;
  } catch {
    throw new Error('Oops');
  }
};
