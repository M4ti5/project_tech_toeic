
export class Sorter{
   
    constructor(data){
        this.liste = data
    }

    sortByNom(keyA, keyB) {
      if( keyA.nom < keyB.nom){
        return -1
      }
      if( keyA.nom > keyB.nom){
        return 1
      }
      
        return 0
    }
    sortByProfesseur(keyA, keyB) {
      if( keyA.nom < keyB.nom){
        return -1
      }
      if( keyA.nom > keyB.nom){
        return 1
      }
      if(keyA.nomClasse != "PROMO" && keyB.nomClasse == "PROMO"){
        return -1
      }
      if(keyA.nomClasse == "PROMO" && keyB.nomClasse != "PROMO"){
        return 1
      }
      if(keyA.nomClasse == "PROMO" && keyB.nomClasse == "PROMO"){
        return 0
      }
        return 0
    }
  
    sortByDate(keyA, keyB) {
      console.log("test")
      //Par Année
      if( keyA.date.substr(6,4) < keyB.date.substr(6,4)){
        return 1
      }
      if( keyA.date.substr(6,4) > keyB.date.substr(6,4)){
        return -1
      }
      // Par Moi
      if( keyA.date.substr(3,2) < keyB.date.substr(3,2)){
        return 1
      }
      if( keyA.date.substr(3,2) > keyB.date.substr(3,2)){
        return -1
      }
      //Par Jour
      if( keyA.date.substr(0,2) < keyB.date.substr(0,2)){
        return 1
      }
      if( keyA.date.substr(0,2) > keyB.date.substr(0,2)){
        return -1
      }
      return 0
    }
  
    sortByClasse(keyA, keyB) {//Nom classe
      //Filtre des Anciens
      if(keyA.nomClasse != "Ancien" && keyB.nomClasse == "Ancien"){
        return 1
      }
      if(keyA.nomClasse == "Ancien" && keyB.nomClasse != "Ancien"){
        return -1
      }
      if(keyA.nomClasse == "Ancien" && keyB.nomClasse == "Ancien"){
        return 0
      }
      //Filtre de l'anné de la classe
      if( keyA.nomClasse.substr(4,1) < keyB.nomClasse.substr(4,1)){
        return 1
      }
      if( keyA.nomClasse.substr(4,1) > keyB.nomClasse.substr(4,1)){
        return -1
      }
  
      //Filte de Site : Calais
      if(keyA.nomClasse.substr(8) != "Calais" && keyB.nomClasse.substr(8) == "Calais"){
        return 1
      }
      if(keyA.nomClasse.substr(8) == "Calais" && keyB.nomClasse.substr(8) != "Calais"){
        return -1
      }
      if(keyA.nomClasse.substr(8) == "Calais" && keyB.nomClasse.substr(8) == "Calais"){
        return 0
      }
      //Filte de Site : Longuenesse & Dunkerque
      if(keyA.nomClasse.substr(8) == "Dunkerque" && keyB.nomClasse.substr(8) == "Longuenesse"){
        return 1
      }
      if(keyA.nomClasse.substr(8) == "Longuenesse" && keyB.nomClasse.substr(8) != "Dunkerque"){
        return -1
      }
      if(keyA.nomClasse.substr(8) == "Longuenesse" && keyB.nomClasse.substr(8) == "Longuenesse"){
        return 0
      }
      if(keyA.nomClasse.substr(8) == "Dunkerque" && keyB.nomClasse.substr(8) == "Dunkerque"){
        return 0
      }
    
     
    }
  

    static getSort(typeOfSort){
      switch(typeOfSort){
          case "Professeur":
              return this.sortByProfesseur
              break
          case "Eleve":
              return this.sortByNom
              break
          case "Date":
              
              return this.sortByDate
              break
          case "Officiel":
              return this.sortByOfficial
              break
          case "Classe":
              
              return this.sortByClasse
              break
          default:
              return this.sortByNom
              break
      }
    }

}
