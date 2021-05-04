import React from 'react'
import { Component } from 'react'

export default class FormAddStudent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          nom: '',
          prenom: '',
          idClasse: ''
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
      }
    async handleSubmit(event) {
      alert('L\'élève a été soumis : ' + this.state.nom + this.state.prenom + this.state.classe);
      
      await   fetch( "http://localhost:3000"+'/api/eleves/[id]/'+this.state.nom+'/'+this.state.prenom+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:this.state.nom, prenom:this.state.prenom, idClasse:this.state.idClasse })})
      event.preventDefault();
    }

    
  
    render() {
      return (
          <div className="my-8">
              <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Ajouter un Elève</h2><br></br>
            <form onSubmit={this.handleSubmit}>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Nom : 
                    <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Prénom : 
                    <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Classe :
                    <select value={this.state.idClasse} onChange={this.handleChange}>            
                        <option value="cknkm2oll0135potc0nuqr1ba">ING1 - Calais</option>
                        <option value="cknkm2olm0144potcillf6gv0">ING2 - Calais</option>
                        <option value="cknkm2oln0153potczmfy59ba">ING3 - Calais</option>
                        <option value="cknkm2olm0138potcvnb5idze">ING1 - Longuenesse</option>
                        <option value="cknkm2olm0147potcasw26n06">ING2 - Longuenesse</option>
                        <option value="cknkm2olo0156potczka9ndpj">ING3 - Longuenesse</option>
                        <option value="cknkm2olm0141potc8plxjvjc">ING1 - Dunkerque</option>
                        <option value="cknkm2oln0150potcakd6geyo">ING2 - Dunkerque</option>
                        <option value="cknkm2olo0159potc7xu6m6ui">ING3 - Dunkerque</option>
                        <option value="cknoo4gon0120sstcm36xkeww">Ancien</option>
                    </select>
                </label>
            <input type="submit" value="Envoyer" />
            </form>
        </div>
      );
    }
  }