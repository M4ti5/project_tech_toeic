import Link from "next/link"

const recherche =[
    
    {type:'eleves', name:'Matis'},
    {type:'eleves', name:'Valentin'},
    {type:'eleves', name:'Abir'}
]

export default function Details() {
    
    return(
        <div>
            {   recherche.map(e => (
                    <div>
                        <Link as = {`/${e.type}/${e.name}`} href="/eleves/[nom]">
                            <a>Navigate to {e.v}'s {e.name}</a>
                        </Link>
                    </div>
                ))
            }
        </div>
    ) 
}