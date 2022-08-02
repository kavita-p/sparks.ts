const rollDice = (count: number, sides: number) => {
  let results = { max: 0, rolls: [], min: 0 };
  for (let i = 0; i < count; i++) {
    results.rolls.push(Math.floor(sides * Math.random() + 1));
  }
  results.max = Math.max(...results.rolls);
  return results;
};

export default rollDice;
