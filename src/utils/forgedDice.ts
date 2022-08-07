import rollDice from './rollDice';

const checkCrit = (rolls: number[]) => {
  let sixes = 0;
  rolls.forEach((roll) => {
    if (roll === 6) sixes++;
  });
  return { isCrit: sixes >= 2, sixes };
};

export const actionRoll = (pool: number) => {
  let dice = rollDice(pool, 6);
  let { isCrit, sixes } = checkCrit(dice.rolls);
  let response = { title: '', description: '', dice: '', status: '' };
  if (isCrit) {
    response.title = 'Critical success!';
    response.description = `Got **${sixes} sixes** on ${pool}d. Your action has **increased effect.**`;
    response.status = 'crit';
  } else {
    switch (dice.max) {
      case 6:
        response.title = `Full success`;
        response.status = 'full';
        break;
      case 5:
      case 4:
        response.title = `Mixed success`;
        response.status = 'mixed';
        break;
      case 3:
      case 2:
      case 1:
        response.title = `Failure`;
        response.status = 'fail';
    }
    response.title += '!';
    response.description += `Got **${dice.max}** on ${pool}d.`;
  }
  response.dice = dice.rolls.join(', ');
  return response;
};

export const fortuneRoll = (pool: number) => {
  let dice = rollDice(pool, 6);
  let { isCrit, sixes } = checkCrit(dice.rolls);
  let response = { title: '', description: '', dice: '', status: '' };
  if (isCrit) {
    response.title = 'Critical!';
    response.description = `Extreme effect, or 5 ticks on the relevant clock. Got **${sixes} sixes** on ${pool}d.`;
    response.status = 'crit';
  } else {
    switch (dice.max) {
      case 6:
        response.title = 'Full effect!';
        response.description = `**3 ticks** on the relevant clock.`;
        response.status = 'full';
        break;
      case 5:
      case 4:
        response.title = 'Standard effect.';
        response.description = `**2 ticks** on the relevant clock.`;
        response.status = 'mixed';
        break;
      case 3:
      case 2:
      case 1:
        response.title = 'Reduced effect.';
        response.description = `**1 tick** on the relevant clock.`;
        response.status = 'fail';
    }
    response.description += ` Got **${dice.max}** on ${pool}d.`;
  }
  response.dice = dice.rolls.join(', ');
  return response;
};

export const resistanceRoll = (pool: number) => {
  let dice = rollDice(pool, 6);
  let response = { title: '', description: '', dice: '', status: '' };
  let { isCrit, sixes } = checkCrit(dice.rolls);
  if (isCrit) {
    response.title = 'Clear 1 stress!';
    response.description += `Rolled a **critical** to resist. (Got **${sixes}** sixes.)`;
    response.status += 'crit';
  } else {
    response.title += `Take **${6 - dice.max}** stress to resist.`;
    response.description += `(6 minus your maximum of **${dice.max}**.)`;
    response.dice = dice.rolls.join(', ');
    response.status =
      dice.max === 6
        ? 'full'
        : dice.max === 5 || dice.max == 4
        ? 'mixed'
        : 'fail';
  }
  response.dice = dice.rolls.join(', ');
  return response;
};
