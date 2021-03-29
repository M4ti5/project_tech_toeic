import { useRouter } from  'next/router'
import ViewToeic from '../../../containers/viewToeic'

export default function Person(){
    const router = useRouter()
    const alone = true // si l'element est le seul dans la bdd

    if(alone){
        return <ViewToeic numToeic={router.query.numToeic} />
        // renvoie la vue Eleve qui est commun a tous les autres types de vue
        // Pour plus tard : on envera juste l'ID de l'eleve dans le composant pour que la requete sur l'api ce fasse dans la ViewEleve
        // cette page ne servira que de point d'acces si est unique
    }else{
        return <h2>Le toeic numero {router.query.numToeic}</h2>
    }
}
