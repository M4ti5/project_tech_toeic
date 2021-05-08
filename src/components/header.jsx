import React,  { Component } from 'react'
import Link from "next/link"

import HeaderTab from './headerTab'
import DropDown from './dropdown'

export default class Header extends Component {
    
    render(){
        return(


            <div className="bg-gray-100 h-full">
    
                <nav className="bg-gray-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">

                            <Link as = '/' href="/">
                              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Professeurs</a>
                            </Link>

                            <DropDown title="Toeics" sub_title={[{title:"Liste des Toeics", href:"/toeics"},{title:"Importation de Toeic", href:"/toeicImport"}]} />
                           
                            <Link as = '/eleves' href="/eleves">
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Elèves</a>
                            </Link>

                            <Link as = '/classes' href="/classes">
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Classes</a>
                            </Link>

                            <Link as = '/operations' href="/operations">
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Opérations</a>
                            </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
    
                <div>
    
                    <HeaderTab dl={this.props.dl}   title={this.props.title}/>
                </div>
    
            </div>
            
           
        ) 
    }  
}


