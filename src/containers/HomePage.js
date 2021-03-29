import React from 'react'
import Header from '../components/header'
import LineChart from '../components/lineChart'
import Tab from '../components/tab'

export function HomePage() {

    return (
    
    <div>
        <Header title="Acceuil"/>


        
        <div className="flex mx-3 my-3 space-x-3">
            <Tab title="Ajouter un Toiec" textButton="Aller >" href="/toeicImport"/>
            <Tab title="Listes des élèves" textButton="Aller >" href="/eleves"/>
        </div>
        
        

    </div>
    )

}