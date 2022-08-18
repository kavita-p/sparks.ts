import rollDice from "./rollDice";
import RollResponse from "./response";

const rollForgedDice = (pool: number) => {
  let zD = pool <= 0;
  let dice = rollDice(zD ? 2 : pool, 6);
  let sixes = 0;
  dice.rolls.forEach((roll) => {
    if (roll === 6) sixes++;
  });
  let score = zD ? dice.min : dice.max;
  return { score, rolls: dice.rolls, zD, isCrit: sixes >= 2, sixes };
};

export const actionRoll = (pool: number) => {
  let { score, rolls, zD, isCrit, sixes } = rollForgedDice(pool);
  let response = new RollResponse();

  if (isCrit) {
    response.title = "Critical success!";
    response.description = `Got **${sixes} sixes** on ${pool}d. Your action has **increased effect.**`;
    response.status = "crit";
  } else {
    switch (score) {
      case 6:
        response.title = "Full success";
        response.status = "full";
        break;
      case 5:
      case 4:
        response.title = "Mixed success";
        response.status = "mixed";
        break;
      case 3:
      case 2:
      case 1:
        response.title = "Failure";
        response.status = "fail";
        break;
    }
    response.title += "!";
    response.description += `Got **${score}** on ${pool}d${
      zD ? " (rolled as the lowest of 2d)" : ""
    }.`;
  }

  response.dice = rolls;
  return response;
};

export const fortuneRoll = (pool: number) => {
  let { score, rolls, zD, isCrit, sixes } = rollForgedDice(pool);

  let response = new RollResponse();

  if (isCrit) {
    response.title = "Critical!";
    response.description = `Extreme effect, or 5 ticks on the relevant clock. Got **${sixes} sixes** on ${pool}d.`;
    response.status = "crit";
  } else {
    switch (score) {
      case 6:
        response.title = "Full effect!";
        response.description = "**3 ticks** on the relevant clock.";
        response.status = "full";
        break;
      case 5:
      case 4:
        response.title = "Standard effect.";
        response.description = "**2 ticks** on the relevant clock.";
        response.status = "mixed";
        break;
      case 3:
      case 2:
      case 1:
        response.title = "Reduced effect.";
        response.description = "**1 tick** on the relevant clock.";
        response.status = "fail";
    }
    response.description += ` Got **${score}** on ${pool}d${
      zD ? " (rolled as the lowest of 2d)" : ""
    }.`;
  }

  response.dice = rolls;
  return response;
};

export const resistanceRoll = (pool: number) => {
  let { score, rolls, zD, isCrit, sixes } = rollForgedDice(pool);
  let response = new RollResponse();

  if (isCrit) {
    response.title = "Clear 1 stress!";
    response.description += `Rolled a **critical** to resist. (Got **${sixes}** sixes.)`;
    response.status += "crit";
  } else {
    response.title += `Take **${6 - score}** stress to resist.`;
    response.description += `6 minus your score of **${score}** on **${pool}d**${
      zD ? " (rolled as the lowest of 2d)" : ""
    }.`;
    response.status =
      score === 6 ? "full" : score === 5 || score == 4 ? "mixed" : "fail";
  }

  response.dice = rolls;
  return response;
};

export const clearStress = (pool: number) => {
  let { score, rolls, zD } = rollForgedDice(pool);
  let response = new RollResponse();
  response.title = `Clear **${score}** stress.`;
  response.description = `${
    zD ? "(Rolled as the lowest of 2d.)\n\n" : ""
  }If this is more stress than you currently have, you **overindulge**.`;
  response.status =
    score === 6 ? "full" : score === 5 || score == 4 ? "mixed" : "fail";
  response.dice = rolls;
  return response;
};
