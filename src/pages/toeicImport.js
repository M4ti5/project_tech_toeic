import React,  { Component } from 'react'
import { PrismaClient, Prisma } from '@prisma/client'


import Header from '../components/header'
import Sheet  from "../components/sheet"
import Student from '../components/student';
import WarningBox from '../components/warningBox'
import Selector from "../components/selector"


export default class ToeicImportation extends Component {

        constructor(props) {
            super(props);
            this.changeDate = this.changeDate.bind(this)
            this.setNotes = this.setNotes.bind(this)
            this.loadId = this.loadId.bind(this)
            this.delete = this.delete.bind(this)
            this.state = {
              warning:[],
              dateFileOral:'',
              dateFileEcrit:'',
              date:'',
              notesOral:[],
              notesEcrit:[],
              notes:[],
              idProfesseur:undefined,
              idClasse:undefined,
              toeicOfficiel: false,

            }
        }

        setNotes(typeFile,data){
            switch(typeFile){
                case "Oral" :
                    this.setState({notesOral:data})
                    break
                case "Ecrit" :
                    this.setState({notesEcrit:data})
                    break
            }
            if(this.state.notesOral.length!=0 && this.state.notesEcrit.length!=0){//verification que les notes sont changé
                if(this.state.notesOral[0][0] == this.state.notesEcrit[0][0]){// verification de consepondance des fichiers
                    var localNotes= []
                    for(var i=0;i<this.state.notesOral.length;i++){
                        var temp=[]
                        temp['nom']=(this.state.notesOral[i][0])
                        temp['ScoreOral']=(this.state.notesOral[i][1])
                        temp['ScoreEcrit']=(this.state.notesEcrit[i][1])
                        temp['Partie1']=(this.state.notesOral[i][4])
                        temp['Partie2']=(this.state.notesOral[i][5])
                        temp['Partie3']=(this.state.notesOral[i][6])
                        temp['Partie4']=(this.state.notesOral[i][7])
                        temp['Partie5']=(this.state.notesEcrit[i][4])
                        temp['Partie6']=(this.state.notesEcrit[i][5])
                        temp['Partie7']=(this.state.notesEcrit[i][6])
                        localNotes.push(temp)
                    }
                    this.setState({notes:localNotes})
                }else{
                    console.log("Erreur - Aucune Corespondance entres les fichiers lu")
                }
            }
        }


