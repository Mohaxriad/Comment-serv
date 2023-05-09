async function ParseQueryString( req,response,next) {
    const filters ={}
    let geoFilter={}
    const queryParams =req.query;
  
 try{ 
    // queries For the entered Text in the Search bar
  
    if(queryParams.SearchBarInput){
      Object.assign(filters,{$text:{
          $search: queryParams.SearchBarInput
        }})

      }
    
    
    // queries For Filter Selections
    if(queryParams.commune){
      filters.commune = queryParams.commune;
    }
  
    if(queryParams.wilaya){
      filters.wilaya = queryParams.wilaya;
    }
  
    if(queryParams.TypeAccueil){
      filters.TypeAccueil = queryParams.TypeAccueil;
    }
  
    if(queryParams.TypeEtablissement){
      filters.TypeEtablissement = queryParams.TypeEtablissement;
    }
  
    if(queryParams.capacite){
      filters.capacite = parseInt(queryParams.capacite);
    }
  
    if(queryParams.Age){
      filters.AgeAccueilmin = {$lte: parseInt(queryParams.Age)}
      filters.AgeAccueilmax = {$gte: parseInt(queryParams.Age)}
  
    }
  
    if(queryParams.Pedagogie){
      filters.Pedagogie = queryParams.Pedagogie;
    }
  
    if(queryParams.JourAccueil){
      filters.JourAccueil = {$all: queryParams.JourAccueil.split(',')}
    }
  
    if(queryParams.PlacesDisponibles){
      filters.PlacesDisponibles = parseInt(queryParams.PlacesDisponibles);
    }
  
  
  
    if(queryParams.Services){
      filters.Services = {$all: queryParams.Services.split(',')}
    }
  
    if(queryParams.Mixite){
      filters.Mixite = queryParams.Mixite;
    }
  
    if(queryParams.Langue){
      filters.Langue = queryParams.Langue;
    }
  
    if(queryParams.NoteEvaluationTotal){
      filters.NoteEvaluationTotal = {$gte: parseInt(queryParams.NoteEvaluationTotal)};
    }
  
  // Test if the filter Object is Empty
    if(!(Object.keys(filters).length === 0)){
      req.filters = filters;
    }
  
  
    // queries for geoLocation 
    if(queryParams.longitude && queryParams.latitude){
      const coords = [+queryParams.longitude,+queryParams.latitude]
      if(queryParams.Distance){
          geoFilter ={
              location: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: coords,
                    },
                    $maxDistance: parseInt(queryParams.Distance),
                  },
                }
              } 
      }else{
          geoFilter ={
              location: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: coords,
                    },
                    $maxDistance: 1000,
                  },
                }
              } 
      }
      req.geoFilter = geoFilter;
    }
        next()

   }catch(err){
        console.error(err);
        response.status(400).send('Request Parsing problem');
   }
  

  
  
  }
  
  
  
  
  
  module.exports={ParseQueryString}