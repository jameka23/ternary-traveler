// this is the main js file that will make one call and that call will have 
// a domino effect that will create the places html
import api from "././travelScripts/travelApiManager"
import buildHTML from "./travelScripts/travelDomHtmlBuilder"
import listInterests from "./travelScripts/listPointsOfInterests"


// make the call to get all places and interests
api.getPlaces().then(places => buildHTML.placesBuilder(places));
api.getInterests().then(points => listInterests.listAllThePoints(points));