import { Component, useState } from 'react'
import Header from '../../components/header'
import Tab from '../../components/tab'
import HeaderTab from '../../components/headerTab'


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
                <Header title="Zone des professeurs"/>
                <div className=" flex flex-nowrap max-h-32 w-full space-x-3 justify-center ">
                    <Tab title="Liste des Classes" textButton="Aller >" href="/classes/"/>
                    <Tab title="Liste des Elèves" textButton="Aller >" href="/eleves/"/>
                    <Tab title="Liste des Toeics" textButton="Aller >" href="/toiecs/"/>
                    <Tab title="Importer un Toeic" textButton="Aller >" href="/toeicImport/"/>
                </div>
                <div className="mt-12 border-t-4 border-gray-600">
                    <HeaderTab title="Ajout d'un Professeur" />
                </div>
                <div className="mt-12 border-t-4 border-gray-600">
                    <HeaderTab title="Liste des Professeurs" />

                <div className=" w-full flex flex-col justify-center">
                    {this.state.liste.map((p, i) => (
                        <div className="flex flex-col justify-center"  >

                                <div className="w-80 px-6 py-4 whitespace-nowrap flex flex-nowrap ">
                                  <div className="px-6 py-6 flex flex-nowrap space-x-3">
                                    <span className="w-80 text-center ml-2 font-semibold">{p.nom +" "+ p.prenom}</span>
                                  </div>

                                    <div className="w-80 px-6 py-4 flex flex-nowrap space-x-3">
                                      {p.nom != "PROMO" ? <button className="bg-red-600 text-white px-4 py-2 border rounded-md hover:bg-red hover:border-indigo-500 hover:text-black " onClick={e=> this.supprimer(e,p.idProfesseur)}>
                                          Supprimer
                                      </button>: null}
                                    </div>
                                </div>
                           
                        </div>
                    ))
                    } 
                </div>  
                </div>
                
            </div>

        )
    }
}
