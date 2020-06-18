"use strict";
import { Basic } from "./Basic.js";
import { statusField } from "./Enum.js";

export class PlayerMove extends Basic {
  constructor(id, field) {
    super();
    this.id = id;
    this.field = field;
  }

  move() {
    // Get coords
    let coords = this.id.match(/x\d{1,}|y\d{1,}/g);

    // Create coord [Int, int]
    coords = coords.map((item) => +item.slice(1));
    let pressedCell = super.getCell(coords, this.field);

    if (pressedCell.status === statusField.empty) {
      document.getElementById(`x${coords[0]}y${coords[1]}`).innerHTML = "❌";

      pressedCell.status = statusField.cross;

      if (super.isWin(this.field)) {
        // Add one point to scoreboard
        const scoore = +document.querySelector(".score_player__value")
          .innerText;
        document.querySelector(".score_player__value").innerText = scoore + 1;
        
        // Add record to history
        const title = document.querySelector(".history").innerText;
        document.querySelector(".history").innerText = "Победа\n" + title;
        return false;
      }

      return true;
    }
  }
}
