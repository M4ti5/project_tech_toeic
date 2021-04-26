import { Component} from 'react'

import Header from '../../components/header'
import Link from 'next/link'

export default class VueEleves extends Component{

    constructor(props){
        super(props);
        this.state = {
            liste: [],
            date: ""
        }
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
  

    getSort(typeOfSort){
      switch(typeOfSort){
          case "Professeur":
              return this.sortByProfesseur
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
    async init(){
        this.setState({liste :await fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())})
    }
    componentDidMount(){
        this.init()
    }

    async supprimerToeic(e, idToeic){
        console.log(idToeic)
        await fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE',body:JSON.stringify({idToeic: idToeic})})
        window.location.reload();
    }
    
    modifierDate(e, idToeic){
        e.preventDefault();
        var temp = document.getElementById("input_Date"+idToeic)
        temp.disabled=false;
        document.getElementById('buttonModifDate'+idToeic).classList.replace("visible","hidden")
        document.getElementById('buttonRegisterDate'+idToeic).classList.replace("hidden","visible")
    }
    
    async enregistrerDate(e, idToeic, date){
        e.preventDefault();
        await fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'PUT',body:JSON.stringify({idToeic: idToeic, date: date})})
        document.getElementById('buttonModifDate'+idToeic).classList.replace("hidden","visible")
        document.getElementById('buttonRegisterDate'+idToeic).classList.replace("visible","hidden")
    }

    render(){
        return (
            <div>
        <Header title="Listes des Toeics"/>
        <div className="flex flex-nowrap space-x-3 margin w-full justify-center mb-10">

            <button className="bg-purple-500 text-white rounded r-6 p-2 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Date"))}) }>Tri par Date</button>
            <button className="bg-purple-500 text-white rounded r-6 p-2 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Classe"))}) }>Tri par Classe</button>
            <button className="bg-purple-500 text-white rounded r-6 p-2 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Professeur"))}) }>Tri par Professeur</button>
            <button className="bg-purple-500 text-white rounded r-6 p-2 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Officiel"))}) }>Tri par Officiel</button>
        </div>
        {       
                this.state.liste.map((t, i) => (
                    <div>
                        <table>
                            
                            <td className="w-80 px-6 py-4 whitespace-nowrap">
                                <span className="text-center ml-2 font-semibold">{t.date}</span>
                                <span className="text-center ml-2 font-semibold">{t.nom +" "+ t.prenom}</span>
                                <span className="text-center ml-2 font-semibold">{t.nomClasse}</span>
                                <span className={"text-center ml-2 "+ (t.officiel == true ? "text-green-500" : "text-red-500") +" font-semibold"}>{(t.officiel == true ? "officiel" : "non officiel")}</span>
                                <form name="part1" className="w-13">
                                    <input id={"input_Date"+t.idToeic} type="text" value={this.state.date} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({date: e.target.value})} disabled="true" />
                                </form>
                            </td>
                            <td className="w-80 px-6 py-4 whitespace-nowrap">
                                <Link as= {`/toeics/${t.idToeic}`} href="/toeics/[id]" key={i}>
                                    <button className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                                        Voir
                                    </button>
                                </Link>
                                <input id ={"buttonModifDate"+t.idToeic} className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black visible" type="button" value="Modifier Date" onClick={(e) => this.modifierDate(e,t.idToeic)} /><br />
                                <input id ={"buttonRegisterDate"+t.idToeic} className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black hidden" type="button" value="Enregistrer Date" onClick={(e) => this.enregistrerDate(e, t.idToeic, this.state.date)}/>
                                <button className="bg-red-600 text-white px-4 py-2 border rounded-md hover:bg-red hover:border-indigo-500 hover:text-black " onClick={e=> supprimerToeic(e,t.idToeic)}>
                                    Supprimer
                                </button>
                            </td>
                        </table>
                    </div>
                ))
        } 
        
    </div>
    )
}
}