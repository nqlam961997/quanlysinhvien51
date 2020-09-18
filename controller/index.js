// Time
var monthNames = [
  "01,",
  "02,",
  "03,",
  "04,",
  "05,",
  "06,",
  "07,",
  "08,",
  "09,",
  "10,",
  "11,",
  "12,",
];
var dayNames = ["Sun,", "Mon,", "Tue,", "Web,", "Thu,", "Fri,", "Sat,"];
var now = new Date();
var thisYear = now.getYear();
var thisDay = dayNames[now.getDay()];
if (thisYear < 1900) {
  thisYear += 1900;
}
document.getElementById("Time").innerHTML =
  thisDay + " " + monthNames[now.getMonth()] + thisYear;

// ToDoList
var checkList = [];

document.getElementById("btnThem").onclick = function () {
  var toDoList = new CheckList();
  toDoList.NoteInput = document.getElementById("Note").value;

  checkList.push(toDoList);

  creatTable(checkList);
  console.log("toDoList:", checkList);
};

var taoNut = function (Note) {
  if (Note.InputValid === true) {
    return `<a class="btn btn-success" id="btnCheck"  onclick="Complete('${Note.NoteInput}')"><i class="fa fa-check-circle"></i></a>`;
  } else {
    return `<a class="btnTable" id="btnCheck"  onclick="Complete('${Note.NoteInput}')"><i class="fa fa-check-circle"></i></a>`;
  }
};

var creatTable = function (arrList) {
  var contentTable = "";
  for (var index = 0; index < checkList.length; index++) {
    var toDoList = arrList[index];
    contentTable += `
          <tr>
        <td>${toDoList.NoteInput}
        <a class="btnTable" id="btnXoa" onclick="xoaList('${toDoList.NoteInput}')"><i class="fa fa-trash-alt"></i></a>
        ${taoNut(toDoList)}
        </td>
        </tr>
          <br>
        `;
  }
  // console.log("contentTable", contentTable);

  document.getElementById("outPut").innerHTML = contentTable;
};

var xoaList = function (Note) {
  for (var index = checkList.length - 1; index >= 0; index--) {
    var toDoItem = checkList[index];
    if (toDoItem.NoteInput === Note) {
      checkList.splice(index, 1);
    }
  }
  creatTable(checkList);
};

var Complete = function (Note) {
  for (var index = 0; index < checkList.length; index++) {
    var toDoItem = checkList[index];
    if (toDoItem.NoteInput === Note) {
      toDoItem.InputValid = !toDoItem.InputValid;
      // document.getElementById("btnCheck").style.color = "green";
    }
  }
  console.log(checkList);
  creatTable(checkList);
};

var completeList = [];
document.getElementById("btnLoc").onclick = function () {
  for (var index = 0; index < checkList.length; index++) {
    var toDoItem = checkList[index];
    if (toDoItem.InputValid === true){
      completeList.push(toDoItem);
      checkList.slice(index,1);
    }
    document.getElementById("complete").innerHTML = creatTable(completeList);
    creatTable(checkList);
  }
};

var luuLocalStorage = function () {
  var sCheckList = JSON.stringify(checkList);
  localStorage.setItem("checkList", sCheckList);
};

var layDuLieuLocalStorage = function () {
  if (localStorage.getItem("checkList")) {
    var sCheckList = localStorage.getItem(checkList);

    checkList = JSON.parse(sCheckList);
    creatTable(sCheckList);
  }
};
