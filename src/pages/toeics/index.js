import { useState } from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'
import Link from 'next/link'

const prisma = new PrismaClient()

export async function getServerSideProps(){

    const toeics = await prisma.toeics.findMany()
    return{
        props:{
            toeicList : toeics
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
                            <td class="w-80 px-6 py-4 whitespace-nowrap">
                                <h1 class="text-center ml-2 font-semibold">Toeic du {t.date}</h1>
                            </td>
                            <td class="w-80 px-6 py-4 whitespace-nowrap">
                                <Link as= {`/toeics/${t.idToeic}`} href="/toeics/[id]" key={i}>
                                    <button class="bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
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