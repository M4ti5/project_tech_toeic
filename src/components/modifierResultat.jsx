import React from 'react'
import { Component } from 'react'
import Modifscore from './modifscore.jsx'

export default class ModifierResultat extends Component {
    constructor(props) {
      super(props);
      this.state = {
          idResultatToeic: this.props.idResultatToeic
        };

    }

    modifRes(event) {
        event.preventDefault();
        if(document.getElementById("modif").className == "hidden"){document.getElementById("modif").classList.replace("hidden","visible")}
        else{document.getElementById("modif").classList.replace("visible", "hidden")}
    }
  
    render() {
      return (
        <div className="my-8">
            <td id="modif" className={"hidden"}>
                <Modifscore idResultatToeic={this.state.idResultatToeic} />
            </td>
            <button className="bg-blue-600 text-white px-4 py-2 border rounded-md hover:bg-blue hover:border-indigo-500 hover:text-black " onClick={e=> this.modifRes(e)}>
                Modifier Resultats
            </button>  
        </div>
      );
    }
  }