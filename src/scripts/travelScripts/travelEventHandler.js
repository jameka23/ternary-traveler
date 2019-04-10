// this component will handle all the events associated with the application
import api from "./travelApiManager"
import domBuilder from "./travelDomHtmlBuilder"

const createNewInterest = (placeId, name, desc, cost, review) => {
    if(review){
        return {
            "placeId": placeId,
            "name": name,
            "description": desc,
            "cost": cost,
            "review": review
        }
    }else{
        return {
            "placeId": placeId,
            "name": name,
            "description": desc,
            "cost": cost,
            "review": ""
        }
    }

}

const handler = {
    handleNewPointOfInterest: () => {
        // this handler will create a new point of interest and add it to the points of interest container
        const interestId = event.target.parentNode.id.split("--")[1];
        const placeName = event.target.id.split("--")[1];
        console.log(placeName)
        
        // call the function to build the form;
        domBuilder.formBuilder(interestId, placeName)
    },
    handleSaveInterest: () => {
        //this handler will save the point of interest

        //clear the container and go back to showing the places 
        const mainContainer = document.querySelector("#place-container");
        domBuilder.clearElements(mainContainer);
        api.getPlaces().then(places => buildHTML.placesBuilder(places));


        const interestName = document.querySelector("#name");
        const interestDescription = document.querySelector("#description");
        const interestCost = document.querySelector("#cost");
        const placeId = event.target.parentNode.id.split("--")[1];

        console.log(interestName.value, interestDescription.value, Number(interestCost.value), interestId);
        const newInterest = createNewInterest(placeId, interestName, interestDescription, interestCost);
        api.postNewInterest(newInterest).then(() => {
            //refresh the container with the new interests 
        })

    }
}

export default handler;