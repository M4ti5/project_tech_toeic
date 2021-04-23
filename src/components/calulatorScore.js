
export function scoreTotalToeic(resultats){
    var scoreOral = resultats.scorePart1 + resultats.scorePart2 + resultats.scorePart3 + resultats.scorePart4
    var scoreEcrit = resultats.scorePart5 + resultats.scorePart6 + resultats.scorePart7
    var scoreTotalOral = 0
    var scoreTotalEcrit = 0

    //Calcul scoreOral
    if(0 <= scoreOral && scoreOral <= 6){scoreTotalOral = 5}
    else if(scoreOral >= 7){
      scoreTotalOral = 5
      if(scoreOral >= 90){scoreOral = 90}
      for(var i = 7 ; i <= scoreOral ; i++){
        if(i==26 || i==35 ||i==44 ||i==47 ||i==48 ||i==53 ||i==56 ||i==59 ||i==64 ||i==67 ||i==70 ||i==77 ||i==80 ||i==83){
          scoreTotalOral += 10
        }else{scoreTotalOral += 5}
      }
    }

    //Calcul scoreEcrit
    if(0 <= scoreEcrit && scoreEcrit <= 15){scoreTotalEcrit = 5}
    else if(16 <= scoreEcrit){
      scoreTotalEcrit = 5
      if(scoreEcrit >= 97){scoreEcrit = 97}
      for(var j = 16 ; j <= scoreEcrit ; j++){
        if(j==25 || j==28 ||j==33 ||j==38 ||j==41 ||j==46 ||j==49 ||j==56 ||j==61 ||j==64 ||j==67 ||j==72 ||j==77 ||j==89 ||j==92||j==94){
          scoreTotalEcrit += 10
        }else{scoreTotalEcrit += 5}
      }
    }
    var scoreTotal = scoreTotalOral + scoreTotalEcrit
    return scoreTotal
}