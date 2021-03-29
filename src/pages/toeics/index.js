import React, {useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Link from "next/link"
import  {urlReader} from '../../components/urlReader'
import Header from '../../components/header'


export default function vueToeics({toeicsList}) {

    const router =  useRouter() //Permet d'utiliser les Routes Stat/Dyna

    const [toeics , setToeic] = useState(toeicsList)

    useEffect(() =>{
        async function loadData(){
            const rep = await fetch("http://localhost:3000/api/toeics/") //récupere les données dans l'api
            const toeicsList = await rep.json() // le transforme sous forme JSON
            setToeic(toeicsList) // renvoie l'element JSON à la fonciton parent

        }

        if(toeicsList == undefined) {
            loadData() //Charge les données a la premiere ouverture de la page

        }

    },[])


    return (
    <div>
        <Header title="Listes des Toeic"/>
        {
                (toeics != undefined ? toeics.map(e => (
                    <div>
                        <Link as = {`/toeics/${e.numToeic}/${e.date}`} href="/toeics/[numToeic]/[date]">
                            {/*Sa sera mieux de mettre un componanent eleves*/}
                            <h1>{e.numToeic+" "+e.date}</h1>
                        </Link>
                    </div>
                )):useEffect) // useEffect appel la fonction ci dessus pour forcE le loadData
        }

    </div>






    )
}
