import Student from "../components/student.js"

changeScorePartie(typeFile , date){
    switch(typeFile){
        case "Oral" :
            this.setState({dateFileOral:date})
            break
        case "Ecrit" :
            this.setState({dateFileEcrit:date})
            break
    }
    this.verifyCorrespondence()
}


export default function test() {
  var data = [{Nom: "AZAF Meriem ", ScoreOral: "83", ScoreEcrit: "83", Partie1: "5", Partie2: "20", Partie3: "35", Partie4: "23", Partie5: "27", Partie6: "15", Partie7: "41"}],
  [{Nom: "GODARD Agnelo ", ScoreOral: "82", ScoreEcrit: "84", Partie1: "4", Partie2: "18", Partie3: "35", Partie4: "23", Partie5: "27", Partie6: "15", Partie7: "41"}]

  return (
    <Student />
  )
}
