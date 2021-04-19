import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){

        case 'POST':
        
            var localNom = req.body.nom.toUpperCase()
            var localPrenom = req.body.prenom.toLowerCase()
            localPrenom = localPrenom.replace(localPrenom.charAt(0),localPrenom.charAt(0).toUpperCase())

            const Existing = await prisma.$queryRaw`Select * from eleves where Nom=${localNom} AND Prenom=${localPrenom}`
            
            if(Existing.length == 0 && isNaN(parseInt(req.body.prenom))){ // on verifie que l'élèves est bien unique & que c'est pas un chiffre

                var savedEleves = await prisma.eleves.create({
                    data: {
                        nom: localNom,
                        prenom: localPrenom,
                    },
                })
                
            }
            
            //Ajoutes des Composantes Falcutatives 

            if(req.body.idProfesseur != undefined){
                await prisma.$queryRaw`UPDATE eleves SET idProfesseur = ${req.body.idProfesseur} WHERE nom=${req.body.nom} and prenom=${req.body.prenom}`
            }
            if(req.body.idClasse != undefined){
                await prisma.$queryRaw`UPDATE eleves SET idClasse = ${req.body.idClasse} WHERE nom=${req.body.nom} and prenom=${req.body.prenom}`
            }

            res.json(savedEleves)

            break

        
        case 'GET' :
                const eleveData = await prisma.$queryRaw("Select idEleve , Nom , Prenom , idClasse , idProfesseur from eleves")           
                res.json(eleveData)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break

    }
    
    await prisma.$disconnect()
}
