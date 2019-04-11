// this component will list all the points of interests
import domBuilder from "./travelDomHtmlBuilder"

const listPoints = {
    listAllThePoints: (pointArray) => {
        const headerDiv = domBuilder.htmlFactory("div","card-text", "header-divPoints", "Points of Interests");
        const pointContainer = document.querySelector("#interests-container");
        pointContainer.appendChild(headerDiv)
        pointArray.forEach(pointObject => {
            //  push each obj to the interest builder to build the html and append to dom
            domBuilder.pointOfInterestBuilder(pointObject)
        });
    }
}


export default listPoints