import React from 'react'
import { Component } from 'react'
import Header from '../../components/header'
import {scoreTotalToeic} from '../../components/calulatorScore'
import ListStudents from '../../components/listStudents'
import WarningBox from '../../components/warningBox'


export default class Passage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        resultats:[],
        passants:[],
        redoublant:[],
        full_redoublant:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }
  

    async init(){
      var temp = await fetch( "http://localhost:3000"+'/api/annee_classes/passage', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
      this.setState({resultats:temp})
      this.evaluation(temp)
    }

    


    async evaluation(resultats){
        var tempPassants = []
        var tempRedoublants = []
        var tempFullRedoublants = []
        var element={idEleve:null , Score:0} //idEleves   

        for(var i=0 ; i < resultats.length ; i++){
            if(element.idEleve == null){ // initialisation 
                element.idEleve = resultats[i].idEleve
                element.Score =  scoreTotalToeic(resultats[i])
                
            }else if(element.idEleve != resultats[i].idEleve ){// prochaine eleves
                element.idEleve = resultats[i].idEleve
                element.Score =  scoreTotalToeic(resultats[i])
            }
            
            if(element.Score >= resultats[i].valeurBarre && !tempPassants.includes(element.idEleve)){// ajout des eleves passants
                tempPassants.push(element.idEleve)
            } 
        }

        for(var i=0 ; i < resultats.length ; i++){
            if(!tempPassants.includes(resultats[i].idEleve) && !tempRedoublants.includes(resultats[i].idEleve)){
                tempRedoublants.push(resultats[i].idEleve)
            }
        }

        for(var i=0 ; i < tempRedoublants.length ; i++){
            tempFullRedoublants = tempFullRedoublants.concat(await fetch( "http://localhost:3000"+'/api/eleves/'+tempRedoublants[i], {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json()))
        }

        this.setState({passants:tempPassants, redoublant: tempRedoublants , full_redoublant : tempFullRedoublants})
        console.log(this.state.passants, this.state.redoublant,this.state.full_redoublant )
    }

    componentDidMount(){
        this.init()
        
        
    }

    async Passage(idEleve, index){
        
        var eleve  =  await fetch( "http://localhost:3000"+'/api/eleves/'+idEleve, {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        
        if(eleve[0].nomClasse.includes("1")){
            eleve[0].nomClasse = eleve[0].nomClasse.replace("1", "2")
        }else if(eleve[0].nomClasse.includes("2")){
            eleve[0].nomClasse = eleve[0].nomClasse.replace("2", "3")
        }else if(eleve[0].nomClasse.includes("3")){
            eleve[0].nomClasse = "Ancien"
        }else{
            console.log("L'élèves reste dans la meme classe")
        }
        
        var newClasse  = await fetch( "http://localhost:3000"+'/api/classes/'+eleve[0].nomClasse, {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        await fetch( "http://localhost:3000"+'/api/annee_classes/passage', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'PUT',body:JSON.stringify({idClasse:newClasse[0].idClasse, idEleve:eleve[0].idEleve})})
        
        if(index != null){
            document.getElementById("redoublant_"+index).classList.add("hidden")
            alert("L'élève "+eleve[0].prenom+" "+eleve[0].nom+"passe en " + eleve[0].nomClasse)
        }
    }

    async handleSubmit(event) {
        event.preventDefault()
        var temp = this.state.passants
        if(confirm("Etes vous sûr cette étape n'est pas réversible")){
            document.getElementById("Bouton_globale").classList.add("hidden")// evite deux passage sucessif
        
            for(var i =0 ; i < temp.length ; i++){
                
                this.Passage(temp[i], null)  
            }

            if(this.state.redoublant.length > 0 ){
                document.getElementById("div_redoublant").classList.remove("hidden")
            }else{
                alert("Changement de classe effectué")
            }

        }

        
      } 
    render() {
        
      return (
        <div>
            <Header title="Passage d'année"/>
            <form id="Bouton_globale" onSubmit={this.handleSubmit}>
                <input className="bg-purple-500 hover:bg-gray-300 text-white px-4 py-2  ml-5 rounded-sm" type="submit" value="Effectuer un Passage Globale" />
            </form>
            <div id="div_redoublant" className="hidden">
                <WarningBox message="Les élèves ayant validé ont leur nouvelle classe, cependant que faisons-nous de ces élèves..."/>
            {this.state.full_redoublant.map((e, i) => (
                <div id={"redoublant_"+i} className="flex flex-nowrap">
                    <ListStudents nom={e.nom} prenom={e.prenom} classe={e.nomClasse} />
                    <div>
                        <button className="bg-purple-500 text-white px-4 py-2 border rounded-sm hover:bg-white hover:border-indigo-500 hover:text-black " onClick = {() => this.Passage(e.idEleve , i)}> Forcer le passage</button>
                    </div>
                 
                </div>
                ))
        } 
            </div>
        </div>
      )}
  }