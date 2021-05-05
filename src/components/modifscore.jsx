import React from 'react'
import { Component } from 'react'

export default class Modifscore extends Component {
    constructor(props) {
      super(props);
      this.state = {
          idResultatToeic: this.props.idResultatToeic,
          scorePart1: 0,
          scorePart2: 0,
          scorePart3: 0,
          scorePart4: 0,
          scorePart5: 0,
          scorePart6: 0,
          scorePart7: 0
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
      event.preventDefault();
      this.state.scorePart1=parseInt(this.state.scorePart1)
      this.state.scorePart2=parseInt(this.state.scorePart2)
      this.state.scorePart3=parseInt(this.state.scorePart3)
      this.state.scorePart4=parseInt(this.state.scorePart4)
      this.state.scorePart5=parseInt(this.state.scorePart5)
      this.state.scorePart6=parseInt(this.state.scorePart6)
      this.state.scorePart7=parseInt(this.state.scorePart7)
      const eleve = await fetch( "http://localhost:3000"+'/api/resultats/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'PUT',body:JSON.stringify({idResultatToeic: this.state.idResultatToeic, scorePart1: this.state.scorePart1, scorePart2: this.state.scorePart2, scorePart3: this.state.scorePart3, scorePart4: this.state.scorePart4, scorePart5: this.state.scorePart5, scorePart6: this.state.scorePart6, scorePart7: this.state.scorePart7})})
      console.log(eleve)
      window.location.reload()
    }
  
    render() {
      return (
          <div className="my-8">
              <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Modifier Parties</h2>
            <form onSubmit={this.handleSubmit}>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 1 : 
                    <input className="w-8" type="number" name="scorePart1" value={this.state.scorePart1} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 2 : 
                    <input className="w-8" type="number" name="scorePart2" value={this.state.scorePart2} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 3 : 
                    <input className="w-8" type="number" name="scorePart3" value={this.state.scorePart3} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 4 : 
                    <input className="w-8" type="number" name="scorePart4" value={this.state.scorePart4} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 5 : 
                    <input className="w-8" type="number" name="scorePart5" value={this.state.scorePart5} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 6 : 
                    <input className="w-8" type="number" name="scorePart6" value={this.state.scorePart6} onChange={this.handleChange} />        
                </label>
                <label className="border-solid border-4 border-light-blue-500 mx-1">
                    Part 7 : 
                    <input className="w-8" type="number" name="scorePart7" value={this.state.scorePart7} onChange={this.handleChange} />        
                </label>
                <input type="submit" value="Envoyer Parties" />
            </form>
        </div>
      );
    }
  }

  /* {(document.getElementById("modif_"+i).disabled=="true" ? <Modifscore /> : null)} */