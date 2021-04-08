
import React, {useState} from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import PieChart from '../../components/pieChart'
import LineChart from '../../components/lineChart'

const prisma = new PrismaClient()

export async function getServerSideProps({ params }){
  
    const eleve = await prisma.eleves.findMany({ // Filtrer en JSON
            where:{
              idEleve:{
                equals: params.id
              }
            }
          })
    return{
        props:{
            eleveInit : eleve
        }
    }
}

export default function ViewEleve({eleveInit}){

    const [eleve , setEleve] = useState(eleveInit)
    console.log(eleve)

    return(
    <div>
            <Header title={eleve[0].Nom+" "+eleve[0].Prenom}/>

            <main>
                <div>
                    <h1 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Derniers TOEIC</h1>
                    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic1[0]*/} data2 ={150/*this.props.toeic1[1]*/} />
                            </div>
                            <div class="p-5">
                                <h3 class="text-white text-lg">TOEIC n°1</h3>
                                <p class="text-gray-400">{}</p>
                            </div>
                        </div>
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic2[0]*/} data2 ={150/*this.props.toeic2[1]*/} />
                            </div>
                            <div class="p-5">
                                <h3 class="text-white text-lg">TOEIC n°2</h3>
                                <p class="text-gray-400">{}</p>
                            </div>
                        </div>  
                        <div class="bg-gray-900 shadow-lg rounded p-3">
                            <div class="group relative">
                                <PieChart label1="Right Answers" label2="Wrong Answers" data1={42/*this.props.toeic3[0]*/} data2 ={150/*this.props.toeic3[1]*/} />
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
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    TOEIC n°1
                                                                </div>
                                                                <div class="text-sm text-gray-500">
                                                                    Official
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic1[0]*/} / {/*/*this.props.toeic1[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic1[0]*/} / {/*/*this.props.toeic1[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                                                        NO
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {/*this.props.toeic1[2]*/}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    TOEIC n°2
                                                                </div>
                                                                <div class="text-sm text-gray-500">
                                                                    Not Official
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic2[0]*/} / {/*this.props.toeic2[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic1[0]*/} / {/*/*this.props.toeic1[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        YES
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {/*this.props.toeic2[2]*/}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    TOEIC n°3
                                                                </div>
                                                                <div class="text-sm text-gray-500">
                                                                    Official
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic3[0]*/} / {/*this.props.toeic3[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {/*this.props.toeic1[0]*/} / {/*/*this.props.toeic1[1]*/}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        YES
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {/*this.props.toeic3[2]*/}
                                                </td>
                                            </tr>



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div >
                  <br></br><h1 class="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Progression </h1>
                  <LineChart dataList={[0, 785, 750, 845, 800, 820]} labelList={["Toeic n°0", "Toeic n°1", "Toeic n°2", "Toeic n°3", "Toeic n°4", "Toeic n°5"]}/>
                </div>  
            </main>
            
      </div>
    )
}

