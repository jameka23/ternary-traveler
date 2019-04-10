// this component will handle all the events associated with the application
import api from "./travelApiManager"
import domBuilder from "./travelDomHtmlBuilder"

const handler = {
    handleNewPointOfInterest: () => {
        // this handler will create a new point of interest and add it to the points of interest container
        const interestId = event.target.parentNode.id.split("--")[1];
        
        // call the function to build the form;
        domBuilder.formBuilder(interestId)
    },
    handleSaveInterest: () => {

    }
}

export default handler;