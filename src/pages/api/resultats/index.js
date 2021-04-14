import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){

        case 'POST':
            await fetch('http://localhost:3000/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({date:req.body.date})})
            var localToeic = await prisma.$queryRaw`Select idToeic from toeics where date=${req.body.date}`
            
            await fetch('http://localhost:3000/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({Nom:req.body.Nom, Prenom:req.body.Prenom,})})
            
            var localEleve =  await prisma.$queryRaw`Select idEleve from eleves where Nom=${req.body.Nom} and Prenom=${req.body.Prenom}`
            console.log(localToeic,localEleve)
            const Existing = await prisma.$queryRaw`Select * from resultats_toeic where idEleve=${localEleve[0].idEleve} AND numToeic=${localToeic[0].idToeic}`
            

            if(Existing.length == 0){ // on verifie que l'élèves est bien unique
                const savedToeic = await prisma.resultats_toeic.create({
                    data: {
                        idEleve:localEleve[0].idEleve,
                        numToeic:localToeic[0].idToeic,
                        scorePart1:parseInt(req.body.Partie1),
                        scorePart2:parseInt(req.body.Partie2),
                        scorePart3:parseInt(req.body.Partie3),
                        scorePart4:parseInt(req.body.Partie4),
                        scorePart5:parseInt(req.body.Partie5),
                        scorePart6:parseInt(req.body.Partie6),
                        scorePart7:parseInt(req.body.Partie7),

                    },
                })
                res.json(savedToeic)
                
            }else{
                res.json("Erreur - Toeic existant")
            }
            break

        
        case 'GET' :
                const toeicData = await prisma.$queryRaw("Select *  from resultats_toeic")           
                res.json(toeicData)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}