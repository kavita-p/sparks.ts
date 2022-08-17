import rollDice from "./rollDice";
import RollResponse from "./response";

export const pbtaRoll = (stat: number) => {
  let dice = rollDice(2, 6);
  let score = dice.rolls[0] + dice.rolls[1] + stat;
  let response = new RollResponse();
  if (score >= 12) {
    response.title = "Full success!";
    response.status = "crit";
  } else if (score >= 10) {
    response.title = "Full success!";
    response.status = "full";
  } else if (score >= 7) {
    response.title = "Mixed success!";
    response.status = "mixed";
  } else {
    response.title = "Failure!";
    response.status = "fail";
  }

  response.description = ` Got **${score}** on 2d6${
    stat > 0 ? ` + ${stat}` : stat < 0 ? ` - ${Math.abs(stat)}` : ""
  }.`;
  if (score >= 12) {
    response.description +=
      "\n\nYou also gain any bonuses that trigger on a **12+** for this move, if applicable.";
  }
  response.dice = dice.rolls;
  return response;
};
