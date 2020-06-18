"use strict";
import { statusField } from "./Enum.js";
export class Basic {
  /**
   * Return link on cell with given coord
   * @param {Object} coords - {x: Int, y: Int}
   * @param {Object} field - model
   */
  getCell(coords, field) {
    let cell;
    if (Array.isArray(coords)) {
      cell = field.cells.filter((item) => {
        return item.x == coords[0] && item.y == coords[1];
      });
    } else {
      cell = field.cells.filter((item) => {
        return item.x == coords.x && item.y == coords.y;
      });
    }

    if (cell.length != 0) {
      return cell[0];
    } else {
      return false;
    }
  }
  /**
   * Return random coordinates cell on fields based on position
   */
  randomCell() {
    return {
      x: this.randomInteger(0, 3),
      y: this.randomInteger(0, 3),
    };
  }
  /**
   * Return random number from min to max
   * @param {Number} min
   * @param {Number} max
   */
  randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }

  /**
   * Check on win
   * @param {Object} field - model
   */
  isWin(field) {
    const win = [
      [0, 1, 2], // on first row
      [3, 4, 5], // on second row
      [6, 7, 8], // on third row
      [0, 3, 6], // on first column
      [1, 4, 7], // on second column
      [2, 5, 8], // on third column
      [0, 4, 8], // on fisrt diagonal
      [2, 4, 6], // on second deagonal
    ];
    for (let values of win) {
      if (
        field.cells[values[0]].status == field.cells[values[1]].status &&
        field.cells[values[0]].status == field.cells[values[2]].status &&
        field.cells[values[0]].status != statusField.empty
      ) {
        this.setColor(field, values);
        this.enableButtons();
        return true;
      }
    }
    return false;
  }

  /**
   * Set color on cell after win
   * @param {Object} field - model
   * @param {Array} values - [Int, Int, Int]
   */
  setColor(field, values) {
    for (let i = 0; i < 3; i++) {
      document
        .getElementById(
          `x${field.cells[values[i]].x}y${field.cells[values[i]].y}`
        )
        .classList.add("win");
    }
  }
  /**
   * enable buttons after win
   */
  enableButtons() {
    document.querySelector(".reset").disabled = false;
    document.querySelector(".newRound").disabled = false;
  }
}
