const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const joinJourney = async(req, res) =>{
    try {
        var { utId } = req.params;

        utId = Number(utId);

        if(!utId){
            res.json({message: 'Hiányzó adatok'});
            return;
        }

        const ut = await prisma.ut.findUnique({
            where: {
                id: utId
            }
        })

        if(!ut.id){
            res.json({message: 'Nem létező út!'});
            return;
        }

        const utazas = await prisma.utazas.create({
            data: {
                floId: req.user.id,
                utId: ut.id
            }
        })
        res.json({message: "Sikeresen csatlakozott az utazáshoz!"});
    } catch (error) {
        res.json({message: error.message});
    }
}

const getMyJourneys = async(req, res) => {
    try {
        const journeys = await prisma.ut.findMany(
            {
                where: {
                    tervezoId: req.user.id
                },
                select: {
                    id: true,
                    indulas: true,
                    indulasiHely: true,
                    veg: true,
                    uticel: true,
                    ar: true,
                    jarmu: true,
                }
            }
        )
        res.json({journeys: journeys});
    } catch (error) {
        res.json({message: error.message})
    }
}

const getPassengers = async(req, res) => {
    try {
        var {utazasId} = req.params;
        utazasId = Number(utazasId);

        let utasok = await prisma.utazas.findMany({
            where: {
                utId: utazasId
            },
            select: {
                felhasznalo: {
                    select: {
                        id: true,
                        nev: true,
                        email: true,
                        telszam: true,
                    }
                }
            }
        });
        res.json(utasok);
    } catch (error) {
        res.json({message: error.message})
    }
}

const leaveJourney = async(req, res) => {
    try {
        var {utId} = req.params;
        const userId = req.user.id;
        utId = Number(utId);

        const ut = await prisma.ut.findFirst({
            where: {
                id: utId
            }
        })
        
        const utazas = await prisma.utazas.delete({
            where: {
                id:{
                    utId: ut.id,
                    floId: userId
                }
            }
        })

        res.json({message: 'Sikeresen elhagyta az utazást!'})
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports = {
    joinJourney,
    getMyJourneys,
    getPassengers,
    leaveJourney
};