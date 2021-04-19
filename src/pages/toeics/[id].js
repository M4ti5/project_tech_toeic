
import React, {useState} from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import PieChart from '../../components/pieChart'
import LineChart from '../../components/lineChart'

const prisma = new PrismaClient()

export async function getServerSideProps({ params }){

    const toeic = await prisma.toeics.findMany({ // Filtrer en JSON
            where:{
              idToeic:{
                equals: params.id
              }
            }
          })

    const result = await prisma.resultats_toeic.findMany({ // Filtrer en JSON
            where:{
              numToeic:{
                equals: params.id
              }
            }
          })

    console.log(params.idToeic)
    const etudiant = await prisma.$queryRaw`SELECT nom, prenom FROM eleves e JOIN resultats_toeic r ON r.idEleve=e.idEleve WHERE r.numToeic= ${params.id} ;`

    return{
        props:{
            resultats : result,
            toeicInit : toeic,
            listEtudiant : etudiant
        }
    }
}

function scorePartie({resultats}, numPart){
  const [result , setResult] = useState(resultats)
  const part = 0
  const taille = result.length
  var i = 1
  if (numPart==1){
    var part1 =  result[0].scorePart1
    for(i ; i<taille;i++){
      part1 += result[i].scorePart1
    }
    part1 = part1/taille
    return part1
  }
  else if (numPart==2){
    var part2 =  result[0].scorePart2
    for(i ; i<taille;i++){
      part2 += result[i].scorePart2
    }
    part2 = part2/taille
    return part2
  }
  else if (numPart==3){
    var part3 =  result[0].scorePart3
    for(i ; i<taille;i++){
      part3 += result[i].scorePart3
    }
    part3 = part3/taille
    return part3
  }
  else if (numPart==4){
    var part4 =  result[0].scorePart4
    for(i ; i<taille;i++){
      part4 += result[i].scorePart4
    }
    part4 = part4/taille
    return part4
  }
  else if (numPart==5){
    var part5 =  result[0].scorePart5
    for(i ; i<taille;i++){
      part5 += result[i].scorePart5
    }
    part5 = part5/taille
    return part5
  }
  else if (numPart==6){
    var part6 =  result[0].scorePart6
    for(i ; i<taille;i++){
      part6 += result[i].scorePart6
    }
    part6 = part6/taille
    return part6
  }
  else if (numPart==7){
    var part7 =  result[0].scorePart7
    for(i ; i<taille;i++){
      part7 += result[i].scorePart7
    }
    part7 = part7/taille
    return part7
  }
  else{
    return part
  }
}

function mauvaisesRep(score, numPart){
  const part = 0
  if (numPart==1){
    const part1 = 6 - score
    return part1
  }
  else if (numPart==2){
    const part2 =  25 - score
    return part2
  }
  else if (numPart==3){
    const part3 =  39 - score
    return part3
  }
  else if (numPart==4){
    const part4 =  30 - score
    return part4
  }
  else if (numPart==5){
    const part5 =  30 - score
    return part5
  }
  else if (numPart==6){
    const part6 =  16 - score
    return part6
  }
  else if (numPart==7){
    const part7 =  54 - score
    return part7
  }
  else{
    return part
  }
}

function reussite({resultats}){
  const [result , setResult] = useState(resultats)
  var reussi = 0
  for(var i = 0 ; i<result.length;i++){
    var score = 0
    score = (result[i].scorePart1 + result[i].scorePart2 + result[i].scorePart3 + result[i].scorePart4 + result[i].scorePart5 + result[i].scorePart6 + result[i].scorePart7)*5
    if(score>785){
      reussi += 1
    }
  }
  return reussi
}

function scoreTotal({resultats}, i){
  const [result , setResult] = useState(resultats)
  var score = (result[i].scorePart1 + result[i].scorePart2 + result[i].scorePart3 + result[i].scorePart4 + result[i].scorePart5 + result[i].scorePart6 + result[i].scorePart7)*5
  return score
}

function nonReussi({resultats}, score){
  const [result , setResult] = useState(resultats)
  var nonReussi = result.length - score
  return nonReussi
}

function afficherEtudiant({resultats, listEtudiant}){
  const [result , setResult] = useState(resultats)
  const [etudiant , setEtudiant] = useState(listEtudiant)
  const taille = etudiant.length
  var tab=new Array ()
  for(var i =  0; i<taille ;i++){
    const total = scoreTotal({resultats}, i)
    tab[i] = <h1>{etudiant[i].nom+' '+etudiant[i].prenom+' | Score total : '+total}</h1>
  }
  return tab
}

export default function ViewToeic({toeicInit, resultats, listEtudiant}){
    const [toeic , setToeic] = useState(toeicInit)
    const [result , setResult] = useState(resultats)
    const [etudiant , setEtudiant] = useState(listEtudiant)
    const score1 = scorePartie({resultats},1)
    const score2 = scorePartie({resultats},2)
    const score3 = scorePartie({resultats},3)
    const score4 = scorePartie({resultats},4)
    const score5 = scorePartie({resultats},5)
    const score6 = scorePartie({resultats},6)
    const score7 = scorePartie({resultats},7)
    const reussi = reussite({resultats})
    const taille = result.length

    return(

    <div>
            <Header dl={{type:"toeic",id:toeic[0].idToeic}} title={"Toeic du "+toeic[0].date}/>

            <main>
                <div>
                    <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Notes</h2>
                    <h1>{afficherEtudiant({resultats, listEtudiant})}</h1>
                </div>
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Statistique</h2>
                    <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={reussi} data2 ={nonReussi({resultats},reussi)/*this.props.toeic1[1]*/} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Réussite des élèves</h3>
                                <p className="text-gray-400">{/*this.props.toeic1[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score1} data2 ={mauvaisesRep(score1, 1)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 1</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score2} data2 ={mauvaisesRep(score2, 2)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 2</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score3} data2 ={mauvaisesRep(score3, 3)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 3</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score4} data2 ={mauvaisesRep(score4, 4)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 4</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score5} data2 ={mauvaisesRep(score5, 5)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 5</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score6} data2 ={mauvaisesRep(score6, 6)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 6</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 shadow-lg rounded p-3">
                            <div className="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={score7} data2 ={mauvaisesRep(score7, 7)} />
                            </div>

                            <div className="p-5">
                                <h3 className="text-white text-lg">Partie 7</h3>
                                <p className="text-gray-400">{/*this.props.toeic2[2]*/}</p>
                            </div>
                        </div>
                    </section>
                    </div>
            </main>

      </div>
    )
}
