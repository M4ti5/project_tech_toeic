import React,  { Component } from 'react'
import { PrismaClient, Prisma } from '@prisma/client'


import Header from '../components/header'
import Sheet  from "../components/sheet"
import Student from '../components/student';
import WarningBox from '../components/warningBox'



export default class ToeicImportation extends Component {

        constructor(props) {
            super(props);
            this.changeDate = this.changeDate.bind(this)
            this.setNotes = this.setNotes.bind(this)
            this.delete = this.delete.bind(this)
            this.state = {
              warning:[],
              dateFileOral:'',
              dateFileEcrit:'',
              date:'',
              notesOral:[],
              notesEcrit:[],
              notes:[]
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
                        temp['Nom']=(this.state.notesOral[i][0])
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

        async sendToeic(e){ // envoie l'entiereter du toeic dans la base de donné
            e.preventDefault();
            var data = this.state.notes
            if(data.length!=0){

                for(var i = 0; i < data.length-1; i++){//
                    var temp = data[i].Nom.split(' ')
                    var Prenom = temp[temp.length-2].toLowerCase()
                    Prenom = Prenom.replace(Prenom.charAt(0),Prenom.charAt(0).toUpperCase())

                    var Nom = data[i].Nom.replace(Prenom,"").toUpperCase()

                    await fetch('http://localhost:3000/api/resultats/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({Nom:Nom, Prenom:Prenom,date:this.state.date,Partie1:data[i].Partie1,Partie2:data[i].Partie2,Partie3:data[i].Partie3,Partie4:data[i].Partie4,Partie5: data[i].Partie5,Partie6:data[i].Partie6,Partie7:data[i].Partie7 })})
                }
                alert('Le Toeic du '+this.state.date+' est envoyé !')
                this.setState({date:'',notes:[]})
            }else{
                alert("Aucune données à été saisie")
            }
        }
        delete(e,key) {
            console.log(key)
            e.preventDefault();
            var temp = []
            for ( let i = 0; i < this.state.notes.length; i++) {
                if(i != key) {
                  temp.push(this.state.notes[i]);
                }
            }
            console.log(temp)
            this.setState({notes: temp})
        }



        render(){

            console.log(this.state.notes)

            return(

                <div className="bg-gray-100">

                    <Header title={"Importation du Toiec "+ this.state.date }/>
                    {this.state.warning}

                    {/*Corps de la page*/}

                    <main className="bg-gray-100 h-screen justify-center ">
                        <div className="flex flex-nowrap justify-center">
                            <Sheet data={{ date:this.state.dateFileOral , changeDate:this.changeDate , notes:this.state.notesOral , setNotes:this.setNotes}} type="Oral"/>
                            <Sheet data={{ date:this.state.dateFileEcrit , changeDate:this.changeDate, notes:this.state.notesOral , setNotes:this.setNotes}} type="Ecrit"/>
                        </div>

                        <div className="container my-6 mx-auto rounded-md bg-gray-700 text-white p-4 ">
                            {console.log(this.state.notes)}
                           {this.state.notes.map((e,k)=>  <Student function={{delete:this.delete}} keys={k} data={e}/>)}

                        </div>

                        <div>
                            <button className=" bg-gray-700 hover:bg-blue-700 text-white font-bold my-10 ml-10 py-2 px-4 rounded round-6 " onClick={(e) => this.sendToeic(e)}>Enregistrer</button>
                        </div>
                    </main>

                </div>
            )
        }
}
