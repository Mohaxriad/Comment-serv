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

    wilaya : {
        type: String,
        required: true
    },

    commune : {
        type: String,
        required: true
    },
    TypeAccueil : {
        type : String,
        enum :['Regulier', 'Occasionnel','Les deux'],
        required : true
    },
    JourAccueil : {
        type : [String],
        enum : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        required: true
    },
    TypeEtablissement : {
        type : String,
        enum : ['Prive', 'Etatique'],
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
        enum : ['Montessori', 'Methode classique','Autre'],
        required: true
    },
    PlacesDisponibles : {
        type: Number,
        required: true
    },
    Services : {
        type : [String],
        enum : ['Transport', 'Alimentation', 'Annee Preparatoire','Medecin','Cas special'],
        required: true
    },

    location: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          required: true
        }
        
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
        default:0
    },
    agenda : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenda',
        default:null
    },
    Proprietaire : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:null

    },

    Mixite : {
        type: String,
        enum:['Garcons','Filles','Mixte'],
        required: true
    },

    Langue : {
        type: String,
        enum:['Anglais','Francais','Arabe'],
        required: true
    }
});

CrecheSchema.index({location:"2dsphere"})
CrecheSchema.index({nom:'text',adresse:'text',wilaya:'text',commune:'text'})
module.exports = mongoose.model('Creche', CrecheSchema,'Creches');