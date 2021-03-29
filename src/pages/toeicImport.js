import React,  { Component } from 'react'
import Header from '../components/header'
import Sheet  from "../components/sheet" 
import WarningBox from '../components/warningBox'

export default class ToeicImportation extends Component {
    
        constructor(props) {
            super(props);
            this.changeDate = this.changeDate.bind(this)
            this.state = {
              warning:[],
              dateFileOral:'',
              dateFileEcrit:'',
              date:''
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

        sendToeic(){
            alert('send !');
        }
    
    
    
        render(){
            return(

                <div className="bg-gray-100">

                    <Header title={"Importation du Toiec "+ this.state.date }/>
                    {this.state.warning}
                    
                    {/*Corps de la page*/}
                
                    <main className="bg-gray-100 h-screen">
                      <Sheet data={{ date:this.state.dateFileOral , changeDate:this.changeDate }} type="Oral"/>
                      <Sheet data={{ date:this.state.dateFileEcrit , changeDate:this.changeDate }} type="Ecrit"/>
                      <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold my-10 ml-10 py-2 px-4 rounded round-6 " onClick={this.sendToeic}>Enregistrer</button>
                    </main>
    
                </div>
            )
        }
}

