import {
    RollResponse,
    Rolls,
    WildType,
    RollStatus,
    UnreachableCaseError,
  } from "../utils/lib";
  
   export const wildDice = (
     rolls: Rolls,
     rollType: WildType,
   ): RollResponse => {
    return {
      title: `Test`,
      description: `Test.`,
      status: RollStatus.Full,
      dice: rolls.dice,
    };
  };