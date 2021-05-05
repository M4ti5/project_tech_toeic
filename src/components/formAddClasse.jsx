import React from 'react'
import { Component } from 'react'

export default class FormAddClasse extends Component {
    constructor(props) {
      super(props);
      this.state = {
          nom: '',
          idAnnee: '',
          barres:[],
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
      if(this.state.nom =="" && this.state.idAnnee =="" ){
        alert("Le nom et score de l'année ne sont pas définis")
      }else if(this.state.nom ==""){
        alert("Le nom est pas défini")
      }else if(this.state.idAnnee ==""){
        alert("Le score de l'année est pas défini")
      }else{
        if (confirm("Voulez vous ajouter la Classe : " + this.state.nom)) {
            document.location.reload()
            await fetch( "http://localhost:3000"+'/api/classes/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:this.state.nom, idAnnee:this.state.idAnnee})})
     
       }
        
      event.preventDefault();
    }
  }

  async init(){
    var temp = await fetch( "http://localhost:3000"+'/api/annee_classes/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
    this.setState({barres:temp})
  }

  componentDidMount(){
    this.init()
  }
    render() {
      return (
          <div className="my-8">
              <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Ajouter une Classe</h2><br></br>
            <form onSubmit={this.handleSubmit}>
                <label className=" mx-1">
                    Nom : 
                    <input className="bg-gray-200 rounded-sm pl-2" type="text" name="nom" value={this.state.nom} onChange={this.handleChange} />        
                </label>
                <label className=" mx-3">
                    Palier de la Classe: 
                    <select name="idAnnee" onChange={this.handleChange}>
                        <option value="" >Selectionez un Score Toeic</option>
                        {this.state.barres.map(c =>(
                            <option value={c.idAnnee} >{c.valeurBarre}</option>
                        ))}
                        
                    </select>
                </label>
              <input className="bg-purple-400 ml-2 px-2 py-1 rounded-sm text-white hover:bg-gray-400" type="submit" value="Envoyer" />
            </form>
        </div>
      );
    }
  }