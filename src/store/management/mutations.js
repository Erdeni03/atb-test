export function newForm(state, person) {
  state.persons.push(person);

  localStorage.setItem("persons", JSON.stringify(state.persons));
}

export function updateForm(
  state,
  { id, firstname, lastName, middleName, birthDate, description }
) {
  const persons = state.persons.concat();
  const index = persons.findIndex(item => item.id === id);
  const person = persons[index];

  persons[index] = {
    ...person,
    firstname,
    lastName,
    middleName,
    birthDate,
    description
  };
  state.persons = persons;
  localStorage.setItem("persons", JSON.stringify(state.persons));
}

export function deletePerson(state, id) {
  const idx = state.persons.findIndex(t => t.id === id);

  state.persons.splice(idx, 1);
  localStorage.setItem("persons", JSON.stringify(state.persons));
}
export function initial(state, data) {
  state.persons = data;
  localStorage.setItem("persons", JSON.stringify(state.persons));
}
