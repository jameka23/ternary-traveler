// this component will list all the points of interests
import domBuilder from "./travelDomHtmlBuilder"

const listPoints = {
    listAllThePoints: (pointArray) => {
        pointArray.forEach(pointObject => {
            //  push each obj to the interest builder to build the html and append to dom
            domBuilder.pointOfInterestBuilder(pointObject)
        });
    }
}


export default listPoints