import { Component, useState } from 'react'
import Header from '../../components/header'
import FormAddClasse from '../../components/formAddClasse'

export default class  VueClasse extends Component {

    constructor(props){
        super(props);
        this.state={
            liste:[]
        }
      }


    async init(){
        var liste = await fetch( "http://localhost:3000"+'/api/classes/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        this.setState({liste:liste})
    }

    async supprimer(e, idClasse){
        if(confirm("Vous etes sur de supprimer une Classe avec TOUS les Eleves & les Toiecs liés ?")) {
            document.location.reload()
            await fetch( "http://localhost:3000"+ '/api/classes/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE',body:JSON.stringify({idClasse: idClasse})})
        }
        
    }
    componentDidMount(){
        this.init()
        
    }
    render(){
        
        console.log(this.state.liste)
        return (
            <div>
                <Header title="Gestion des Classes"/>
                <FormAddClasse/>
                <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Liste des Classes</h2>
                <div className=" w-full flex flex-col justify-center">
                    {this.state.liste.map((c, i) => (
                        <div className="flex flex-col justify-center"  >

                                <div className="w-80 px-6 py-4 whitespace-nowrap flex flex-nowrap ">
                                  <div className="px-6 py-6 flex flex-nowrap space-x-3">
                                    <span className="w-80 text-center ml-2 font-semibold">{c.nomClasse}</span>
                                  </div>

                                    <div className="w-80 px-6 py-4 flex flex-nowrap space-x-3">
                                      {c.nomClasse != "Ancien"?<button className="bg-red-600 text-white px-4 py-2 border rounded-md hover:bg-red hover:border-indigo-500 hover:text-black " onClick={e=> this.supprimer(e,c.idClasse)}>
                                          Supprimer
                                      </button>:null}
                                    </div>
                                </div>
                           
                        </div>
                    ))
                } 
                </div>
                
            </div>

        )
    }
}
