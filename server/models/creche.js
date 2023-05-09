const mongoose = require('mongoose');

const CrecheSchema = new mongoose.Schema({
    nom : {
        type: String,
        required: true
    },
    adresse : {
        type: String,
        required: true
    },
    TypeAccueil : {
        type : String,
        enum :['Régulier', 'Occasionnel','Autre'],
        required : true
    },
    JourAccueil : {
        type : [String],
        enum : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        required: true
    },
    TypeEtablissement : {
        type : String,
        enum : ['Privé', 'Public' , 'Autre'],
        required: true},
    Capacite : {
        type: Number,
        required: true
    },
    AgeAccueilmin : {
        type: Number,
        required: true
    },
    AgeAccueilmax : {
        type: Number,
        required: true
    },
    Pedagogie : {
        type : String,
        enum : ['Montessori', 'Autre'],
        required: true
    },
    PlacesDisponibles : {
        type: Number,
        required: true
    },
    Services : {
        type : [String],
        enum : ['Transport', 'Alimentation', 'Autre'],
        required: true
    },
    Numero : {
        type: String,
        required: true
    },
    CordonneeX : {
        type: Number,
        required: true
    },
    CordonneeY : {
        type: Number,
        required: true
    },
    Images : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        }
    ],
    Avis : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Avis',
        }
    ],
    NoteEvaluationTotal : {
        type: Number,
    },
    agenda : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenda',
    },
    Proprietaire : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = Creche = mongoose.model('Creche', CrecheSchema);