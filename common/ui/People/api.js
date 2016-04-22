import fetch from 'fetch';

export async function searchPeople(endpoint) {
  return (await fetch(endpoint)).json();
}
