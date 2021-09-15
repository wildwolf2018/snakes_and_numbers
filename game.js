//import {round} from "./utilities.js";
/* const board = document.querySelector("#board")

function getMousePos(elem, evt){
		const rect = elem.getBoundingClientRect()
		const x = evt.clientX + window.scrollX - rect.left
		alert(`${x}`)
}

function getCoords(evt){
	getMousePos(board, evt)
}

board.addEventListener("click", (e) => getCoords(e))**/

/*const container  = document.querySelector(".board-container")
const playerRec = document.createElement("img")
playerRec.setAttribute("src", "Square.png")

// Set size and start position of player 
player.style.width = "5vw"
player.style.position = "relative"
player.style.left = "2.5vw"
container.append(player)*/
//import math;

class Player{
		constructor(playerImgElem, gameBoard)    {
		  this.sprite = playerImgElem;
		  this.gameBoard = gameBoard;
		//	this.color = color;
		console.log(this.sprite.width);
			this.x = 0;
			this.y = 0;
   }
   	
	 update(board, xCoord, yCoord, cellWidth, cellHeight){
	   const result = board.filter(cell => {
	 		 const leftCellBoundary = cell.getCenterX - cellWidth / 2;
	 		 const rightCellBoundary = cell.getCenterX + cellWidth / 2;
	 		 const topCellBoundary = cell.getCenterY - cellHeight / 2;
	 		 const bottomCellBoundary = cell.getCenterY + cellHeight / 2;
	 		return ((xCoord > leftCellBoundary && xCoord < rightCellBoundary) && (yCoord > topCellBoundary && yCoord < bottomCellBoundary)); 		
	   });
	  const shift = 4;
	  console.log(`index = ${JSON.stringify(result)}`);
    let index = result[0].id;
this.sprite.style.left = `${2.5 * (1 +   ((index % 10) )*shift)}vw`;	 
const numRows = 10; 
const bottomOffset = 10;
   	    this.sprite.style.bottom = `${this.gameBoard.height / numRows * 0.5 * (2 * Math.floor(index / 10)+1)  + bottomOffset}px`;
	return index;			
		}
		
}
const numRows = 10
//const bottomOffset = 10
//player.style.bottom = `${board.height / numRows * 0.5  + bottomOffset}px` 

//window.onload = draw;
let startTime, previousTime
const timeLabel = document.querySelector(".flex-item-time");

function round(num, decimalPlaces = 0){ 
  num = Math.round(num + "e" + decimalPlaces); 
  return Number(num + "e" + -decimalPlaces); 
}

/**function draw(timestamp){
		if(startTime === undefined)
				startTime = timestamp;
		
		const elapsed = timestamp - startTime;
	if(previousTime !== timestamp){
			const time = setPreciupdates sion( Math.min(0.001 * elapsed, 100000), 0);
			timeLabel.innerText = `Time: ${time}	`;			
	}
	
	if(elapsed < 100000){
				previousTime = timestamp;
		window.requestAnimationFrame(draw);
		}
}
**/
//window.requestAnimationFrame(draw);

//TODO
// 1.Create the board GUI
// 2.Initilize the board 
// 3.Create the timer
// 4.Create player 
// 5.Place player on board
// 6.Create random expression generator
// 7.Start the game
// 8.Update the game
// 9.End game if player reaches square 100 or time is over

// Initialize Board
//  1.Calculate width and height of cell
//  2.Calculate center coordinates of bottom left corner cell
//  3.For each row
//    a. Calculate center coordinates
//    relative to center coordinates of bottom left cell
//    b.Assign index to cell
/*function initBoardCells(board, cellArr){
		const numOfCols = 10;
		const numOfRows = 10;
		const cellWidth = round(board.width / numOfCols);
		const cellHeight = round(board.height / height);
		const rect = board.getBoundingClientRect();
		const bottomLeftX = rect.left;
		const bottomLeftY = rect.bottom;
		let cellCenterX = round(bottomLeftX + (boardWidth * 0.5));
		let cellCenterY = round(bottomLeftY - (boardHeight * 0.5));
		
		for(row = 0; row < numOfRows; row++){
				for(col = 0; col < numOfCols; cols++){
				    let index = row * numOfCols + col;
						cellArr[index] = Cell(index, cellCenterX, cellCenterY);
						cellCenterX += cellWidth;					
				}
				cellCenterY -= cellHeight;
		}
}**/

// Creating the player
// 1.Create player img element 
// 2.Assign player height and width
// 3.Calculate initial position
// 4.Add img to the DOM
// 5.Store position in object

class Cell {
  constructor(index, centerX, centerY){
  		this.centerX = centerX,
  		this.centerY = centerY,
  		this.index = index	
  }
  
  set setCenterX(x){
  		this.centerX = x;
  }
  
  get getCenterX(){
  		return this.centerX;
  }
  
  set setCenterY(y){
  		this.centerY = y;
  }
  
  get getCenterY(){
  		return this.centerY;
  }
  
  get id(){
 		return this.index;
 }
}


class Game{
  constructor(){
		  // Initial state
			this.scoreTotal = 0;// Initial score
			this.initTime = 110;// Initial time
			this.resultImages = ["Cross.png", "tick.png"];
			this.cells = [];
	    this.isGameOver = false;
	    this.currentTime = 10000;
	    this.previousTime = 0;
	    this.playerPos = 0;
	    this.numOfMoves = 0;
	    this.difficulty = "easy";
	    // Game board labels
	    this.score = document.querySelector(".flex-item-score");
	    this.result = document.querySelector("#confirm");
	    this.time = document.querySelector(".flex-item-time");
	    //
	    this.button = document.querySelector("#btn");
	    this.expression = document.querySelector("#exp");
	    this.init();
	    this.initializeGrid();
	    this.positionPlayer();
		}
		
