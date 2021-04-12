
import React, {useState} from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import PieChart from '../../components/pieChart'
import LineChart from '../../components/lineChart'
import ListToeicStudents from '../../components/listToeicStudents'

const prisma = new PrismaClient()

export async function getServerSideProps({ params }){
  
    const eleve = await prisma.eleves.findMany({ // Filtrer en JSON
            where:{
              idEleve:{
                equals: params.id
              }
            }
          })
    const resultatsToeics = await prisma.resultats_toeic.findMany({ // Filtrer en JSON
        where:{
            idEleve:{
                equals: params.id
            }
        }
    })

    return{
        props:{
            eleveInit: eleve,
            resultatsToeicsInit: resultatsToeics
        }
    }

}

export function chechThresh(result, listThresh) {
    if(result > 150){
        listThresh.push("Yes")
    }
    else{
        listThresh.push("No")
    }
}

export default function ViewEleve({eleveInit, resultatsToeicsInit}){

    const [eleve , setEleve] = useState(eleveInit)
    const [toeics, setToeics] = useState(resultatsToeicsInit)
    const results = []
    const labelLine = []
    const listThresh = []

    var cpt = 1
    toeics.forEach(element => (
        results.push(element.scorePart1
            +element.scorePart2
            +element.scorePart3
            +element.scorePart4
            +element.scorePart5
            +element.scorePart6
            +element.scorePart7
        ),
        labelLine.push(cpt),
        cpt = cpt + 1
    ))

    results.forEach(result => (
        chechThresh(result, listThresh)
    ))

    return(
    <div>
            <Header title={eleve[0].Nom+" "+eleve[0].Prenom}/>

            {results.forEach(element => (console.log(element)))}

            <main>
                <div>
                    <h1 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Derniers TOEIC</h1>
                    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={results[0]} data2={200-results[0]} />
                            </div>
                            <div class="p-5">
                                <h3 class="text-white text-lg">TOEIC n°1</h3>
                                <p class="text-gray-400">{}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={results[1]} data2={200-results[1]} />
                            </div>
                            <div class="p-5">
                                <h3 class="text-white text-lg">TOEIC n°2</h3>
                                <p class="text-gray-400">{}</p>
                            </div>
                        </div>  
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={results[2]} data2={200-results[2]} />
                            </div>
                            <div class="p-5">
                                <h3 class="text-white text-lg">TOEIC n°3</h3>
                                <p class="text-gray-400">{}</p>
                            </div>
                        </div>
                    </section>



                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">

                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Numéro
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Note sur 20
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Validation de l'année
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="bg-white divide-y divide-gray-200">
                                            {results.map((result) => (
                                                <ListToeicStudents number={results.indexOf(result)+1} official="Not Official" note200={result} note20={result / 10} threshold={listThresh[results.indexOf(result)]} date="../../...."/>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div >
                  <br></br><h1 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Progression </h1>
                  <LineChart dataList={results} labelList={labelLine}/>
                </div>  
            </main>
            
      </div>
    )
}

