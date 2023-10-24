import { MissionUtils } from "@woowacourse/mission-utils";
import IOManager from "./IOManager.js";
import { ANSWER_LENGTH } from "./constants.js";

class Game {
  constructor() {
    this.ioManager = new IOManager();
    this.answer = this.createRandomNumbers();
    this.isGameEnded = false;
  }

  async play() {
    while (!this.isGameEnded) {
      const userInput = await this.ioManager.getThreeNumberInput();
      const { strike, ball } = this.calculateStrikesAndBalls(
        this.answer,
        userInput
      );
      this.ioManager.printGameStatus(strike, ball);

      if (strike === ANSWER_LENGTH) {
        this.isGameEnded = true;
      }
    }
    this.ioManager.printGameEndMessage();
  }

  createRandomNumbers() {
    const threeRandomInteger = [];

    while (threeRandomInteger.length < ANSWER_LENGTH) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!threeRandomInteger.includes(number)) {
        threeRandomInteger.push(number);
      }
    }

    return threeRandomInteger;
  }

  calculateStrikesAndBalls(answer, userResponse) {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      const userNumber = userResponse.charAt(i) - "0";
      if (userNumber === answer[i]) {
        strike++;
      }
      if (answer.includes(userNumber) && userNumber !== answer[i]) {
        ball++;
      }
    }
    return { strike, ball };
  }
}

export default Game;
