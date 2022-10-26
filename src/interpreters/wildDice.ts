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
  // TODO: reminder text on 0-dice rolls

    const pool = zeroD ? 0 : rolls.dice.length;

    const doubles: boolean = (() => {
      // a little space/memory-inefficient, but hopefully not a dealbreaker
      if (rolls.dice.length !== new Set(rolls.dice).size) {
        return true;
      }
      return false;
    })();

    if (cut === undefined || cut === null) cut = 0;

    const score = rolls.max;
    
    const status: RollStatus =
      zeroD ? score > 3 // with a pool of 0, roll 1d6, and count triumphs as conflicts
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

      let titleText = `(${rollType}) `;

      switch (rollType) {
        case WildType.Watch:
       //   return (() => {
            switch (status) {
              case RollStatus.Full:
                titleText += `Peace`;
                break;
              case RollStatus.Mixed:
                titleText += `Order`;
                break;
              case RollStatus.Failure:
                titleText += `Nature`;
                break;
              default:
                break;
           }
          break;
        case WildType.Weather:
            switch (status) {
              case RollStatus.Full:
                 titleText += `Clear Skies`;
                 break;
              case RollStatus.Mixed:
                 titleText += `Continuation`;
                 break;
              case RollStatus.Failure:
                 titleText += `A Change for the Worse`;
                 break;
              default:
                  break;
              }
          break;
        default:
            switch (status) {

              case RollStatus.Full:
                 titleText += "Triumph";
                 break;

              case RollStatus.Mixed:
                 titleText += "Conflict"; 
                 break;
                
              case RollStatus.Failure:
               titleText += "Disaster";
               break;

              default:
                break;
              }
          }

            return (doubles && ((rollType !== WildType.Watch) && (rollType !== WildType.Weather))) ? titleText += " with a twist!" : titleText += "!";
      ;})();

    const description =
       (() => {
        let descText = "";

        switch (rollType) {

          case WildType.Action:
            switch (status) {
                case RollStatus.Full:
                  descText += "Complete success, no drawbacks. Mark/clear a box on a track.";
                  break;

                case RollStatus.Mixed:
                  descText += "Success with a drawback. Usually marks/ clears a box.";
                  break;

                case RollStatus.Failure:
                  descText += "Failure and narrative complication or drawback. Usually doesn't mark/clear a box."
                  break;
            }
            break;

          case WildType.Attack:
            switch (status) {
                case RollStatus.Full:
                  descText += "Powerful blow. Deal damage and might inflict an effect.";
                  break;

                case RollStatus.Mixed:
                  descText += "Attack deals damage and maybe associated effect, but you might take some damage, suffer an effect, lose a resource or be put in a less favourable position.";
                  break;

                case RollStatus.Failure:
                  descText += "Attack misses or does no damage. You definitely take some damage or an effect, and might lose a resource or be put in a less favourable position too."
                  break;
            }
            break;
  
          case WildType.Defense:
            switch (status) {
                case RollStatus.Full:
                  descText += "Completely avoid the threat (though some powerful opponents may have aspects that make even a triumph dangerous).";
                  break;

                case RollStatus.Mixed:
                  descText += "Avoid the worst but take damage, an effect, a negative change in position, or destruction (or temporary denial) of a resource.";
                  break;

                case RollStatus.Failure:
                  descText += "Take damage, and likely associated effect and loss of resource or position as well."
                  break;
            }
            break;

          case WildType.Acquisition:
            switch (status) {
                case RollStatus.Full:
                  descText += "Gain a solid untainted resource.";
                  break;

                case RollStatus.Mixed:
                  descText += "Gain a resource with a negative tag.";
                  break;

                case RollStatus.Failure:
                  descText += "Resource not found or ruined during collection."
                  break;
            }
            break;

          case WildType.Creation:
            switch (status) {
                case RollStatus.Full:
                  descText += "Recipient gains temporary benefit related to resources used.";
                  break;

                case RollStatus.Mixed:
                  descText += "Recipient gains temporary 2-track aspect with downsides, or no downside, but it doesn't quite do what was intended.";
                  break;

                case RollStatus.Failure:
                  descText += "Creation might be a bizarre ornament/culinary curiosity, but gives no benefits."
                  break;
            }
            break;

          case WildType.Recovery:
            switch (status) {
                case RollStatus.Full:
                  descText += "Heal two marks of damage to an aspect, ship rating, injury track or mire.";
                  break;

                case RollStatus.Mixed:
                  descText += "Heal one mark of damage to an aspect, ship rating, injury track or mire.";
                  break;

                case RollStatus.Failure:
                  descText += "Add an extra mark of damage to an aspect, ship rating, injury track or mire."
                  break;
            }
            break;

          case WildType.Ratings:
            switch (status) {
                case RollStatus.Full:
                  descText += "Bypass the obstacle safely.";
                  break;

                case RollStatus.Mixed:
                  descText += "Bypass the obstacle but mark 1 Rating damage.";
                  break;

                case RollStatus.Failure:
                  descText += "Fail to bypass the obstacle and mark 1 Rating damage."
                  break;
            }
            break;

          case WildType.Watch:
            switch (status) {
                case RollStatus.Full:
                  descText += "Montage, Meeting, Tall Tale (gain a Whisper), Tree Shanty, Undercrew Issue, Reflection (heal Mire)";
                  break;

                case RollStatus.Mixed:
                  descText += "Nearby Ship, Outpost, Survivor Needing Rescue, Wreck or Ruin, Cache of Cargo/Supplies, Conspiracy";
                  break;

                case RollStatus.Failure:
                  descText += "Weather, Natural Feature, Wonder (heal Mire), Horror, Unsettled Landfall, True Wilds"
                  break;
            }
            break;

            case WildType.Weather:
              switch (status) {
                  case RollStatus.Full:
                    descText += "Weather clears.";
                    break;
  
                  case RollStatus.Mixed:
                    descText += "Weather continues as it is.";
                    break;
  
                  case RollStatus.Failure:
                    descText += "Driving rain/hail (lowers visibility), blazing sunshine (potential heatstroke), living storm or bizarre weather phenomenon."
                    break;
              }
              break;

          default:
            break;

        }

        if (doubles) {
          switch (rollType) {

              case WildType.Attack:
                descText += "\n\n**(Twist... or Critical)**\n Unexpected narrative effect/critical with increased impact."
                break;

              case WildType.Defense:
                descText += "\n\n**(Twist... or Counter)**\n Unexpected narrative effect, or counter with a mark of damage against them (if in range)."  
                break;

              // Watch and Weather-watching rolls don't have twists

              case WildType.Watch:
                break;

              case WildType.Weather:
                break;

              default:
                descText += "\n\n**(Twist)**\nAdds a small, potentially useful twist, suggested by any player. Firefly has final say."
                break;
          }
        }

        if (zeroD) {
          descText += "\n\n**(Zero Dice)**\nYou had nothing in your dice pool! Treat triumphs as conflicts."
        }

        return descText;

        })();     


  return {
    title,
    description,
    status,
    dice: rolls.dice,
    };

  };