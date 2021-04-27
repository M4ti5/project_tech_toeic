import { useState } from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import Link from 'next/link'

const prisma = new PrismaClient()

export async function getServerSideProps(){

    const toeics = await prisma.$queryRaw`Select * from toeics t join professeurs p on  t.idProfesseur = p.idProfesseur join classes c on t.idClasse = c.idClasse`
    return{
        props:{
            toeicList : toeics,
        }
    }
    
}

export default function vueEleves({toeicList}) {

    
    const [toeics , setToeics] = useState(toeicList)
    return (
    <div>
        <Header title="Listes des Toeics"/>
        {       
                toeics.map((t, i) => (
                    <div>
                        <table>
                            
                            <td className="w-80 px-6 py-4 whitespace-nowrap">
                                <span className="text-center ml-2 font-semibold">{t.date}</span>
                                <span className="text-center ml-2 font-semibold">{t.nom +" "+ t.prenom}</span>
                                <span className="text-center ml-2 font-semibold">{t.nomClasse}</span>
                                <span className={"text-center ml-2 "+ (t.officiel == true ? "text-green-500" : "text-red-500") +" font-semibold"}>{(t.officiel == true ? "officiel" : "non officiel")}</span>
                            </td>
                            <td className="w-80 px-6 py-4 whitespace-nowrap">
                                <Link as= {`/toeics/${t.idToeic}`} href="/toeics/[id]" key={i}>
                                    <button className="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                                        Voir
                                    </button>
                                </Link>
                            </td>
                        </table>
                    </div>
                ))
        } 
        
    </div>
    )
}