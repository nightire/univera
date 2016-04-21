import fetch from 'fetch';

export async function fetchPeople() {
  return (await fetch(`https://api.github.com/users`)).json();
}
