const Creche = require('../models/creche');
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const User = require('../models/user');
const {stringify} = require("nodemon/lib/utils");

const createCreche = asyncHandler(async (req, res) => {
    const {
        nom,
        adresse,
        TypeAccueil,
        JourAccueil,
        TypeEtablissement,
        Capacite,
        AgeAccueilmin,
        AgeAccueilmax,
        Pedagogie,
        PlacesDisponibles,
        Services,
        Numero,
        Url
    } = req.body;
    // test if any field is empty
    if (!nom || !adresse || !TypeAccueil || !JourAccueil || !TypeEtablissement || !Capacite || !AgeAccueilmin || !AgeAccueilmax || !Pedagogie || !PlacesDisponibles || !Services || !Numero || !Url) {
        // specify which fied is empty
        if (!nom) {
            res.status(400).json({message: 'Nom is required'});
        }
        if (!adresse) {
            res.status(400).json({message: 'Adresse is required'});
        }
        if (!TypeAccueil) {
            res.status(400).json({message: 'TypeAccueil is required'});
        }
        if (!JourAccueil) {
            res.status(400).json({message: 'JourAccueil is required'});
        }
        if (!TypeEtablissement) {
            res.status(400).json({message: 'TypeEtablissement is required'});
        }
        if (!Capacite) {
            res.status(400).json({message: 'Capacite is required'});
        }
        if (!AgeAccueilmin) {
            res.status(400).json({message: 'AgeAccueilmin is required'});
        }
        if (!AgeAccueilmax) {
            res.status(400).json({message: 'AgeAccueilmax is required'});
        }
        if (!Pedagogie) {
            res.status(400).json({message: 'Pedagogie is required'});
        }
        if (!PlacesDisponibles) {
            res.status(400).json({message: 'PlacesDisponibles is required'});
        }
        if (!Services) {
            res.status(400).json({message: 'Services is required'});
        }
        if (!Numero) {
            res.status(400).json({message: 'Numero is required'});
        }
        if (!Url) {
            res.status(400).json({message: 'Url is required'});
        }
    }
    // test if the creche already exists
    const creche = await Creche.findOne({nom, adresse});
    if (creche) {
        res.status(409).json({message: 'Creche already exists'});
    }
    // create the creche
    else {
        const id = req.user.id;

        //associate the creche with the user with that id
        const Proprietaire = await new mongoose.Types.ObjectId(id);
        // get the coordinates of the address from the google maps url and convert them to numbers
        const CordonneeX = Number(Url.substring(Url.indexOf('@') + 1, Url.indexOf(',')));
        const CordonneeY = Number(Url.substring(Url.indexOf(',') + 1, Url.indexOf(',') + 8));
        const user = await User.findOne({_id: id});
        try {
            const newCreche = await Creche.create({
                nom,
                adresse,
                TypeAccueil,
                JourAccueil,
                TypeEtablissement,
                Capacite,
                AgeAccueilmin,
                AgeAccueilmax,
                Pedagogie,
                PlacesDisponibles,
                Services,
                Numero,
                CordonneeX,
                CordonneeY,
                Proprietaire: Proprietaire,
            });
            // add the crech to the user's list of creches

            user.liste_creches.push(newCreche);

            await user.save();
            return res.status(201).json({message: 'Creche created successfully', newCreche});
        } catch (error) {
            return res.status(400).json({message: 'Invalid creche', error:error.message});
        }
    }
});

const deleteCreche = asyncHandler(async (req, res) => {
    const creche = await Creche.findOne({_id: req.params.id});
    const id = stringify(req.user.id);
    const x = stringify(creche.Proprietaire);
    //compare x and id and make sure that they are the same type
    if (x !== id) {
        res.status(401);
        throw new Error('You are not authorized to delete this creche');
    }
    if (creche) {
        await creche.deleteOne();
        // delete the creche from the user's list of creches
        const user = await User.findById(req.user.id);
        //liste_creches is an array of object ids so we need to convert the id of the creche to an object id
        const crecheId = new mongoose.Types.ObjectId(req.params.id);
        // remove the creche from the user's list of creches and save the user
        user.liste_creches.pull(crecheId);
        await user.save();
        res.status(201).json({message: 'Creche removed'});
    } else {
        res.status(404);
        throw new Error('Creche not found');
    }
});

