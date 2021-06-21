export function newForm({ commit }, person) {
  commit("newForm", person);
}
export function updateForm({ commit }, person) {
  commit("updateForm", person);
}
export function deletePerson({ commit }, id) {
  commit("deletePerson", id);
}
export function initial({ commit }, data) {
  commit("initial", data);
}
