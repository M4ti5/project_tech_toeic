import { Component, useState } from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import ListStudents from "../../components/listStudents"
import FormAddStudent from "../../components/formAddStudent"

import Link from 'next/link'

export default class  vueEleves extends Component {

    constructor(props){
        super(props);
        this.state = {
            liste: [],
            search:""
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
        if( keyA.nomProf < keyB.nomProf){
          return -1
        }
        if( keyA.nomProf > keyB.nomProf){
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
            case "Eleve":
                return this.sortByNom
                break

            case "Classe":   
                return this.sortByClasse
                break
            default:
                return this.sortByNom
                break
        }
      }

      async search(motif){
        this.setState({search:motif})
        this.setState({liste:await fetch( "http://localhost:3000"+'/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())})
        if(motif!=""){ 
            var temp =[]
            var init = this.state.liste
           
            for(var i = 0; i< init.length;i++){
                if(init[i].nom.toLowerCase().includes(motif.toLowerCase()) || init[i].prenom.toLowerCase().includes(motif.toLowerCase()) ||init[i].nomProf.toLowerCase().includes(motif.toLowerCase()) || init[i].prenomProf.toLowerCase().includes(motif.toLowerCase()) || init[i].nomClasse.toLowerCase().includes(motif.toLowerCase())){
                    console.log(init[i].nom)
                    temp.push(init[i])
                }
            }

            this.setState({liste:temp})
        }
        
      }

    async init(){
        this.setState({liste:await fetch( "http://localhost:3000"+'/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())})
    }
    componentDidMount(){
      this.init()
      
  }

    render(){
        
        return (
            <div>
        <Header title="Gestion des Eleves"/>
        <div className="flex flex-nowrap space-x-3 margin w-full justify-center my-10">

            <div className="relative text-gray-600 w-1/2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                </span>
                <input type="search" name="q" class="py-2 text-sm bg-gray-100 rounded-md pl-10 focus:outline-none w-3/4 " placeholder="Rechercher..." autocomplete="off" value={this.state.search}  onChange={e => this.search(e.target.value)}/>
            </div>
            <button className="bg-purple-500 text-white rounded r-6 p-1 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Nom"))}) }>Tri par Nom</button>
            <button className="bg-purple-500 text-white rounded r-6 p-1 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Classe"))}) }>Tri par Classe</button>
            <button className="bg-purple-500 text-white rounded r-6 p-1 hover:bg-purple-700" onClick = {() =>this.setState({liste: this.state.liste.sort(this.getSort("Professeur"))}) }>Tri par Professeur</button>
           
        </div>

        <FormAddStudent />

        <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Liste des Elèves</h2><br></br>
        {   
            this.state.liste.map((e, i) => (
                <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <ListStudents nom={e.nom} prenom={e.prenom} professeur={e.nomProf+" "+e.prenomProf} classe={e.nomClasse} />
                                    </td>
                                    <td>
                                        <Link as= {`/eleves/${e.idEleve}`} href="/eleves/[id]" key={i}>
                                            <button className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                                                Voir
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                ))
        } 
        
    </div>

)
}
}
