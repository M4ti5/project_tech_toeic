import { useRouter } from  'next/router'

export default function DateToeic(){
    const router = useRouter()
    return <h2>Le toeic numero {router.query.numToeic} du {router.query.date}</h2>
}
