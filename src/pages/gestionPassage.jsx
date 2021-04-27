import React, {useState} from 'react'
import {PrismaClient} from '@prisma/client'
import Header from '../components/header'

const prisma = new PrismaClient()

export async function getServerSideProps({ params }){
    const eleves = await prisma.eleves.findMany() 
    const resultats = await prisma.resultats_toeic.findMany()
    return{
        props:{
            elevesList : eleves,
            resultatsListBruts : resultats
        }
    }

}

export function calculNotes(resultatsBruts, resultats) {
    resultatsBruts.forEach(element => {
        resultats.push([(element.idEleve),
        (element.scorePart1
            +element.scorePart2
            +element.scorePart3
            +element.scorePart4
            +element.scorePart5
            +element.scorePart6
            +element.scorePart7
        )])
    })
}

export function rechercheMeilleureNote(resultats, eleves, meilleuresNotesAvecId) {
    eleves.forEach(eleve => {
        let meilleureNote = 0
        resultats.forEach(resultat => {
            if (resultat[1] > meilleureNote) {
                if (resultat[0] == eleve.idEleve) {
                    meilleureNote = resultat[1]
                }
            }
        })
        meilleuresNotesAvecId.push([eleve.idEleve, meilleureNote])
    })
}

export function creationListe(eleves, meilleuresNotesAvecId, meilleuresNotesAvecNom) {
    eleves.forEach(eleve => {
        meilleuresNotesAvecId.forEach(note => {
            if (eleve.idEleve == note[0]) {
                meilleuresNotesAvecNom.push([eleve.idEleve, eleve.nom, eleve.prenom, note[1], eleve.idClasse])
            }
        })
    })
} 


export function afficheEleve(eleve) {
    let classeEleve = "Inconnu"
    if (eleve[4] == "cknkm2oll0135potc0nuqr1ba") {
        classeEleve = "ING1 Calais"
    }
    else if (eleve[4] == "cknkm2olm0144potcillf6gv0") {
        classeEleve = "ING2 Calais"
    }
    else if (eleve[4] == "cknkm2oln0153potczmfy59ba") {
        classeEleve = "ING3 Calais"
    }
    else if (eleve[4] == "cknkm2olm0138potcvnb5idze") {
        classeEleve = "ING1 Longuenesse"
    }
    else if (eleve[4] == "cknkm2olm0147potcasw26n06") {
        classeEleve = "ING2 Longuenesse"
    }
    else if (eleve[4] == "cknkm2olo0156potczka9ndpj") {
        classeEleve = "ING3 Longuenesse"
    }
    else if (eleve[4] == "cknkm2olm0141potc8plxjvjc") {
        classeEleve = "ING1 Dunkerque"
    }
    else if (eleve[4] == "cknkm2oln0150potcakd6geyo") {
        classeEleve = "ING2 Dunkerque"
    }
    else if (eleve[4] == "cknkm2olo0159potc7xu6m6ui") {
        classeEleve = "ING3 Dunkerque"
    }
    else if (eleve[4] == "cknoo4gon0120sstcm36xkeww") {
        classeEleve = "Ancien"
    }
    else {
        classeEleve = "Inconnu"
    }
    return ( eleve[1] + " " + eleve[2]  + " en " + classeEleve + " meilleure note : " + eleve[3])
}


