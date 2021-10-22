// Rounds float point number to specified decimal places 
function round(num, decimalPlaces = 0) { 
  num = Math.round(num + "e" + decimalPlaces)
  return Number(num + "e" + -decimalPlaces)
}

/*function findMaximumPosition(score, initials, records){
	 // Find position to insert the score
   let y // temporary variable fo value at insertion position
   let z // temp variable to hold initials
   let index // position to insert score
   for(let i = 0; i < 5; i++)	{
   		if(score > parseInt(records.scores[i])){
   			index = i
   			y = records.scores[i]	
   			z = records.initials[i]
   			records.scores[i] = `${score}`
   			records.initials[i] = `${initials}`
   			break   			
   		}// if
   } // for
   index++ // Advance position for swapping
   return {pos: index,temp: y, temp2: z}
}*/

//PLAYER.
	class Player{
		constructor(playerImgElem, gameBoard)    {
		  this.sprite = playerImgElem;
		  this.gameBoard = gameBoard;
			this.x = 0;
			this.y = 0;
   }
   	
	 findCell(board, xCoord, yCoord, cellWidth, cellHeight){
	   const result = board.find(cell => {
	 		 const leftCellBoundary = cell.getCenterX - cellWidth / 2;
	 		 const rightCellBoundary = cell.getCenterX + cellWidth / 2;
	 		 const topCellBoundary = cell.getCenterY - cellHeight / 2;
	 		 const bottomCellBoundary = cell.getCenterY + cellHeight / 2;
	 		return ((xCoord > leftCellBoundary && xCoord < rightCellBoundary) && (yCoord > topCellBoundary && yCoord < bottomCellBoundary)); 		
	   }); 
	   if(typeof result !== "undefined"){
	     console.log("Clicked: ", result.id)
	     return result.id;}
	   else {
	     return this.finalPos;
	  }
	}
	
	move(index){
	  const shift = 4;
    this.sprite.style.left = `${2.5 * (1 +   ((index % 10) )*shift)}vw`;	 
    const numRows = 10; 
    const bottomOffset = 10;
   	this.sprite.style.bottom = `${this.gameBoard.height / numRows * 0.5 * (2 * Math.floor(index / 10)+1)  + bottomOffset}px`;	
		}		
}

// Game board cell
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
// GAME							
class Game{
  constructor(targets, mode, randomCallback, state, screens){
      this.screens = screens
      this.random = randomCallback;
      this.targets = targets;
	    this.numCorrectMoves = state.correct;
	    this.numIncorrectMoves = 0;
	    this.isButtonPressed = false;
	    this.isGameStarted = false;
	    this.state = state;
	    this.screens.button.addEventListener("click",  evt => { console.log(evt); 
	    if(this.isGameStarted && !this.isGameOver && !this.isButtonPressed){
	    this.generateExp();
	    console.log("cliked")
	   }
	    }	);
	   this.targets.result.setAttribute("src", "tick.png");
		}
		
		set started(status){
		  this.isGameStarted = status;
		}
		
		get started(){
		  return this.isGameStarted;
		}
		
		// Initialize the game board state
	 init(recordedScores){
	  this.records = recordedScores
	   // Initial state
		 	this.scoreTotal = this.state.score;// Initial score
		 	 this.targets.score.innerHTML = `SCORE: ${this.scoreTotal}`;
			this.initTime =  this.state.time;// Initial time
	    this.isGameOver = false;
	    this.state.gameOver = false;
	    this.currentTime = this.state.time * 1000;
	    this.correctPos = this.state.index;
	    this.finalPos = this.state.index;
	    this.numOfMoves = this.state.numOfMoves;
	    this.difficulty = this.state.difficulty; 
	   //btn listener  
	   this.stamp = setInterval(() => { setCookie("gameState", `${this.difficulty},${this.isGameOver},${this.scoreTotal},${this.currentTime},${this.finalPos},${this.numCorrectMoves},${this.numOfMoves}`, 1) }, 2000)   	 	 
  setTimeout(() => {
  clearInterval(this.stamp)
}, this.currentTime)
  }      
  
   getMousePos(elem, evt){
		const rect = elem.getBoundingClientRect();
		const x = evt.clientX  - rect.left;
		const y = rect.bottom - evt.clientY;
		const playerIndex = this.playerSprite.findCell(cells, x, y, this.cellWidth, this.cellHeight);
		this.movePlayer(playerIndex);
  }  
  
  checkSnakesLadders(choiceIndex){
    this.scoreTotal += 200;
    this.state.score = this.scoreTotal
    if(ladders.get(choiceIndex) != undefined){
     this.playerSprite.move(ladders. get(choiceIndex));
     this.finalPos = ladders.get(choiceIndex);
     this.state.index = this.finalPos;
     console.log(`current= ${this.finalPos}`);
     this.scoreTotal += 400;
     this.state.score = this.scoreTotal     
     this.targets.audio.src = sounds[2];
     this.targets.audio.play();
     return true;
      }
      
    if(snakes.get(choiceIndex) != undefined){
       this.playerSprite.move(snakes. get(choiceIndex));
       this.finalPos = snakes.get(choiceIndex);
       this.scoreTotal -= 400;
        this.state.index = this.finalPos;
       this.state.score = this.scoreTotal
       this.targets.audio.src = sounds[4];
       this.targets.audio.play();
            console.log(`current= ${this.finalPos}`);  
        return true;    
   }
   return false;
 }
  