const updateCreche = asyncHandler(async (req, res) => {
    const creche = await Creche.findOne({_id: req.params.id});
    const id = stringify(req.user._id);
    const x = stringify(creche.Proprietaire);
    //compare x and id and make sure that they are the same type
    if (x !== id) {
        res.status(401);
        throw new Error('You are not authorized to update this creche');
    }
    // we send the creche info as a response to the front end
    if (creche) {
        res.json(creche);
        const {
            nom,
            adresse,
            TypeAccueil,
            JourAccueil,
            TypeEtablissement,
            Capacite,
            AgeAccueilmin,
            AgeAccueilmax,
            Pedagogie,
            PlacesDisponibles,
            Services,
            Numero,
            Url
        } = req.body;
        // test if any field is empty
        if (!nom || !adresse || !TypeAccueil || !JourAccueil || !TypeEtablissement || !Capacite || !AgeAccueilmin || !AgeAccueilmax || !Pedagogie || !PlacesDisponibles || !Services || !Numero || !Url) {
            // specify which fied is empty
            if (!nom) {
                res.status(400).json({message: 'Nom is required'});
            }
            if (!adresse) {
                res.status(400).json({message: 'Adresse is required'});
            }
            if (!TypeAccueil) {
                res.status(400).json({message: 'TypeAccueil is required'});
            }
            if (!JourAccueil) {
                res.status(400).json({message: 'JourAccueil is required'});
            }
            if (!TypeEtablissement) {
                res.status(400).json({message: 'TypeEtablissement is required'});
            }
            if (!Capacite) {
                res.status(400).json({message: 'Capacite is required'});
            }
            if (!AgeAccueilmin) {
                res.status(400).json({message: 'AgeAccueilmin is required'});
            }
            if (!AgeAccueilmax) {
                res.status(400).json({message: 'AgeAccueilmax is required'});
            }
            if (!Pedagogie) {
                res.status(400).json({message: 'Pedagogie is required'});
            }
            if (!PlacesDisponibles) {
                res.status(400).json({message: 'PlacesDisponibles is required'});
            }
            if (!Services) {
                res.status(400).json({message: 'Services is required'});
            }
            if (!Numero) {
                res.status(400).json({message: 'Numero is required'});
            }
            if (!Url) {
                res.status(400).json({message: 'Url is required '});
            }
        }
        // test if the creche already exists
        const newCreche = await Creche.findOne({nom, adresse});
        if (newCreche) {
            return res.status(409).json({message: 'Creche already exists'});
        }
        // update the creche
        else {
            // get the coordinates of the address from the google maps url and convert them to numbers
            const CordonneeX = Number(Url.substring(Url.indexOf('@') + 1, Url.indexOf(',')));
            const CordonneeY = Number(Url.substring(Url.indexOf(',') + 1, Url.indexOf(',') + 8));
            try {
                const updatedCreche = await Creche.updateOne(
                    {_id: req.params.id},
                    {
                        $set: {
                            nom,
                            adresse,
                            TypeAccueil,
                            JourAccueil,
                            TypeEtablissement,
                            Capacite,
                            AgeAccueilmin,
                            AgeAccueilmax,
                            Pedagogie,
                            PlacesDisponibles,
                            Services,
                            Numero,
                            CordonneeX,
                            CordonneeY,
                        }
                    }
                );
                return res.status(201).json({message: 'Creche updated successfully', updatedCreche});
            } catch (error) {
                return res.status(400).json({message: 'Invalid creche', error});
            }
        }
    }
    else {
        return res.status(400).json({message : 'creche not found '})
    }
});
async function getCreatedCreches(user){
    //get all creches that are owned by the user as a table containing the creches
    //the user has a tablr that contains the ref of the creches that he owns
    //send the table to the front end
    return await Creche.find({_id: user.liste_creches});

}
async function getSavedCreches(user) {
    //get all creches that are saved by the user as a table containing the creches
    //the user has a tablr that contains the ref of the creches that he saved
    //send the table to the front end
    return await Creche.find({_id: user.crechesauvgardes})
}


module.exports = {
    createCreche,
    deleteCreche,
    updateCreche,
    getCreatedCreches,
    getSavedCreches
}
