// this component will handle all the events associated with the application
import api from "./travelApiManager"
import domBuilder from "./travelDomHtmlBuilder"
import listPoints from "./listPointsOfInterests"

// this factory function will create a new point of interest
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

// this factory function will return the patch obj of a point of interest
const editedInterest = (cost, review) => {
    return {
        "cost": cost,
        "review": review
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
            const cardContainer = document.querySelector(`#card--${interestId}`);
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
            // .then(() => alert("Deleted point of interest!"))
            alert("Deleted point of interest!")
        }
    },
    handleSaveEdit: () => {
        // this function will handle the save of an edited point of interest
        const interestId = event.target.id.split("--")[1];
        const editedCost = document.querySelector(`#edit-cost--${interestId}`)
        const editedReview = document.querySelector(`#edit-review--${interestId}`)
        let updatedInterest = editedInterest(Number(editedCost.value), editedReview.value);
        
        //make the call to api to do a patch and update the db
        api.patchInterest(interestId, updatedInterest)
        .then(() => {
            // clear out the container and repopulate it 
            const mainCardContainer = document.querySelector("#interests-container");
            domBuilder.clearElements(mainCardContainer)
        })
        .then(() => {
            // make the call to append that interest back to it's container
            api.getInterests().then(arrayPoints => listPoints.listAllThePoints(arrayPoints))
        })
        
    }
}

export default handler;