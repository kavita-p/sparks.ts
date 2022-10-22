import { IntegrationExpireBehavior } from "discord.js";
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
  zeroD: boolean,
  cut?: number
): RollResponse => {

    const pool = zeroD ? 0 : rolls.dice.length;
    const score = rolls.max;
    
    const status: RollStatus =
      zeroD ? score > 3
             ? RollStatus.Mixed
             : RollStatus.Failure

        : (() => {
          return score > 5
          ? RollStatus.Full
          : score > 3
          ? RollStatus.Mixed
          : RollStatus.Failure;
        })();
      
    const title = (() => {
      switch (rollType) {
        case WildType.Watch:
          return (() => {
            switch (status) {
              case RollStatus.Full:
                return "Peace";
              case RollStatus.Mixed:
                return "Order";
              case RollStatus.Failure:
                return "Nature";
              default:
                throw new UnreachableCaseError(status);
            }
          })();
        case WildType.Weather:
          return (() => {
            switch (status) {
              case RollStatus.Full:
                return "Clear Skies";
              case RollStatus.Mixed:
                return "Continuation";
              case RollStatus.Failure:
                return "A Change for the Worse";
              default:
                throw new UnreachableCaseError(status);
              }
            })();
        default:
          return (() => {
            switch (status) {
              case RollStatus.Full:
                return "Triumph!";
              case RollStatus.Mixed:
                return "Conflict!";
              case RollStatus.Failure:
                return "Disaster!";
              default:
                throw new UnreachableCaseError(status);
              }
            })();
      ;}
      
    })();

        const description = "test";

  return {
    title,
    description,
    status,
    dice: rolls.dice,
    };

  };