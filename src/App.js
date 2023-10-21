import { MissionUtils, Console } from "@woowacourse/mission-utils";
class App {
  async play() {
    Console.print("숫자 야구 게임을 시작합니다.");

    let isGameEnded = false;

    while (!isGameEnded) {
      const answer = this.createThreeRandomNumbers();

      console.log(answer); // debug용 로그
      while (true) {
        const userResponse = await this.promptUserForNumbers();

        const { strike, ball } = this.compareNumbers(answer, userResponse);

        this.displayGameStatus(strike, ball);

        if (strike === 3) {
          Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
          break;
        }
      }

      isGameEnded = await this.promptNewGameOrExit();
    }
  }

  createThreeRandomNumbers() {
    const threeRandomInteger = [];

    while (threeRandomInteger.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!threeRandomInteger.includes(number)) {
        threeRandomInteger.push(number);
      }
    }

    return threeRandomInteger;
  }

  compareNumbers(answer, userResponse) {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (userResponse.charAt(i) - "0" === answer[i]) {
        strike++;
      } else if (answer.includes(userResponse.charAt(i) - "0")) {
        ball++;
      }
    }
    return { strike, ball };
  }

  displayGameStatus(strike, ball) {
    let message = "";

    if (ball !== 0) {
      message += `${ball}볼 `;
    }

    if (strike !== 0) {
      message += `${strike}스트라이크`;
    }

    if (!message) {
      message = "낫싱";
    }

    Console.print(message.trim());
  }

  async promptUserForNumbers() {
    let userResponse = await Console.readLineAsync("숫자를 입력해주세요: ");
    userResponse = userResponse.trim();

    if (userResponse.length !== 3) {
      throw new Error("[ERROR]");
    }

    if (new Set(userResponse).size !== 3) {
      throw new Error("[ERROR]");
    }

    if (isNaN(userResponse)) {
      throw new Error("[ERROR]");
    }

    return userResponse;
  }

  async promptNewGameOrExit() {
    let userResponse = await Console.readLineAsync(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n"
    );
    userResponse = userResponse.trim();

    if (userResponse.length !== 1) {
      throw new Error("[ERROR]");
    }

    if (isNaN(userResponse)) {
      throw new Error("[ERROR]");
    }

    if (userResponse === "1") {
      return false;
    }

    if (userResponse === "2") {
      Console.print("게임을 종료합니다.");
      return true;
    }

    return false;
  }
}

export default App;
