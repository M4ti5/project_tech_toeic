import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        const toeicData = await prisma.$queryRaw`Select *  from toeics where idToeic=${req.query.id}`  
        res.json(toeicData)
    break
    }
    await prisma.$disconnect()
}