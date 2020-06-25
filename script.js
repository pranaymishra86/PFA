var totalRows = 25;
var totalCols = 40;
var inProgress = false;
var cellsToAnimate = [];
var createWalls = false;
var algorithm = null;
var justFinished = false;
var animationSpeed = "Fast";
var animationState = null;
var startCell = [11, 15];
var endCell = [11, 25];
var movingStart = false;
var movingEnd = false;



/*
------------------------------------------------
Functions and methods to create grid of size n*n.
------------------------------------------------
*/

function generateGrid(rows,cols) {
	var grid = "<table>";

	for (row=1;row<=rows;row++) {
		grid+="<tr>";
		for(col=1;col<=cols;col++) {
			grid+="<td></td>";
		}
		grid+="</tr>";
	}
	grid+="</table>";

	return grid;
}

var merigrid = generateGrid(totalRows,totalCols);

$( "#tableContainer" ).append(merigrid);

/*
----------------
Mouse Functions
----------------
*/



/*
-----------
Buttons
-----------
*/



/*
-----------------------
Activating NavBar menus
-----------------------
*/


/*
-------------------
Functions
-------------------
*/