        changeDate(typeFile , date){
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

        verifyCorrespondence(){
            var oral = this.state.dateFileOral
            var ecrit = this.state.dateFileEcrit

            this.setState({warning:null})

            if(ecrit=='' && oral !=''){
                this.setState({date:oral.substr(6, 2) + "-"+ oral.substr(4, 2) + "-" +oral.substr(0, 4)})
            }else if (oral=='' && ecrit !=''){
                this.setState({date: ecrit.substr(6, 2) + "-"+ ecrit.substr(4, 2) + "-" +ecrit.substr(0, 4)})
            }else if ( oral == ecrit ){
                this.setState({date:oral.substr(6, 2) + "-"+ oral.substr(4, 2) + "-" +oral.substr(0, 4)})
            }else if ( oral != ecrit  ){
                this.setState({warning: <WarningBox message="Vos fichiers n'ont pas la meme date" />});
            }
        }

        loadId(id, typeId){
            switch(typeId){
              case "professeurs":
                this.setState({idProfesseur: id})
                break
              case "classes":
                this.setState({idClasse: id})
            }
          }

        clickToeic(e){
            e.preventDefault();
            switch(this.state.toeicOfficiel){
                case true:
                    document.getElementById("bouttonToeic").classList.add("bg-gray-300")
                    document.getElementById("bouttonToeic").classList.remove("bg-green-500")
                    document.getElementById("bouttonToeic").classList.remove("text-white")
                    this.setState({toeicOfficiel:false})
                    break
                case false:
                    document.getElementById("bouttonToeic").classList.remove("bg-gray-300")
                    document.getElementById("bouttonToeic").classList.add("bg-green-500")
                    document.getElementById("bouttonToeic").classList.add("text-white")
                    this.setState({toeicOfficiel:true})
                    break
            }
        }

        async sendToeic(e){ // envoie l'entiereter du toeic dans la base de donné
            e.preventDefault();

            var data = this.state.notes
            if(data.length!=0){

                for(var i = 0; i < data.length-1; i++){//
                    var temp = data[i].nom.split(' ')
                    var prenom = temp[temp.length-2].toLowerCase()
                    prenom = prenom.replace(prenom.charAt(0),prenom.charAt(0).toUpperCase())
                    
                    var nom = data[i].nom.replace(prenom,"").toUpperCase()
                    console.log("idProfesseur :"+this.state.idProfesseur+" | idClasse :"+this.state.idClasse)
                    await fetch('http://localhost:3000/api/resultats/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:nom, prenom:prenom,date:this.state.date,idProfesseur:this.state.idProfesseur,idClasse:this.state.idClasse,officiel:this.state.toeicOfficiel,Partie1:data[i].Partie1,Partie2:data[i].Partie2,Partie3:data[i].Partie3,Partie4:data[i].Partie4,Partie5: data[i].Partie5,Partie6:data[i].Partie6,Partie7:data[i].Partie7 })})
                }
                alert('Le Toeic du '+this.state.date+' est envoyé !')
                //this.setState({date:'',notes:[]})
                document.location.reload()
            }else{
                alert("Aucune données à été saisie")
                
            }

        }
        delete(e,key) {
            //console.log(key + " " + this.state.notes.length)
            e.preventDefault();
            var temp = []
            for ( let i = 0; i < this.state.notes.length; i++) {
                if(i != key) {
                  temp.push(this.state.notes[i]);
                }
            }
            this.setState({notes: temp})
            this.render()
        }



        render(){
            {console.log(this.state.notes)}
            //console.log(this.state.idProfesseur!="" ? this.state.idProfesseur :"")
            //console.log(this.state.idClasse!="" ? this.state.idClasse :"")
            //console.log(this.state.toeicOfficiel)

            return(
                
                <div className=" relative bg-gray-100 h-full min-h-screen  flex flex-col">

                    <Header title={"Importation du Toiec "+ this.state.date }/>
                    {this.state.warning}

                    {/*Corps de la page*/}
                
                    <main className=" relative bg-gray-100 h-full min-h-screen justify-center ">
                        <div className="flex flex-nowrap justify-center mb-10">
                            <Sheet data={{ date:this.state.dateFileOral , changeDate:this.changeDate , notes:this.state.notesOral , setNotes:this.setNotes}} type="Oral"/>
                            <Sheet data={{ date:this.state.dateFileEcrit , changeDate:this.changeDate, notes:this.state.notesOral , setNotes:this.setNotes}} type="Ecrit"/>
                        </div>
                        <div className="relative my-6 " >
                            <div className="relative inset-x-0 top-0 mx-2 rounded-md bg-gray-700 text-white my-3 ">
                                <br/>
                                {this.state.notes.map((e,k)=>  <Student function={{delete:this.delete}} keys={k} data={e}/>)}

                            </div>
                        </div>
                        

                        <div className="relative flex flex-rows justify-center" >
                            <button id="bouttonToeic"className="transition duration-150 ease-in-out bg-gray-300  hover:bg-green-500 hover:text-white text-grey-300  my-10 mx-10 py-2 px-4 rounded round-6 text-lg" onClick={(e) => this.clickToeic(e)}>Toeic Officiel</button>
                            <Selector  data={{loadId: this.loadId , id:this.state.idProfesseur , type:"professeurs"}}/>
                            <Selector  data={{loadId: this.loadId , id:this.state.idClasse , type:"classes"}}/>
                            <button className=" transition duration-150 ease-in-out bg-gray-700 hover:bg-blue-400 text-white font-bold my-10 ml-10 py-2 px-4 rounded round-6 " onClick={(e) => this.sendToeic(e)}>Enregistrer</button>
                        </div>
                    </main>
                    <footer className="bg-gray-800  mt-36  h-12 w-full"></footer>
                </div >
            )
        }
}
