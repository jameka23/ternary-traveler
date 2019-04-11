// this component will handle all the events associated with the application
import api from "./travelApiManager"
import domBuilder from "./travelDomHtmlBuilder"
import listPoints from "./listPointsOfInterests"

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
        const interestId = Number(event.target.parentNode.id.split("--")[1]);
        const placeName = event.target.id.split("--")[1];

        // call the function to build the form;
        domBuilder.formBuilder(interestId, placeName)
    },
    handleSaveInterest: () => {
        //this handler will save the point of interest
        const interestName = document.getElementById("name").value;
        const interestDescription = document.getElementById("description").value;
        const interestCost = document.getElementById("cost").value;
        const placeId = Number(event.target.id.split("--")[1]);
        
        //call factory function to make new interest object and pass to the post fuction
        const newInterest = createNewInterest(placeId, interestName, interestDescription, interestCost);
        api.postNewInterest(newInterest).then(() => {
            //refresh the container with the new interests 
            const mainContainer = document.querySelector("#interests-container");
            domBuilder.clearElements(mainContainer);
            const mainPlaceContainer = document.querySelector("#place-container");
            domBuilder.clearElements(mainPlaceContainer)

            // then repopulate that section
            api.getInterests()
            .then(parsedArray => listPoints.listAllThePoints(parsedArray))
            .then(api.getPlaces().then(places => domBuilder.placesBuilder(places)))
        })
    },
    handleEdit: () => {
        console.log("edit pressed");
        console.log(event.target.id);
        const interestId = Number(event.target.id.split("--")[1]);
        api.getSingleInterest(interestId)
        .then(interestObj => {
            const cardContainer = document.querySelector("#interest-body");
            domBuilder.clearElements(cardContainer)
            domBuilder.editBuilder(interestObj)
        })
    },
    handleDelete: () => {
        // this function will handle deleting an interest but will show a confirm 
        const interestId = event.target.id.split("--")[1];
        const confrimed = confirm("Are you sure you want to delete?");
        // if user confirms delete, delete interest and repopulate
        if(confrimed){
            api.deleteInterest(interestId)
            .then(()=>{
                // clear out the list of interests 
                const mainContainer = document.querySelector("#interests-container");
                domBuilder.clearElements(mainContainer);
            })
            .then(()=>{
                api.getInterests()
                .then(parsedArray => listPoints.listAllThePoints(parsedArray))
            })
        }
    },
    handleSaveEdit: () => {
        // this function will handle the save of an edited point of interest
    }
}

export default handler;