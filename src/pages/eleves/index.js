import { useState } from 'react'
import {PrismaClient} from '@prisma/client'

import Header from '../../components/header'

import Link from 'next/link'

const prisma = new PrismaClient()

export async function getServerSideProps(){

    const eleves = await prisma.eleves.findMany() // vas chercher tous les element de model eleves
    return{
        props:{
            elevesList : eleves
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
                    <Link as= {`/eleves/${e.idEleve}`} href="/eleves/[id]" key={i}>
                      <h1>{e.Nom} {e.Prenom}</h1>
                    </Link>
                ))
        } 
        
    </div>






    )
}
