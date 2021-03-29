import React,  { Component } from 'react'
import { CenturyView } from 'react-calendar'



export default class VueAcceuil extends Component {

    render(){
        return(
            <div class="bg-gradient-to-r from-yellow-200 via-white-200 to-blue-300 ...">
            <br></br><h1 className="title">TOEILCO</h1>
            <div class="nav">
                <ul>
                    <li><a href="default.html">My Space</a></li>
                    <li><a href="contact.asp">About Us</a></li>
                    <li><a href="about.asp">Contact Us</a></li>
                </ul>
            </div>



                <br></br><strong><h2>My space</h2></strong> 



                <br></br><div className="sign_form">
                    <div class="w-full max-w-xs">
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Username
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Sign In
                                </button>
                                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            
                
                



                <div className="About Us">
                <strong><h2>About Us</h2></strong>
                <br>
                </br><p class="texte-2xl"class="text-justify ..." class="overflow-ellipsis overflow-hidden ...">
                
                        This website is made by three students in the second year of engeneering in EILCO. It contains three spaces : one for the professors, one for the students and the last for the secretary.
                        Each space has Marks and the progress of the classes. EILCO had chosen the best professors in order to help you to have your Toeic with the best score and to help you work on your fluent speaking in English.

                </p>
                </div>
                

                
                <br></br><strong><h2> Contact Us </h2></strong>
                <div className="contact">
                 <p>     <mark>Aurélien Podvin</mark>  : aurelien.podvin@eilco-ulco.fr</p>
                    <p>        <mark>Gino FORTUNI</mark>  : gino.fortuni@eilco-ulco.fr</p>
                    <p> <mark>Katherine CICHARSKI</mark>  : katherine.cicharski@eilco-ulco.fr</p>
                    </div>
                

            </div>
        )
    }

}
