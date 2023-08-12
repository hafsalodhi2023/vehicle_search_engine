const userInput = document.querySelector("#userInput");
const searchType = document.querySelector("#searchType");
const searchBtn = document.querySelector("#searchBtn");
const resultTableBody = document.querySelector("#resultTableBody");

async function checkData() {
  let url =
    "https://script.google.com/macros/s/AKfycby9ZI6z3Kmc31XKa-PCgdrmkq27ISeK0ur92FYVnsvT_uTt0nmW6mcmona9wC9mXRFgfg/exec";

  try {
    const response = await fetch(
      `${url}?${searchType.value}=${userInput.value}`
    );
    if (userInput.value == "") {
      alert("Please Type A Number.");
      return;
    }
    const actualData = await response.json();

    if (actualData.data.length === 0) {
      alert("No data found.");
      resultTableBody.innerHTML = "";
    } else {
      displayDataInTable(actualData.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayDataInTable(data) {
  resultTableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.complainNo}</td>
      <td>${item.policeStation}</td>
      <td>${item.make}</td>
      <td>${item.model}</td>
      <td>${item.color}</td>
      <td>${item.registrationNo}</td>
      <td>${item.engineNo}</td>
      <td>${item.chassisNo}</td>
    `;

    resultTableBody.appendChild(row);
  });
}

window.onload = () => {
  userInput.value = "";
};

searchBtn.addEventListener("click", function () {
  checkData();
});
