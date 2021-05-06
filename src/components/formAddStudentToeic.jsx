import React from 'react'
import { Component } from 'react'

export default class FormAddStudent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          nom: '',
          prenom: '',
          scorePart1: "0",
          scorePart2: "0",
          scorePart3: "0",
          scorePart4: "0",
          scorePart5: "0",
          scorePart6: "0",
          scorePart7: "0",
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
    async handleSubmit(event) {
      if(this.state.nom =="" && this.state.prenom =="" ){
        alert("Le nom et prenom ne sont pas définis")
      }else if(this.state.nom ==""){
        alert("Le nom est pas défini")
      }else if(this.state.prenom ==""){
        alert("Le prenom est pas défini")
      }else{
        if (confirm("Voulez vous ajouter l\'élève : " + this.state.prenom+" "+this.state.nom)){
          console.log(this.state)
          await fetch( "http://localhost:3000"+'/api/resultats/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:this.state.nom, prenom:this.state.prenom,idToeic:this.props.idToeic, Partie1:this.state.scorePart1,Partie2:this.state.scorePart2,Partie3:this.state.scorePart3,Partie4:this.state.scorePart4,Partie5: this.state.scorePart5,Partie6:this.state.scorePart6,Partie7:this.state.scorePart7 })})
          //document.location.reload()
        }
      }
      event.preventDefault();
    } 
  
    render() {
      return (
          <div className="my-8">
              <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Ajouter un Elève</h2><br></br>
            <form onSubmit={this.handleSubmit}>
                <label className=" mx-1">
                    Nom : 
                    <input className="bg-gray-200 rounded-sm pl-2" type="text" name="nom" value={this.state.nom} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Prénom : 
                    <input className="bg-gray-200 rounded-sm pl-2" type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 1 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart1" value={this.state.scorePart1} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 2 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart2" value={this.state.scorePart2} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 3 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart3" value={this.state.scorePart3} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 4 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart4" value={this.state.scorePart4} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 5 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart5" value={this.state.scorePart5} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 6 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart6" value={this.state.scorePart6} onChange={this.handleChange} />        
                </label>
                <label className=" mx-1">
                    Part 7 : 
                    <input className="border-solid border-2  rounded-md border-gray-200 pl-1 w-10" type="text" name="scorePart7" value={this.state.scorePart7} onChange={this.handleChange} />        
                </label>
            <input className="bg-purple-500 hover:bg-gray-300 text-white px-4 py-2  ml-5 rounded-sm" type="submit" value="Envoyer" />
            </form>
        </div>
      );
    }
  }