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
                    <Link as= {`/toeics/${t.idToeic}`} href="/toeics/[id]" key={i}>
                      <h1>{t.date}</h1>
                    </Link>
                ))
        } 
        
    </div>
    )
}