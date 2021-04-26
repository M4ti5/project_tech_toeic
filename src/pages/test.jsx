import { Component, useState } from "react"
import {Sorter} from '../components/sorter'
export default class  Test extends Component {
  
  constructor(props){
    super(props);
    this.liste
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

  sortByOfficial(keyA, keyB){
    if( keyA.officiel < keyB.officiel){
    	return -1
    }
  	if( keyA.officiel < keyB.officiel){
    	return 1
    }
    this.sortByDate(keyA, keyB)
  }
  getSort(typeOfSort){
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
      
  render(){
    var temp2=[
      {date: "13-04-2021",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "PODVIN",nomClasse: "ING 2 - Longuenesse" ,officiel: false,password: null,prenom: "Aurélien"},
      {date: "21-04-2021",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "CICHARSKI",nomClasse: "ING 1 - Longuenesse",officiel: false,password: null,prenom: "Aurélien"},
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "FORTUNI",nomClasse: "ING 3 - Calais",officiel: false,password: null,prenom: "Aurélien"},
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "PODVIN",nomClasse: "ING 3 - Calais",officiel: false,password: null,prenom: "Aurélien"},
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "FORTUNI",nomClasse: "ING 3 - Dunkerque",officiel: false,password: null,prenom: "Aurélien"},
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "PROMO",nomClasse: "Ancien",officiel: false,password: null,prenom: "Aurélien"},
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "FORTUNI",nomClasse: "ING 1 - Calais",officiel: false,password: null,prenom: "Aurélien"},  
      {date: "20-03-2020",idAnnee: "cknklytlj0014potc66zaxz3c",idClasse: "cknkm2olm0144potcillf6gv0",idProfesseur: "cknkm40fg0374potc0chrdjkq",idToeic: "cknu7d28r0001b8tcgrkweo3r",login: null,nom: "PODVIN",nomClasse: "ING 1 - Dunkerque",officiel: false,password: null,prenom: "Aurélien"}  ]
      

    return(
      <div>
        <h1>Page de Test</h1>
        <h4>{JSON.stringify(temp2.sort(this.getSort("Classe")))}</h4>
      </div>
  )
}
}
