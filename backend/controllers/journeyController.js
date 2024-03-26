const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createJourney = async (req, res) => {
    try{
        var {indulas, indulasiHely, veg, uticel, ar, jarmu} = req.body;

        if(!indulas || !indulasiHely || !veg || !uticel || !ar || !jarmu){
            res.json({message: "Hiányzó adatok!", journey: {
                indulas,
                indulasiHely,
                veg,
                uticel,
                ar,
                jarmu
            }});
            return;
        }

        indulas = new Date(indulas);
        veg = new Date(veg);

        const journey = await prisma.ut.create({
            data:{
                indulas: indulas,
                indulasiHely: indulasiHely,
                veg: veg,
                uticel: uticel,
                ar: ar,
                jarmu: jarmu,
                tervezoId: req.user.id
            }
        })

        res.json({message: "Út létrehozva!"})

    } catch(error) {
        res.json({message: error.message})
    }
}

const getAllJourneys = async (req, res) => {
    try {
        const journeys = await prisma.ut.findMany(
            {
                select:{
                    id: true,
                    indulas: true,
                    indulasiHely: true,
                    veg: true,
                    uticel: true,
                    ar: true,
                    jarmu: true,
                    tervezo: {
                        select:{
                            nev: true,
                        }
                    }
                    
                }
            }
        );
        res.json(journeys);
    } catch (error) {
        res.json({message: error.message});
    }
}

const removeJourney = async (req, res) => {
    try {
        var {utId} = req.params;
        const {tervezoId} = req.user.id;

        utId = Number(utId);

        const journey = await prisma.ut.delete(
            {
                where:{
                    id: utId,
                    tervezoId: tervezoId
                }
            }
        )

        res.json({message: "Út sikeresen törölve!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports = 
{
    createJourney,
    getAllJourneys,
    removeJourney
}