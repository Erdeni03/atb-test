export const persons = s => s.persons;
export const personsById = s => id => s.persons.find(item => item.id === id);
