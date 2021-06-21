export default function() {
  return {
    persons: JSON.parse(localStorage.getItem("persons") || "[]")
  };
}
