import { Component, useState } from 'react'
import Header from '../../components/header'
import Tab from '../../components/tab'
import FormAddProfesseur from '../../components/formAddProfesseur'


export default class  vueProfesseur extends Component {

    constructor(props){
        super(props);
        this.state={
            liste:[]
        }
      }


    async init(){
        var liste = await fetch( "http://localhost:3000"+'/api/professeurs/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        this.setState({liste:liste})
    }
    async supprimer(e, idProfesseur){
        if(confirm("Vous etes sur de supprimer un Professeur avec tous les toiecs liés ?")) {
            document.location.reload()
            await fetch( "http://localhost:3000"+ '/api/professeurs/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE',body:JSON.stringify({idProfesseur: idProfesseur})})
        }
        
    }
    componentDidMount(){
        this.init()
        
    }
    render(){
        
        console.log(this.state.liste)
        return (
            <div>
                <Header title="Zone d'Opérations"/>
                <div className=" flex flex-nowrap max-h-32 w-full space-x-3 justify-center ">
                    <Tab title="Passage d'année" textButton="Aller >" href="/operations/gestionPassage"/>

                </div>
            </div>

        )
    }
}