  movePlayer(choiceIndex){
    this.isButtonPressed = false;
    this.screens.button.style.background  = "rgba(0, 255, 0, 1.0)";
    if(choiceIndex === this.correctPos){  
     this.state.index = choiceIndex; this.targets.result.setAttribute("src", "tick.png");
this.targets.result.style.width = "5vh";
this.targets.result.style.height="4vh";
      this.finalPos = choiceIndex;
      console.log(`current= ${this.finalPos}`);
      this.playerSprite.move(choiceIndex);
      this.scoreTotal += 200;
      if(!this.checkSnakesLadders(choiceIndex)){
      this.targets.audio.src = sounds[0];
      this.targets.audio.play()
      }
      this.numCorrectMoves++;  
      this.state.correct = this.numCorrectMoves
      console.log(`correct_num_noves = ${this.numCorrectMoves}`); 
    } else{
      this.targets.result.setAttribute("src", "cross.png");
      this.targets.audio.src = sounds[1];
      this.targets.audio.play();
      this.targets.result.style.width="5vh";
      this.targets.result.style.height="4vh";
    }
    this.targets.score.innerHTML = `SCORE: ${this.scoreTotal}`;
          console.log(`current= ${this.finalPos}`);
  if(this.finalPos === 99){
    this.endGame();
  }
  }// end movePlayer
  
  getCoords(evt){
 // console.log("clicked");
  this.screens.button.disabled = false;
   if(this.isButtonPressed) {
   this.numOfMoves ++;
   this.state.numOfMoves =   this.numOfMoves;}
   console.log(`num_noves = ${this.numOfMoves }`);
   if(this.correctPos === -1){
     this.isButtonPressed = false;
    this.screens.button.style.background  = "rgba(0, 255, 0, 1.0)";
   		return;
   		}
	  this.getMousePos(this.board, evt);
	}
	
   initializeGrid(){
     this.board = document.querySelector("#board");
     this.board.addEventListener("click", (e) => { if(this.isGameStarted && this.screens.button.disabled)
    	  {this.getCoords(e);}});   
    	const cellWidth = this.board.width / 10
		// Initialize board cells
		for(let i = 0; i < 100; i++){
				cells.push(new Cell(0, 0, 0));
		}
		this.initBoardCells();
   }
    
   initBoardCells(){
		const numOfCols = 10;
		const numOfRows = 10;
		this.cellWidth = Math.round(this.board.width / numOfCols);
		this.cellHeight = Math.round(this.board.height / numOfRows);
		
		const rect = board.getBoundingClientRect();
		const rectHeight = rect.bottom - rect.top;
		const bottomLeftX = rect.left;
		const bottomLeftY = 0;
		
		let cellCenterX = Math.round(bottomLeftX + (this.cellWidth * 0.5));
		const initCenterX = cellCenterX;
		let cellCenterY = Math.round(bottomLeftY + (this.cellHeight * 0.5));
		const initCenterY = cellCenterY;
		for(let row = 0; row < numOfRows; row++){
				for(let col = 0; col < numOfCols; col++){
				    let index = row * numOfCols + col;
						cells[index].index = index;
	        	cells[index].setCenterX = cellCenterX;
		       cells[index].setCenterY = cellCenterY;
						cellCenterX += this.cellWidth;					
				}
				cellCenterY += this.cellHeight;
				cellCenterX = initCenterX;
		}
}

  positionPlayer() {
  		this.container = document.querySelector(".board-container");
  		this.player = document.createElement("img");
  		this.player.classList.add("player");
  		this.player.addEventListener("click", e => {   
  		  if(this.isGameStarted && this.screens.button.disabled) { this.getCoords(e);}
  				this.isButtonPressed = false;});
  		const player = this.player;
  	  this.player.setAttribute("src", "square.png");

// Set size and start position of player 
      this.player.style.width = "5vw";
      this.player.style.height = "5vw";
      this.player.style.position = "relative";
      let shift = 4;
      let index = this.state.index + 1;
      this.player.style.left = `${2.5 * (1 +   ((index) % 10 -1)*shift)}vw`;
      this.container.append(this.player);
 
      const numRows = 10;
      const bottomOffset = 10;
      this.player.style.bottom = `${this.board.height / numRows * 0.5 * (2 * Math.floor(index / 10)+1)  + bottomOffset}px`;
      this.playerSprite = new Player(this.player, this.board);
  }
  
