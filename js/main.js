import { statusField } from "./Enum.js";
import { Game } from "./Game.js";

// Add listener on fields
const fields = document.querySelector(".fields");

// Add listener on newRound button
const newRound = document.querySelector(".newRound");
newRound.addEventListener("click", restart);

// Add listener on reset button
const reset = document.querySelector(".reset");
reset.addEventListener("click", resetScoreboard);

// model
let field = {
  cells: [],
  fieldSize: {
    x: 3,
    y: 3,
  },
};

// Run
generateField()
/**
 * Create fields
 */
function generateField() {
  for (let i = 0; i < field.fieldSize.x; i++) {
    let row = document.createElement("div");
    row.classList.add("field-row");
    fields.appendChild(row);
    for (let j = 0; j < field.fieldSize.y; j++) {
      field.cells.push({
        x: i,
        y: j,
        status: statusField.empty,
      });
      let cell = document.createElement("div");
      cell.classList.add("field-cell");
      cell.id = `x${i}y${j}`;
      row.appendChild(cell);
    }
  }
  // Create game
  let game = new Game(field);
  game.start();

  // Turn off click 
  reset.disabled = true;
  newRound.disabled = true;
}

/**
 * Restart game
 */
function restart() {
  // Clear fields
  fields.innerHTML = ''
  // Clear array
  field.cells = []
  // Run to create fields
  generateField()
}

/**
 * Reset scoreboard
 */
function resetScoreboard() {
  document.querySelector(".score_player__value").innerText = 0
  document.querySelector(".score_comp__value").innerText = 0
  document.querySelector(".history").innerText = ''
}
