import { useRouter } from  'next/router'

export default function DetailedPerson(){
    const router = useRouter()
    return <h2>La page de l'élèves { router.query.prenom +"  "+  router.query.nom}</h2>
}