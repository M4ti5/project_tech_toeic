import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'POST':
        
            var localNom = req.body.Nom.toUpperCase()
            var localPrenom = req.body.Prenom.toLowerCase()
            localPrenom = localPrenom.replace(localPrenom.charAt(0),localPrenom.charAt(0).toUpperCase())

            const Existing = await prisma.$queryRaw`Select * from eleves where Nom=${localNom} AND Prenom=${localPrenom}`
           
            if(Existing.length == 0){ // on verifie que l'élèves est bien unique
                
                const savedEleves = await prisma.eleves.create({
                    data: {
                        Nom: localNom,
                        Prenom: localPrenom,
                    },
                })
                res.json(savedEleves)
            }else{
                res.json("Erreur - Eleves existant")
            }
            break

        
        case 'GET' :
                const eleveData = await prisma.$queryRaw("Select idEleve , Nom , Prenom , idClasse , idGroupe , idProfesseur from eleves")           
                res.json(eleveData)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break

    }
    
    await prisma.$disconnect()
}
