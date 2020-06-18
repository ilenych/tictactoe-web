"use strict";
import { BotMove } from "./BotMove.js";
import { PlayerMove } from "./PlayerMove.js";
import { listener } from "./Enum.js";

export class Game extends PlayerMove {
  constructor(field) {
    super();
    this.field = field;
  }

  start() {
    let field = this.field;
    /**
     * Add or remove event listener
     * @param {String} value - add or remove
     */
    function ManagerEventListener(value) {
      const fieldCell = document.getElementsByClassName("field-cell");

      for (let elem of fieldCell) {
        switch (value) {
          case listener.add:
            elem.addEventListener("click", myMove);
            break;
          case listener.remove:
            elem.removeEventListener("click", myMove);
            break;
        }
      }
    }
    // Add listener
    ManagerEventListener(listener.add);

    function myMove(event) {
      let pm = new PlayerMove(event.target.id, field);
      let answer = pm.move();

      switch (answer) {
        case true:
          ManagerEventListener(listener.remove);
          setTimeout(() => {
            botMove();
          }, 1000);
          break;
        case false:
          ManagerEventListener(listener.remove);
          break;
        default:
          alert("Ячейка уже занята");
      }
    }

    function botMove() {
      let bm = new BotMove(field);
      let anwser = bm.move();

      anwser
        ? ManagerEventListener(listener.add)
        : ManagerEventListener(listener.move);
    }
  }
}
