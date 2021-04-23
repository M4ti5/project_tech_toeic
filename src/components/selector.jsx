
import React,  { Component } from 'react'


export default class Selector extends Component {
    constructor(props) {
        super(props);
        this.initSelctor = this.initSelctor.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this) 
        this.handleClick=this.handleClick.bind(this)
        this.updateId=this.updateId.bind(this)
        this.onMouseLeave=this.onMouseLeave.bind(this)
        this.state = {
            intialized:false,
            default: "Aucun(e) "+this.props.data.type+" Selectioné(e)",
            selected:"",
            choices:[],
        }
    }
    async initSelctor(){
        const data = await  fetch( "http://localhost:3000"+"/api/"+this.props.data.type+"/", {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        this.setState({choices:data})
    }


    handleClick(e) {
        e.preventDefault();
        const temp = "Selector_dropmenu_"+this.props.data.type
        document.getElementById(temp).classList.replace("hidden","visible")
    }

    updateId(){
        if(document.getElementById("Selector_dropmenu_"+this.props.data.type).classList.contains("visible")){

            switch(this.props.data.type){

                case "professeurs":
                    this.props.data.loadId(this.state.selected.idProfesseur, this.props.data.type) 
                    this.props.data.id = this.state.selected.idProfesseur
                    break
                case "classes":
                    this.props.data.loadId(this.state.selected.idClasse, this.props.data.type) 
                    this.props.data.id = this.state.selected.idClasse
                    break
            }
        }
    }

    onSelect(e,key){
        e.preventDefault();
        this.setState({selected:this.state.choices[key]})
        this.updateId()
        
    }
    
    onMouseLeave(e){
        e.preventDefault();
        this.updateId()
        document.getElementById("Selector_dropmenu_"+this.props.data.type).classList.replace("visible","hidden")
    }

    render(){
        if(this.state.intialized == false){
            this.initSelctor()
            this.setState({intialized:true})
            
        }
        
        return (
            <div className="m-10" onMouseLeave={this.onMouseLeave}>
                <div  className="mt-1 relative">

                        <button id="selector" type="button" onClick={this.handleClick} className="relative w-auto bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300  sm:text-sm">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                    {(this.state.selected == "" ?  this.state.default : this.props.data.type == "professeurs"? this.state.selected.nom+" "+this.state.selected.prenom : this.props.data.type == "classes"? this.state.selected.nomClasse :"type Affichage non compatible" ) }
                                </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"  />
                                </svg>
                            </span>
                        </button>

                    <ul id={"Selector_dropmenu_"+this.props.data.type} className="hidden absolute mt-0 w-auto bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  focus:outline-none sm:text-sm" >
                        {this.state.choices.map((choice,k) => 
                            <li onClick={e => {this.onSelect(e,k)}} className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ">
                                <div className="flex items-center">
                                    <span className="font-normal ml-3 block truncate">
                                        {(this.props.data.type == "professeurs"? choice.nom+" "+choice.prenom : this.props.data.type == "classes"? choice.nomClasse :"type Affichage non compatible")}
                                    </span>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
    
    )}      
}