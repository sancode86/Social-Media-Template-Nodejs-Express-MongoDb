function searchintable() {
  const input = document.getElementById("myInput");
  const inputStr = input.value.toUpperCase();
  document.querySelectorAll('#myTable tr:not(.header)').forEach((tr) => {
    const anyMatch = [...tr.children]
      .some(td => td.textContent.toUpperCase().includes(inputStr));
    if (anyMatch){
       tr.style.removeProperty('display'); 
       var barrabusqueda = document.getElementById("barrabusqueda");
       barrabusqueda.style.display = "";

          //recorrer children nodes es la solucion ?
          if (tr.hasChildNodes()) {
            // buscar todos los hijos
            var children = tr.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = '';
            }
            }
          }
      }else{
        tr.style.display = 'none';   
          //recorrer children nodes es la solucion ?
          if (tr.hasChildNodes()) {
            // buscar todos los hijos
            var children = tr.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = 'none';
            }
            }
          }
       var barrabusqueda = document.getElementById("barrabusqueda");
       barrabusqueda.style.display = "";
    }
  });
}

  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }  

function filterTable() {
  // Variables
  let dropdown, table, rows, cells, searching, filter;
  dropdown = document.getElementById("searchingDropdown");
  table = document.getElementById("myTable");
  rows = table.getElementsByTagName("tr");
  filter = dropdown.value;

  // Loops through rows and hides those with countries that don't match the filter
  for (let row of rows) { // `for...of` loops through the NodeList
    cells = row.getElementsByTagName("td");
    searching = cells[2] || null; // gets the 3nd `td` or nothing
    // if the filter is set to 'All', or this is the header row, or 2nd `td` text matches filter
    if (filter === "Todo" || !searching || (filter === searching.textContent)) {
      row.style.display = ""; // shows this row
      
          if (row.hasChildNodes()) {
            // buscar todos los hijos
            var children = row.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = '';
            }
            }
          }    
    }
    else {
      row.style.display = "none"; // hides this row

          if (row.hasChildNodes()) {
            // buscar todos los hijos
            var children = row.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = 'none';
            }
            }
          }
    }
  }
}

function filterdate() {
  // Variables
  let calendario, table, rows, cells, searching, filter;
  calendario = document.getElementById("filtrofecha");
  table = document.getElementById("myTable");
  rows = table.getElementsByTagName("tr");
  filter = calendario.value;

  // Loops through rows and hides those with countries that don't match the filter
  for (let row of rows) { // `for...of` loops through the NodeList
    cells = row.getElementsByTagName("td");
    searching = cells[3] || null; // gets the 3nd `td` or nothing
    // if the filter is set to 'All', or this is the header row, or 2nd `td` text matches filter
    if (filter === "Todo" || !searching || (filter === searching.textContent)) {
      row.style.display = ""; // shows this row

          if (row.hasChildNodes()) {
            // buscar todos los hijos
            var children = row.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = '';
            }
            }
          }

    }
    else {      
      row.style.display = "none"; // hides this row

          if (row.hasChildNodes()) {
            // buscar todos los hijos
            var children = row.childNodes;  
            // Loop
            for(var c=0; c < children.length; c++) {
            if(children[c].style) {
              children[c].style.display = 'none';
            }
            }
          }
    }
  }
}