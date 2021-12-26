function actualizartotal() {
  let table, rows, cells, busqueda, sumatotal;

  sumatotal = "";
  table = document.getElementById("myTable");
  rows = table.getElementsByTagName("tr");

  // Loopea por las filas y esconde
  for (let row of rows) {
    cells = row.getElementsByTagName("sumable");
    busqueda = cells[2] || null; // toma el 3er "td"

    if (row.style.display == "" && row.id == "sumable") {
      sumatotal++;
    }
  }
  document.getElementById("totalactual").innerHTML = sumatotal;
}

function sumarvalores() {
  //buscar todos los elementos td y con id "valorsumable"

  var sumatotalselect = "";

  var tds = document.getElementById("myTable").getElementsByTagName("td");
  var sum = 0;
  for (var i = 0; i < tds.length; i++) {
    if (tds[i].className == "sumable1" && tds[i].style.display == "") {
      sum += isNaN(tds[i].innerHTML) ? 0 : parseInt(tds[i].innerHTML);
    }
  }

  document.getElementById("sumatotalselect").innerHTML += sum;
}