		// Initialize the game board state
	 init(){
			this.button.addEventListener("click",  evt => this.generateExp(this.difficulty));				
   }
  
   getMousePos(elem, evt){
		const rect = elem.getBoundingClientRect();
		const x = evt.clientX + window.scrollX - rect.left;
		const y = rect.bottom  + window.scrollY - evt.clientY;
		alert(`${x}, ${y}`);
	//	if(typeof this.player == undefined) return;
		this.playerPos = this.playerSprite.update(this.cells, x, y, this.cellWidth, this.cellHeight);
  }  
  
  getCoords(evt){
	  this.getMousePos(this.board, evt);
	}
	
   initializeGrid(){
     this.board = document.querySelector("#board");
    this.board.addEventListener("click", (e) => this.getCoords(e));
     const cellWidth = this.board.width / 10
		// 1. Initialize board cells
		for(let i = 0; i < 100; i++){
				this.cells.push(new Cell(0, 0, 0));
		}
		this.initBoardCells();
   }
    
   initBoardCells(){
		const numOfCols = 10;
		const numOfRows = 10;
		this.cellWidth = round(this.board.width / numOfCols);
		this.cellHeight = round(this.board.height / numOfRows);
		
		const rect = board.getBoundingClientRect();
		const rectHeight = rect.bottom - rect.top;
		const bottomLeftX = rect.left;
		const bottomLeftY = 0;// rect.top - rectHeight;
		console.log(`${rect.top}, ${rect.bottom}`);
		let cellCenterX = round(bottomLeftX + (this.cellWidth * 0.5));
		const initCenterX = cellCenterX;
		let cellCenterY = round(bottomLeftY + (this.cellHeight * 0.5));
		const initCenterY = cellCenterY;
		for(let row = 0; row < numOfRows; row++){
				for(let col = 0; col < numOfCols; col++){
				    let index = row * numOfCols + col;
						this.cells[index].index = index;
		this.cells[index].setCenterX = cellCenterX;
		this.cells[index].setCenterY = cellCenterY;
						console.log(`${index}, x = ${this.cells[index].getCenterX}, y = ${this.cells[index].getCenterY}`)
						cellCenterX += this.cellWidth;					
				}
				cellCenterY += this.cellHeight;
				cellCenterX = initCenterX;
		}
}

  positionPlayer() {
  		this.container = document.querySelector(".board-container");
  		this.player = document.querySelector("img");
  		const player = this.player;
  	  this.player.setAttribute("src", "square.png");

// Set size and start position of player 
    this.player.style.width = "5vw";
    this.player.style.height = "5vw";
    this.player.style.position = "relative";
    let shift = 4;
    let index = 1;
    this.player.style.left = `${2.5 * (1 +   ((index) % 10 -1)*shift)}vw`;
  //  player.style.bottom = bottomPos;
    this.container.append(this.player);
 
    const numRows = 10;
    const bottomOffset = 10;
    this.player.style.bottom = `${this.board.height / numRows * 0.5 * (2 * Math.floor(index / 10)+1)  + bottomOffset}px`;
    this.playerSprite = new Player(this.player, this.board);
    console.log(this.playerSprite);
  }
  
  generateExp(difficulty){
    let upper;
    let lower;
    if(difficulty === "easy"){
    		upper = 13;
    		lower = 6;
    } else{
    		upper = 25;
    		lower = 12;
    }
    let num1 = Math.floor((Math.random() * upper) - lower);
    const num2 = Math.floor((Math.random() * upper) - lower);
    const signOfNum1 = num1 >= 0 ? "&nbsp":"";
    const signOfNum2 = num2 > 0 ? "+":"-";  
    this.expression.innerHTML = `<strong>${signOfNum1}${num1} ${signOfNum2} ${Math.abs(num2)}</strong>`;
    this.numOfMoves = Math.abs(num1 + num2);
   }
   
   update(elapsedTime){
    this.displayTime(round(elapsedTime, 0));
     //TODO
     // Update the game state
   }
   
   displayTime(currentTime){
   if(this.currentTime <= 0)return;
      this.currentTime = this.initTime -  currentTime;
      let timeText = "";
   		if(this.currentTime >= 0 && this.currentTime  < 10){
   				timeText = `TIME: 00${this.currentTime}`;
   		}else if(this.currentTime >= 10 && this.currentTime < 100){
   				timeText = `TIME: 0${this.currentTime}`;
   		}else {timeText = `TIME: ${this.currentTime}`;}
   	  this.time.innerText = timeText;

   }
}

const game = new Game();
game.init();

//let startTime, previousTime;		
const loop = (timestamp) => {
		if(startTime === undefined)
				startTime = timestamp;
		
		const elapsed = timestamp - startTime;
	  if(previousTime !== timestamp){
		const time = Math.min(0.001 * elapsed, 110000);
		game.update(time);		
	}
	
	if(elapsed < 110000){
				this.previousTime = timestamp;
		window.requestAnimationFrame(loop);
		}
};

setTimeout(() => {window.requestAnimationFrame(loop)}, 1000);




