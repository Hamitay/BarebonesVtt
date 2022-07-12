import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";

export default class DiceRollerService {
  #roller: DiceRoller;
  constructor() {
    this.#roller = new DiceRoller();
  }

  roll(notation: string): DiceRoll | DiceRoll[] {
    // TODO encapsulate in inner package
    return this.#roller.roll(notation);
  }
}
