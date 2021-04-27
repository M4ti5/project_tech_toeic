import { useState } from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import ListStudents from "../../components/listStudents"

import Link from 'next/link'

const prisma = new PrismaClient()

export async function getServerSideProps(){

    const eleves = await prisma.$queryRaw`select e.idEleve , e.nom , e.prenom , p.nom as nomProf , p.prenom as prenomProf , c.nomClasse from eleves  e join professeurs p on  e.idProfesseur = p.idProfesseur join classes c on e.idClasse = c.idClasse`
    return{
        props:{
            elevesList : eleves,
        }
    }
}

export default function vueEleves({elevesList}) {

    
    const [eleves , setEleves] = useState(elevesList)
    
    return (
    <div>
        <Header title="Listes des Eleves"/>

        {
                eleves.map((e, i) => (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <ListStudents nom={e.nom} prenom={e.prenom} professeur={e.nomProf+" "+e.prenomProf} classe={e.nomClasse} />
                                    </td>
                                    <td>
                                        <Link as= {`/eleves/${e.idEleve}`} href="/eleves/[id]" key={i}>
                                            <button className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                                                Voir
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                ))
        } 
        
    </div>






    )
}
