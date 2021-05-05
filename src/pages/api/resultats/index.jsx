import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){

        case 'POST':
            console.log(req.body)
            if(req.body.idProfesseur != undefined && req.body.idClasse != undefined && req.body.officiel != undefined && req.body.date != undefined){

                await   fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({date:req.body.date,idProfesseur:req.body.idProfesseur,idClasse:req.body.idClasse,officiel:req.body.officiel})})
                var localToeic = await prisma.$queryRaw`Select idToeic from toeics where date=${req.body.date} and idProfesseur=${req.body.idProfesseur} and idClasse=${req.body.idClasse}`

                await   fetch( "http://localhost:3000"+'/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:req.body.nom, prenom:req.body.prenom,idProfesseur:req.body.idProfesseur,idClasse:req.body.idClasse})})
                var localEleve =  await prisma.$queryRaw`Select idEleve from eleves where Nom=${req.body.nom} and Prenom=${req.body.prenom}`
                
                var Existing = await prisma.$queryRaw`Select * from resultats_toeic where idEleve=${localEleve[0].idEleve} AND numToeic=${localToeic[0].idToeic}`
                
            }else{

                await fetch( "http://localhost:3000"+'/api/eleves/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'POST',body:JSON.stringify({nom:req.body.nom, prenom:req.body.prenom})})
                var localEleve =  await prisma.$queryRaw`Select idEleve from eleves where Nom=${req.body.nom} and Prenom=${req.body.prenom}`
               
                var Existing = await prisma.$queryRaw`Select * from resultats_toeic where idEleve=${localEleve[0].idEleve} AND numToeic=${req.body.idToeic}`
            }
            
            
           
            if(Existing.length == 0){ // on verifie que l'élèves est bien unique
                const savedResult = await prisma.resultats_toeic.create({
                    data: {
                        idEleve:localEleve[0].idEleve,
                        numToeic:(req.body.idToeic != undefined ? req.body.idToeic : localToeic[0].idToeic),
                        scorePart1:parseInt(req.body.Partie1),
                        scorePart2:parseInt(req.body.Partie2),
                        scorePart3:parseInt(req.body.Partie3),
                        scorePart4:parseInt(req.body.Partie4),
                        scorePart5:parseInt(req.body.Partie5),
                        scorePart6:parseInt(req.body.Partie6),
                        scorePart7:parseInt(req.body.Partie7),

                    },
                })
                res.json(savedResult)
                
            }else{
                res.json("Erreur - Toeic existant")
            }
            break

        
        case 'GET' :
                const data = await prisma.$queryRaw("Select * from resultats_toeic")           
                res.json(data)
            break

        case 'DELETE' :
            const deleteResultat = await prisma.resultats_toeic.deleteMany({
                where: {
                    idResultatToeic: req.body.idResultatToeic,
                  },
            }) 
            res.json(deleteResultat)
            break

        case 'PUT' :
            const modifi = await prisma.resultats_toeic.update({
                where: {idResultatToeic: req.body.idResultatToeic
                },
                data: {
                    scorePart1: req.body.scorePart1,
                    scorePart2: req.body.scorePart2,
                    scorePart3: req.body.scorePart3,
                    scorePart4: req.body.scorePart4,
                    scorePart5: req.body.scorePart5,
                    scorePart6: req.body.scorePart6,
                    scorePart7: req.body.scorePart7
                },
            });
            res.json(modifi)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}