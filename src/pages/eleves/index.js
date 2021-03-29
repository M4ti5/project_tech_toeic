import React, {useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Link from "next/link"
import  {urlReader} from '../../components/urlReader'
import Header from '../../components/header'


export default function vueEleves({elevesList}) {

    const router =  useRouter() //Permet d'utiliser les Routes Stat/Dyna
    
    const [eleves , setEleves] = useState(elevesList)

    useEffect(() =>{
        async function loadData(){
            const rep = await fetch( urlReader() +"/api/eleves/") //récupere les données dans l'api
            const elevesList = await rep.json() // le transforme sous forme JSON
            setEleves(elevesList) // renvoie l'element JSON à la fonciton parent
            
        }

        if(elevesList == undefined) {
            loadData() //Charge les données a la premiere ouverture de la page 
            
        }
        
    },[])


    return (
    <div>
        <Header title="Listes des Eleves"/>
        {
                (eleves != undefined ? eleves.map(e => (
                    <div>
                        <Link as = {`/eleves/${e.Nom}/${e.Prenom}`} href="/eleves/[nom]/[prenom]">
                            {/*Sa sera mieux de mettre un componanent eleves*/}
                            <h1>{e.Nom+" "+e.Prenom}</h1>  
                        </Link>
                    </div>
                )):useEffect) // useEffect appel la fonction ci dessus pour forcE le loadData
        } 
        
    </div>






    )
}
