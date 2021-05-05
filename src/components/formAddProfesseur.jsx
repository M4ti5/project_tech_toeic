import React from 'react'
import { Component } from 'react'

export default class FormAddProfesseur extends Component {
    constructor(props) {
      super(props);
      this.state = {
          nom: '',
          prenom: '',

        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
      
    }
    async handleSubmit(event){
      if(this.state.nom =="" && this.state.prenom =="" ){
        alert("Le nom et prenom ne sont pas définis")
      }else if(this.state.nom ==""){
        alert("Le nom est pas défini")
      }else if(this.state.prenom ==""){
        alert("Le prenom est pas défini")
      }else{
        if (confirm("Voulez vous ajouter le professeur : " + this.state.prenom+" "+this.state.nom)) {
            document.location.reload()
            await fetch( "http://localhost:3000"+'/api/professeurs/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:this.state.nom, prenom:this.state.prenom})})
     
       }
        
      event.preventDefault();
    }
  }

    render() {
      return (
          <div className="my-8">
              <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Ajouter un Professeur</h2><br></br>
            <form onSubmit={this.handleSubmit}>
                <label className=" mx-1">
                    Nom : 
                    <input className="bg-gray-200 rounded-sm pl-2" type="text" name="nom" value={this.state.nom} onChange={this.handleChange} />        
                </label>
                <label className="mx-1">
                    Prénom : 
                    <input className="bg-gray-200 rounded-sm pl-2" type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} />        
                </label>
              <input className="bg-purple-400 ml-2 px-2 py-1 rounded-sm text-white hover:bg-gray-400" type="submit" value="Envoyer" />
            </form>
        </div>
      );
    }
  }