export function changerClasse(eleve) {
    // ING1 Calais ok
    if (eleve[4] == "cknkm2oll0135potc0nuqr1ba" && eleve[3] >= 585) {
        eleve[4] = "cknkm2olm0144potcillf6gv0"
    }
    // ING1 Longuenesse ok
    else if (eleve[4] == "cknkm2olm0138potcvnb5idze" && eleve[3] >= 585) {
        eleve[4] = "cknkm2olm0147potcasw26n06"
    }
    // ING1 Dunkerque ok
    else if (eleve[4] == "cknkm2olm0141potc8plxjvjc" && eleve[3] >= 585) {
        eleve[4] = "cknkm2oln0150potcakd6geyo"
    }
    // ING2 Calais ok
    else if (eleve[4] == "cknkm2olm0144potcillf6gv0" && eleve[3] >= 685) {
        eleve[4] = "cknkm2oln0153potczmfy59ba"
    }
    // ING2 Longuenesse ok
    else if (eleve[4] == "cknkm2olm0147potcasw26n06" && eleve[3] >= 685) {
        eleve[4] = "cknkm2olo0156potczka9ndpj"
    }
    // ING2 Dunkerque ok
    else if (eleve[4] == "cknkm2oln0150potcakd6geyo" && eleve[3] >= 685) {
        eleve[4] = "cknkm2olo0159potc7xu6m6ui"
    }
    // ING3 Calais
    else if (eleve[4] == "cknkm2oln0153potczmfy59ba" && eleve[3] >= 785) {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    // ING3 Longuenesse
    else if (eleve[4] == "cknkm2olo0156potczka9ndpj" && eleve[3] >= 785) {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    // ING3 Dunkerque
    else if (eleve[4] == "cknkm2olo0159potc7xu6m6ui" && eleve[3] >= 785) {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    else {
        console.log("erreur : classe de l'eleve inconue")
    }

    changerClasseBDD(eleve[0], eleve[4])
}

export function forcerChangerClasse(eleve) {
    // ING1 Calais ok
    if (eleve[4] == "cknkm2oll0135potc0nuqr1ba") {
        eleve[4] = "cknkm2olm0144potcillf6gv0"
    }
    // ING1 Longuenesse ok
    else if (eleve[4] == "cknkm2olm0138potcvnb5idze") {
        eleve[4] = "cknkm2olm0147potcasw26n06"
    }
    // ING1 Dunkerque ok
    else if (eleve[4] == "cknkm2olm0141potc8plxjvjc") {
        eleve[4] = "cknkm2oln0150potcakd6geyo"
    }
    // ING2 Calais ok
    else if (eleve[4] == "cknkm2olm0144potcillf6gv0") {
        eleve[4] = "cknkm2oln0153potczmfy59ba"
    }
    // ING2 Longuenesse ok
    else if (eleve[4] == "cknkm2olm0147potcasw26n06") {
        eleve[4] = "cknkm2olo0156potczka9ndpj"
    }
    // ING2 Dunkerque ok
    else if (eleve[4] == "cknkm2oln0150potcakd6geyo") {
        eleve[4] = "cknkm2olo0159potc7xu6m6ui"
    }
    // ING3 Calais
    else if (eleve[4] == "cknkm2oln0153potczmfy59ba") {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    // ING3 Longuenesse
    else if (eleve[4] == "cknkm2olo0156potczka9ndpj") {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    // ING3 Dunkerque
    else if (eleve[4] == "cknkm2olo0159potc7xu6m6ui") {
        eleve[4] = "cknoo4gon0120sstcm36xkeww"
    }
    else {
        console.log("erreur : classe de l'eleve inconue")
    }

    changerClasseBDD(eleve[0], eleve[4])
}

export function descendreClasse(eleve) {
    // ING1 Calais ok
    if (eleve[4] == "cknkm2olm0144potcillf6gv0") {
        eleve[4] = "cknkm2oll0135potc0nuqr1ba"
    }
    // ING1 Longuenesse ok
    else if (eleve[4] == "cknkm2olm0147potcasw26n06") {
        eleve[4] = "cknkm2olm0138potcvnb5idze"
    }
    // ING1 Dunkerque ok
    else if (eleve[4] == "cknkm2oln0150potcakd6geyo") {
        eleve[4] = "cknkm2olm0141potc8plxjvjc"
    }
    // ING2 Calais ok
    else if (eleve[4] == "cknkm2oln0153potczmfy59ba") {
        eleve[4] = "cknkm2olm0144potcillf6gv0"
    }
    // ING2 Longuenesse ok
    else if (eleve[4] == "cknkm2olo0156potczka9ndpj") {
        eleve[4] = "cknkm2olm0147potcasw26n06"
    }
    // ING2 Dunkerque ok
    else if (eleve[4] == "cknkm2olo0159potc7xu6m6ui") {
        eleve[4] = "cknkm2olo0159potc7xu6m6ui"
    }
    else {
        console.log("erreur : classe de l'eleve inconue")
    }

    changerClasseBDD(eleve[0], eleve[4])
}

export function changerClasseGlobal(listeEleve) {
    listeEleve.forEach(eleve => {
        changerClasse(eleve)
    })
}

export async function changerClasseBDD(idEleve, nouveauIdClasse) {
    await fetch( "http://localhost:3000"+'/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'PUT',body:JSON.stringify({idEleve:idEleve, nouveauIdClasse:nouveauIdClasse})})
}

export function trieClasse(listeEleves, ing1, ing2, ing3, autres) {
    listeEleves.forEach(eleve => {
        if (eleve[4] == "cknkm2oll0135potc0nuqr1ba" || eleve[4] == "cknkm2olm0138potcvnb5idze" || eleve[4] == "cknkm2olm0141potc8plxjvjc") {
            ing1.push(eleve)
        }
        else if (eleve[4] == "cknkm2olm0144potcillf6gv0" || eleve[4] == "cknkm2olm0147potcasw26n06" || eleve[4] == "cknkm2oln0150potcakd6geyo") {
            ing2.push(eleve)
        }
        else if (eleve[4] == "cknkm2oln0153potczmfy59ba" || eleve[4] == "cknkm2olo0156potczka9ndpj" || eleve[4] == "cknkm2olo0159potc7xu6m6ui") {
            ing3.push(eleve)
        }
        else {
            autres.push(eleve)
        }
    })
}


// ####################################################################################################################################
// ####################################################################################################################################
// ####################################################################################################################################
// ####################################################################################################################################
export default function GestionPassage({elevesList, resultatsListBruts}){

    const[eleves , setEleve] = useState(elevesList)
    const[resultatsBruts, setResultatsBruts] = useState(resultatsListBruts)
    const[resultats, setResutlats] = useState([])
    const[meilleuresNotesAvecId, setmeilleuresNotesAvecId] = useState([])
    const[meilleuresNotesAvecNom, setmeilleuresNotesAvecNom] = useState([])

    const[ing1, setIng1] = useState([])
    const[ing2, setIng2] = useState([])
    const[ing3, setIng3] = useState([])
    const[autres, setAutres] = useState([])

    console.log(eleves)
    calculNotes(resultatsBruts, resultats)
    rechercheMeilleureNote(resultats, eleves, meilleuresNotesAvecId)
    creationListe(eleves, meilleuresNotesAvecId, meilleuresNotesAvecNom)
    console.log(meilleuresNotesAvecNom)

    // ########################
    trieClasse(meilleuresNotesAvecNom, ing1, ing2, ing2, autres)
    console.log(ing2)
    // ########################

    return(
        <div>
            <Header title="Gestion des Passages"/>
            
            <button onClick={() => {changerClasseGlobal(meilleuresNotesAvecNom)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Passage Global</button>
            
            <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">ING1</h2>
            {
                ing1.map((e, i) => (
                    <div className="">
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold">{afficheEleve(e)}</span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {forcerChangerClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Forcer Passage</button></span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {descendreClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Descendre Classe</button></span>
                        </td>
                    </div>
                ))
                
            } 

            <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">ING2</h2>
            {
                ing2.map((e, i) => (
                    <div className="">
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold">{afficheEleve(e)}</span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {forcerChangerClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Forcer Passage</button></span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {descendreClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Descendre Classe</button></span>
                        </td>
                    </div>
                ))
                
            } 

            <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">ING3</h2>
            {
                ing3.map((e, i) => (
                    <div className="">
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold">{afficheEleve(e)}</span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {forcerChangerClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Forcer Passage</button></span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {descendreClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Descendre Classe</button></span>
                        </td>
                    </div>
                ))
                
            } 

            <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold mb-5">Autres</h2>
            {
                autres.map((e, i) => (
                    <div className="">
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold">{afficheEleve(e)}</span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {forcerChangerClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Forcer Passage</button></span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {descendreClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Descendre Classe</button></span>
                        </td>
                    </div>
                ))
                
            } 

            
            {
                meilleuresNotesAvecNom.map((e, i) => (
                    <div className="">
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold">{afficheEleve(e)}</span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {forcerChangerClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Forcer Passage</button></span>
                        </td>
                        <td className="w-80 px-6 py-4 whitespace-nowrap">
                            <span className="text-center ml-2 font-semibold"><button onClick={() => {descendreClasse(e)}} className="ml-10 bg-gray-600 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">Descendre Classe</button></span>
                        </td>
                    </div>
                ))
                
            }    
        </div>
    )
}
