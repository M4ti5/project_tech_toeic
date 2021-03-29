
import React, { Component } from 'react'
import Header from '../components/header'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart'


export default class ViewToeic extends Component{
    constructor(props) {
        super(props);
    }
    /*
    Remarque de Matis :
    - Tous les données des graphique j'ai commenter les props pour que cela s'affiche pour tester
    - Voir le commentaire que j'ai fait : src\pages\eleves\[nom]\index.js --  ligne 9
    - Essaye de decouper en Composant React les Gosses partie pour le code soit plus simple a l'avenir

    */
    render(){

        return(

    <div>
            <Header title={"Toeic numero "+this.props.numToeic+" "+ (this.props.date != undefined ? this.props.date : "")}/>

            <main>
                <div>
                    <h2 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Notes</h2>
                    
                </div>
                <div>
                  <h2 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Statistique</h2>
                    <section class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={150/*this.props.toeic1[0]*/} data2 ={50/*this.props.toeic1[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Réussite des élèves</h3>
                                <p class="text-gray-400">{/*this.props.toeic1[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={50} data2 ={40} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 1</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 2</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 3</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 4</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 5</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 6</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
                            </div>

                            <div class="p-5">
                                <h3 class="text-white text-lg">Partie 7</h3>
                                <p class="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                    </section>
                    </div>
            </main>

      </div>
    )
}
}
