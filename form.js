let db;
const request = indexedDB.open("FinanseDB", 1);

request.onerror = (e) => console.error("Błąd otwarcia IndexedDB", e);

request.onsuccess = (e) => {
  db = e.target.result;
  displayExpenses();
};

request.onupgradeneeded = (e) => {
  db = e.target.result;
  const store = db.createObjectStore("wydatki", { keyPath: "id", autoIncrement: true });
  store.createIndex("category", "category", { unique: false });
};

document.getElementById("expense-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  const transaction = db.transaction(["wydatki"], "readwrite");
  const store = transaction.objectStore("wydatki");
  store.add({ category, amount });

  transaction.oncomplete = () => {
    document.getElementById("expense-form").reset();
    displayExpenses();
  };
});

function displayExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  const transaction = db.transaction(["wydatki"], "readonly");
  const store = transaction.objectStore("wydatki");
  const request = store.openCursor();

  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      const item = document.createElement("li");
      item.textContent = `${cursor.value.category}: ${cursor.value.amount} zł`;
      list.appendChild(item);
      cursor.continue();
    }
  };
}
