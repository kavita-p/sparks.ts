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


  // TODO: cut

    const pool = zeroD ? 0 : rolls.dice.length;

    const doubles: boolean = (() => {

      if (rolls.dice.length !== new Set(rolls.dice).size) {
        return true;
      }
      return false;
    })();


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
                return `(${rollType}) Peace`;
              case RollStatus.Mixed:
                return `(${rollType}) Order`;
              case RollStatus.Failure:
                return `(${rollType}) Nature`;
              default:
                throw new UnreachableCaseError(status);
            }
          })();
        case WildType.Weather:
          return (() => {
            switch (status) {
              case RollStatus.Full:
                return `(${rollType}) Clear Skies`;
              case RollStatus.Mixed:
                return `(${rollType}) Continuation`;
              case RollStatus.Failure:
                return `(${rollType}) A Change for the Worse`;
              default:
                throw new UnreachableCaseError(status);
              }
            })();
        default:
          return (() => {
            switch (status) {

              case RollStatus.Full:
                return `(${rollType}) Triumph${
                  doubles ? " with a twist" : ""
                }!`;

              case RollStatus.Mixed:
                return `(${rollType}) Conflict${
                  doubles ? " with a twist" : ""
                }!`; 
                
              case RollStatus.Failure:
                return `(${rollType}) Disaster${
                  doubles ? " with a twist" : ""
                }!`;

                default:
                throw new UnreachableCaseError(status);
              }
            })();
 
      ;}

    })();

    const description =
       (() => {

          switch (rollType) {

            case WildType.Action:
              return (() => {
              switch (status) {
                case RollStatus.Full:
                  return `Complete success, no drawbacks. Mark/clear a box on a track.${
                    doubles ? " (Twist) Adds a small, potentially useful twist, suggested by any player. Firefly has final say." : ""
                  }`;
                case RollStatus.Mixed:
                  return `Success with a drawback. Usually marks/ clears a box.${
                    doubles ? " (Twist) Adds a small, potentially useful twist, suggested by any player. Firefly has final say." : ""
                  }`;
                case RollStatus.Failure:
                  return `Failure and narrative complication or drawback. Usually doesn't mark/clear a box.${
                    doubles ? " (Twist) Adds a small, potentially useful twist, suggested by any player. Firefly has final say." : ""
                  }`;
                default:
                  throw new UnreachableCaseError(status)}
              })(); 
              
            case WildType.Attack:
              return (() => {
                switch (status) {
                  case RollStatus.Full:
                    return `Powerful blow. Deal damage and might inflict an effect.${
                      doubles ? " (Twist... or Critical) Unexpected narrative effect/critical with increased impact." : ""
                    }`;
                  case RollStatus.Mixed:
                    return `Attack deals damage and maybe associated effect, but you might take some damage, suffer an effect, lose a resource or be put in a less favourable position.${
                      doubles ? " (Twist... or Critical) Unexpected narrative effect/critical with increased impact." : ""
                    }`;
                  case RollStatus.Failure:
                    return `Failure and narrative complication or drawback. Usually doesn't mark/clear a box.${
                      doubles ? " (Twist... or Critical) Unexpected narrative effect/critical with increased impact." : ""
                    }`;
                  default:
                    throw new UnreachableCaseError(status)}
                })();

            case WildType.Defense:
              return (() => {
                switch (status) {
                  case RollStatus.Full:
                    return `Completely avoid the threat (though some powerful opponents may have aspects that make even a triumph dangerous).${
                      doubles ? " (Twist...or Counter) Unexpected narrative effect, or counter with a mark of damage against them (if in range)." : ""
                    }`;
                  case RollStatus.Mixed:
                    return `Avoid the worst but take damage, an effect, a negative change in position, or destruction (or temporary denial) of a resource.${
                      doubles ? " (Twist...or Counter) Unexpected narrative effect, or counter with a mark of damage against them (if in range)." : ""
                    }`;
                  case RollStatus.Failure:
                    return `Take damage, and likely associated effect and loss of resource or position as well.${
                      doubles ? " (Twist...or Counter) Unexpected narrative effect, or counter with a mark of damage against them (if in range)." : ""
                    }`;
                  default:
                    throw new UnreachableCaseError(status)}
                  })();

            case WildType.Resource:
              return (() => {
                switch (status) {
                  case RollStatus.Full:
                    return `Gain a solid untainted resource.${
                      doubles ? " (Twist) Gain a resource with a unique or positive tag suggested by you or another player." : ""
                    }`;
                  case RollStatus.Mixed:
                    return `Gain a resource with a negative tag.${
                      doubles ? " (Twist) Gain a resource with a unique or positive tag suggested by you or another player." : ""
                    }`;
                  case RollStatus.Failure:
                    return `Resource not found or ruined during collection.${
                      doubles ? " (Twist) Gain a resource with a unique or positive tag suggested by you or another player." : ""
                    }`;
                  default:
                    throw new UnreachableCaseError(status)}
                  })();

              case WildType.Creation:
                return (() => {
                  switch (status) {
                    case RollStatus.Full:
                      return `Recipient gains temporary benefit related to resources used.${
                        doubles ? " (Twist) Creation has small, unexpected benefit in addition to the usual result." : ""
                      }`;
                    case RollStatus.Mixed:
                      return `Recipient gains temporary 2-track aspect with downsides, or no downside, but it doesn't quite do what was intended.${
                        doubles ? " (Twist) Creation has small, unexpected benefit in addition to the usual result." : ""
                      }`;
                    case RollStatus.Failure:
                      return `Creation might be a bizarre ornament/culinary curiosity, but gives no benefits.${
                        doubles ? " (Twist) Creation has small, unexpected benefit in addition to the usual result." : ""
                      }`;
                    default:
                      throw new UnreachableCaseError(status)}
                    })();

              case WildType.Recovery:
                return (() => {
                  switch (status) {
                    case RollStatus.Full:
                      return `Heal two marks of damage to an aspect, ship rating, injury track or mire.${
                        doubles ? " (Twist) You don’t consume the resource used to carry out your recovery." : ""
                      }`;
                    case RollStatus.Mixed:
                      return `Heal one mark of damage to an aspect, ship rating, injury track or mire.${
                        doubles ? " (Twist) You don’t consume the resource used to carry out your recovery." : ""
                      }`;
                    case RollStatus.Failure:
                      return `Add an extra mark of damage to an aspect, ship rating, injury track or mire.${
                        doubles ? " (Twist) You don’t consume the resource used to carry out your recovery." : ""
                      }`;
                    default:
                      throw new UnreachableCaseError(status)}
                    })();

                case WildType.Ratings:
                  return (() => {
                    switch (status) {
                      case RollStatus.Full:
                        return `Bypass the obstacle safely.${
                          doubles ? " (Twist) An unexpected event in addition to the result." : ""
                        }`;
                      case RollStatus.Mixed:
                        return `Bypass the obstacle but mark 1 Rating damage.${
                          doubles ? " (Twist) An unexpected event in addition to the result." : ""
                        }`;
                      case RollStatus.Failure:
                        return `Fail to bypass the obstacle and mark 1 Rating damage.${
                          doubles ? " (Twist) An unexpected event in addition to the result." : ""
                        }`;
                      default:
                        throw new UnreachableCaseError(status)}
                      })();

                // Watch and Weather-Watching don't have twist results

                case WildType.Watch:
                  return (() => {
                    switch (status) {
                      case RollStatus.Full:
                        return `Montage, Meeting, Tall Tale (gain a Whisper), Tree Shanty, Undercrew Issue, Reflection (heal Mire)`;
                      case RollStatus.Mixed:
                        return `Nearby Ship, Outpost, Survivor Needing Rescue, Wreck or Ruin, Cache of Cargo/Supplies, Conspiracy`;
                      case RollStatus.Failure:
                        return `Weather, Natural Feature, Wonder (heal Mire), Horror, Unsettled Landfall, True Wilds`;
                      default:
                        throw new UnreachableCaseError(status)}
                      })();

                case WildType.Weather:
                  return (() => {
                    switch (status) {
                      case RollStatus.Full:
                        return `Weather clears.`;
                      case RollStatus.Mixed:
                        return `Weather continues as it is.`;
                      case RollStatus.Failure:
                        return `Driving rain/hail (lowers visibility), blazing sunshine (potential heathstroke), living storm or bizarre weather phenomenon.`;
                      default:
                        throw new UnreachableCaseError(status)}
                      })();


              default:
                throw new UnreachableCaseError(rollType)}
        })();     


  return {
    title,
    description,
    status,
    dice: rolls.dice,
    };

  };