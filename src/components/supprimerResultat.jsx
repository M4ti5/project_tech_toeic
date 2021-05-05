import React from 'react'
import { Component } from 'react'

export default class SupprimerResultat extends Component {
    constructor(props) {
      super(props);
      this.state = {
          idResultatToeic: this.props.idResultatToeic
        };

    }

    async suppRes(event) {
      event.preventDefault();
      var r = confirm("Confirmez-vous la suppression ?");
      var txt = ""
        if (r == true) {
            await fetch( "http://localhost:3000"+'/api/resultats/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE',body:JSON.stringify({idResultatToeic: this.state.idResultatToeic})})
            window.location.reload()
            txt = "Suppression Confirmée !"
        } else {
            txt = "Suppression Annulée !"
        }
    }
  
    render() {
      return (
        <div>
            <button className="bg-red-600 text-white px-4 py-2 border rounded-sm hover:bg-red hover:border-indigo-500 hover:text-black " onClick={e=> this.suppRes(e)}>
                Supprimer Resultat
            </button>  
        </div>
      );
    }
  }
