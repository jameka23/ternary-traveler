// this is the main js file that will make one call and that call will have 
// a domino effect that will create the places html
import api from "././travelScripts/travelApiManager"
import buildHTML from "./travelScripts/travelDomHtmlBuilder"

// console.log("Hey, girl")
// make the call to get all places
api.getPlaces().then(places => buildHTML.placesBuilder(places));