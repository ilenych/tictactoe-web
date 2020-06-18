"use strict";
import { Basic } from "./Basic.js";
import { statusField } from "./Enum.js";

export class BotMove extends Basic {
  constructor(field) {
    super();
    this.field = field;
    this.count = 0;
  }

  move() {
    let coords = super.randomCell();
    // Look for current cell
    let pressedCell = super.getCell(coords, this.field);

    if (pressedCell.status === statusField.empty) {
      document.getElementById(`x${coords.x}y${coords.y}`).innerHTML = "⭕️";

      pressedCell.status = statusField.tac;

      if (super.isWin(this.field)) {
        // Add one point to scoreboard
        const scoore = +document.querySelector(".score_comp__value").innerText;
        document.querySelector(".score_comp__value").innerText = scoore + 1;
        // Add record to history
        const title = document.querySelector(".history").innerText;
        document.querySelector(".history").innerText = "Проиграш\n" + title;
        return false;
      }
      return true;
    } else {
        // Check on draw
      if (this.count < 100) {
        this.count += 1;
        return this.move();
      } else {
          // Turn on click
        document.querySelector(".reset").disabled = false;
        document.querySelector(".newRound").disabled = false;

        // Add record to history
        const title = document.querySelector(".history").innerText;
        document.querySelector(".history").innerText = "Ничья\n" + title;
        return false;
      }
    }
  }
}
