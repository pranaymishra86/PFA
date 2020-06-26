var totalRows = 40;
var totalCols = 40;
var inProgress = false;
var cellsToAnimate = [];
var createWalls = false;
var algorithm = null;
var justFinished = false;
var animationSpeed = "Fast";
var animationState = null;
var startCell = [11, 15]; //the green cell
var endCell = [11, 25];	//the red cell
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


/*moving the positioned cursors in the grid */

$("td").mousedown(function(){
	var index = $("td").index(this);
	var startCellIndex = (startCell[0]*(totalCols)) + startCell[1];
	var endCellIndex = (endCell[0]*(totalCols)) + endCell[1];

	if(!inProgress) {
			//this means that the process of pathfinding has finished
		if ( justFinished  && !inProgress ){ 
			clearBoard( keepWalls = true ); 
			justFinished = false;
		}
		if (index == startCellIndex){  //if the chosen cell to be moved is the start index
			movingStart = true;
			
		} else if (index == endCellIndex){ //if the chosen cell to be moved is the end index
			movingEnd = true;
		
		} else { 		//else the creation of wall needs to take place at that place
			createWalls = true;
		}
	}
});

/*function to drop cells around */
$("td").mouseup(function(){
	createWalls = false;
	movingStart = false;
	movingEnd = false;
});


//function to help create a wall at any clicked cell of the grid
//and also help in the movement of the start or end index 
$("td").mouseenter(function(){
	if(!createWalls && !movingStart && !movingEnd) {return; }
	var index = $("td").index(this);
	var startCellIndex = (startCell[0]*(totalCols)) + startCell[1];
	var endCellIndex = (endCell[0]*(totalCols)) + endCell[1];
	if(!inProgress) { //if the process has finished 
		if(justFinished) {
			clearBoard(keepWalls = true); //we would keep the walls even though the process has finished
			justFinished = False;
		}

		if(movingStart && index != endCellIndex) {
			moveStartOrEnd(startCellIndex,index,"start");
		}
		else if (movingEnd && index != startCellIndex) {
    		moveStartOrEnd(endCellIndex, index, "end");
    	} else if (index != startCellIndex && index != endCellIndex) {
    		$(this).toggleClass("wall");
    	}
	}
});

//this will help in dragging the click on any of the empty cell and making every draged/hovered cell to be a wall
$( "td" ).click(function() {
    var index = $( "td" ).index( this );
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    if ((inProgress == false) && !(index == startCellIndex) && !(index == endCellIndex)){  //if the clicked/hovered cell is not a start/end index
    	if ( justFinished ){ 
    		clearBoard( keepWalls = true );
    		justFinished = false;
    	}
    	$(this).toggleClass("wall"); // else if the process is not started/finished it will make it a wall
    }
});




/*
-----------
Buttons
-----------
*/

//activating the start button

$("#startBtn").click(function() {
	if(algorithm == null) { 	//if no algorithm has been selected, then it will not work
		return ;
	}
	if(inProgress) {	// if the algorithm is running 
	 update("wait");
	 return; 
	}
	traverseGraph(algorithm);
	
});

//activating the end button

$("#endBtn").click(function() {
	if(inProgress) {update("wait"); return;} // if the user presses the button while the algorithm is still going on, then display the error message!
	clearBoard(keepWalls=false); //else, we will call the clear board function, with specification like dont keep the walls, remove them also 
});


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

