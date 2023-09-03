const userInput = document.querySelector("#userInput");
const searchType = document.querySelector("#searchType");
const searchBtn = document.querySelector("#searchBtn");
const resultTableBody = document.querySelector("#resultTableBody");
const preLoader = document.querySelector("#pre-loader");
const ResetBtn = document.querySelector("#reset-btn");

function preLoaderDisplayNone() {
  preLoader.style.display = "none";
}
function preLoaderDisplayBlock() {
  preLoader.style.display = "block";
}

async function checkData() {
  let url =
    "https://script.google.com/macros/s/AKfycbzXylmVnrzyKIPES9-ZmdXQCKreCi9BitKbCJ1jqN6JtTFzYyVBltJSu8OowXENT7allw/exec";

  try {
    const response = await fetch(
      `${url}?${searchType.value}=${userInput.value}`
    );
    if (userInput.value == "") {
      preLoaderDisplayNone();
      alert("Please Type A Number.");
      return;
    }
    const actualData = await response.json();

    if (actualData.data.length === 0) {
      preLoaderDisplayNone();
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

    ResetBtn.addEventListener("click", () => {
      userInput.value = "";
      resultTableBody.innerHTML = "";
    });

    resultTableBody.appendChild(row);
    if (resultTableBody.innerHTML != "") {
      preLoaderDisplayNone();
    } else {
      preLoaderDisplayBlock();
    }
  });
}

window.onload = () => {
  userInput.value = "";

  userInput.onkeydown = () => {
    if (event.key === "Enter") {
      checkData();
      preLoaderDisplayBlock();
      resultTableBody.innerHTML = "";
    }
  };
};

searchBtn.addEventListener("click", function () {
  checkData();
  preLoaderDisplayBlock();
});