  computeScore(){
    const precisionBonus = this.difficulty === "hard"? 1000000 : 250000;
    const timerBonus = 10000;
  
  if(this.numOfMoves === 0)this.numOfMoves = 1;  
    const precision = Math.round(this.scoreTotal + (precisionBonus * this.numCorrectMoves / this.numOfMoves));
    const playTime = this.currentTime * timerBonus;
    const finalScore = Math.round(precision + playTime);
  console.log(`precisionBonus: ${precisionBonus}, precison: ${precision}, playTime: ${playTime}, final: ${finalScore}`);
  this.state.correct = this.numCorrectMoves;
  this.state.numOfMoves = this.numCorrectMoves;
 this.state.index = this.correctPos; 
 console.log(JSON.stringify(this.state));
 setCookie("gameState", `${this.difficulty},${this.isGameOver},${this.scoreTotal},${this.currentTime},${this.finalPos},${this.numCorrectMoves},${this.numOfMoves}`, 1)
  this.displayResults(precision, playTime, finalScore);
  this.closeScoreScreen(finalScore)  
 }
  
  displayResults(precision, timeScore, finalScore){  
document.querySelector("#score-amount").innerHTML = `${precision}`;  
document.querySelector("#time-bonus").innerHTML = `${timeScore}`
document.querySelector("#final-score").innerHTML = `${finalScore}`;
  }
  
  generateExp(){
  this.screens.button.disabled = true;
//  console.log(`${this.targets.button.disabled}`);
      this.isButtonPressed = true;
      let upper, lower;
      
      if(this.difficulty === "easy"){
    	  	upper = 6;
    	  	lower = -6;
       } else{
    		  upper = 12;
    	  	lower = -12;
       }
       let num1,num2;
       let signOfNum1, signOfNum2;
       let finalPos = 0, playerPos = 0;
    
       do{
         [num1, num2] = this.random(lower, upper);
          finalPos = this.finalPos + num1 + num2;
          console.log(`num1: ${num1}, num: ${num2}, pos = ${finalPos}`);
        }while(finalPos < 0 || finalPos > 99);// end while  
    
        this.correctPos = finalPos;
        signOfNum1 = num1 >= 0 ? "&nbsp": "";
        signOfNum2 = num2 > 0 ? "+":"-";  
        this.targets.expression.innerHTML = `<strong>${signOfNum1}${num1} ${signOfNum2} ${Math.abs(num2)}</strong>`;
  }// end generateExp
   
  update(elapsedTime){
   if(!this.isGameOver)
   this.displayTime(Math.round(elapsedTime, 0));
     //TODO
  }
   
   displayTime(currentTime){
   if(this.currentTime <= 0){
     this.endGame();
     return;
   }
      this.currentTime = this.initTime -  currentTime;
      this.state.time = this.currentTime;
      let timeText = "";
   		if(this.currentTime >= 0 && this.currentTime  < 10){
   				timeText = `TIME: 00${this.currentTime}`;
   		}else if(this.currentTime >= 10 && this.currentTime < 100){
   				timeText = `TIME: 0${this.currentTime}`;
   		}else {timeText = `TIME: ${this.currentTime}`;}
   	  this.targets.time.innerText = timeText;
   }
 
  endGame(){
   this.isGameOver = true;
   this.isGameStarted = false;
   this.isButtonPressed = true;
   this.targets.button.disabled = true;
   this.state.score = this.scoreTotal;
   this.state.gameOver = true;
   this.state.time = this.currentTime;
   // Global game over text object
 this.screens.gameOverText.style.left ="0";
 this.screens.gameOverText.style.zIndex ="10";  
   this.scoreSheet = document.querySelector(".score-sheet");
     this.playerInitials = document.querySelector(".initials")
    this.input = document.querySelector("input").addEventListener("focus", e => {  document.body.style.backgroundColor="#333"  
			this.playerInitials.style.top="1vw"	
})
     setTimeout(()=>{
     				this.screens.gameOverText.style.left  ="300vw";   				
this.screens.scoreBonus.style.left="10vw";
this.screens.scoreBonus.style.zIndex="16";    				
     				this.computeScore();
     }, 2000); 
  }  
  
  closeScoreScreen(score){
   const closeButton = document.querySelector("#close")		
   closeButton.addEventListener("click", e =>{   this.screens.level.style.left = "200vw"		
   	this.screens.scoreBonus.style.left="400vw";
    this.screens.menu.style.top = "0" 
    window.location.reload()   				
})

   this.register = document.querySelector("#register")	
   this.register.addEventListener("click", e => {	 
   console.log("Inside register handler")
   console.log(`Final score: ${score}, Initials: ${this.records.initials[4]}, Score: ${this.records.scores[4]}`)
  document.querySelector("#high_score").value = `${score}`  
  this.scoreSheet.style.left = "400vw"
  this.screens.level.style.left = "200vw"
   this.playerInitials.style.left = "8vw"
 }) // end of register button handler
    const lastScore = parseInt(this.records.scores[4])
   register.disabled = score > lastScore ? false : true
    }// end of closeBurton
}
