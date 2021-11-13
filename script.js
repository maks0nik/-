let selectedRow;

function showVihod(btn) {
  document.getElementById("vihod").style.display = "block";
  let confirmBtn = document.querySelector(".bdel");
  confirmBtn.onclick = function (e) {
    onDelete(btn);
  };
}

function showDob() {
  document.getElementById("dob").style.display = "block";
}

function showIzm() {
  document.getElementById("izm").style.display = "block";
}

function notVisible() {
  document.getElementById("dob").style.display = "none";
  document.getElementById("vihod").style.display = "none";
  document.getElementById("izm").style.display = "none";
}

for (let openElement of document.getElementsByClassName("open")) {
  openElement.addEventListener("click", showDob);
}

for (let closeElement of document.getElementsByClassName("close")) {
  closeElement.addEventListener("click", notVisible);
}


function readFormData(selector) {
  var formData = {};
  formData["sex"] = selector.querySelector("input[name='sex']").value;
  formData["name"] = selector.querySelector("input[name='name']").value;
  formData["surname"] = selector.querySelector("input[name='surname']").value;
  formData["telephone"] = selector.querySelector("input[name='telephone']").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById("tb").getElementsByTagName("tbody")[1];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.sex;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.surname;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.telephone;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a class="reload" href="##" onclick="onEdit(this);showIzm()">Изменить</a>`;
  cell4 = newRow.insertCell(5);
  cell4.innerHTML = `<a href="##" class="udalenie" onClick="showVihod(this)">Удалить</a>`;
}

function onEdit(btn) {
  selectedRow = btn.parentElement.parentElement;
  document.getElementById("sex").value = selectedRow.cells[0].innerHTML;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("surname").value = selectedRow.cells[2].innerHTML;
  document.getElementById("telephone").value = selectedRow.cells[3].innerHTML;
}

function resetForm() {
  document.getElementById("sex").value = "";
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("telephone").value = "";
  selectedRow = null;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.sex;
  selectedRow.cells[1].innerHTML = formData.name;
  selectedRow.cells[2].innerHTML = formData.surname;
  selectedRow.cells[3].innerHTML = formData.telephone;
}

// Change
const showChangeFormBnt = document.querySelectorAll(".reload");
const submitChangeBtn = document.querySelector(".sbm-chng-btn");
const changeForm = document.querySelector("#izm");
showChangeFormBnt.forEach((item) => {
  item.addEventListener("click", (e) => {
    changeForm.style.display = "block";
  });
});

submitChangeBtn.addEventListener("click", (e) => {
  const data = readFormData(changeForm);
  updateRecord(data);
  resetForm();
  notVisible();
});

// Dobavit
const showAddFormBtn = document.querySelector("#app");
const addForm = document.querySelector("#dob");
const submitAddForm = document.querySelector(".dob-sbm-btn");

submitAddForm.addEventListener("click", (e) => {
  let data = readFormData(addForm);
  insertNewRecord(data);
  resetForm();
  notVisible();
});

// Delete

const deleteBtns = document.querySelectorAll(".udalenie");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showVihod(btn);
  });
});

function onDelete(btn) {
  let row = btn.parentElement.parentElement;
  row.remove();
  notVisible();
}
