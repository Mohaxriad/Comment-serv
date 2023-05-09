const Avis = require('../models/AvisSchema')
const mongoose = require('mongoose')


async function commenter(req,response){




    const user=req.user;
    const idCreche = req.body.idCreche;
    const idUser = new mongoose.Types.ObjectId(user.id)

    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)
    const existingAvis = await Avis.findOne({
        IdUser:idUser,
        IdCreche:idCreche,

    })


    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NameUser: user.username,
                commentaire: [req.body.comm] ,
                IdUser: idUser,
                IdCreche:ConcernedCreche,
            });

            await newAvis.save()
            response.json(newAvis)
        }else{
            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {$push:{
                        commentaire:req.body.comm
                    }})

            response.json("Comment inserted successfully")

        }}catch(error){
        console.log(error)
    }

}

async function Evaluer(req,response){


    const idUser = req.user.id;
    const idCreche = req.body.idCreche;

    const user = new mongoose.Types.ObjectId(idUser)
    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)

    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})


    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,

            });

            await newAvis.save()
            response.json("Note Evaluation inserted successfully")

        }else{
            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {
                    NoteEvaluation: req.body.NoteEvaluation,
                })
            response.json("Note Evaluation inserted successfully")

        }}catch(error){
        console.log(error)
    }
}


async function CommenterEtEvaluer(req,response){


    const idUser = req.user.id;
    const idCreche = req.body.idCreche;

    const user = new mongoose.Types.ObjectId(idUser)
    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)

    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})

    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                commentaire: [req.body.comm] ,
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,
            });

            await newAvis.save()
            response.json(newAvis)

        }else{

            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {$push:{
                        commentaire:req.body.comm
                    },
                    NoteEvaluation: req.body.NoteEvaluation,
                })

            response.json("Note Evaluation and comment inserted successfully")

        }}catch(error){

        console.log(error)

    }
}


async function GiveAvis(req,response){

    try{
        if(req.body.comm && req.body.NoteEvaluation){
            CommenterEtEvaluer(req,response);
        }else{
            if(req.body.comm){
                commenter(req,response);
            }else{
                if(req.body.NoteEvaluation){
                    Evaluer(req,response);
                }else{
                    response.send("Invalid Avis, provide a comment or an evaluation")
                }
            }

        }

    }catch(err){
        response.status(400).send(err)
    }
}
async function getAvis(req,res){

    const SomeAvis = await Avis.find()
    res.json(SomeAvis)
}

async function deelete(req, res) {
    try {
        const id = req.params.id;
        const result = await Avis.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}


















module.exports= {GiveAvis,getAvis,deelete}