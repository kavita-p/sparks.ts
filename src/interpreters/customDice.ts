import { RollResponse, Rolls, RollStatus } from "../utils/lib";

export const customRoll = (
  rolls: Rolls,
  count: number,
  sides: number
): RollResponse => {
  return {
    title: `${rolls.max}`,
    description: `Rolled ${count}d${sides} (max: ${rolls.max}, min: ${rolls.min}).`,
    status: RollStatus.Full,
    dice: rolls.dice,
  };
};
