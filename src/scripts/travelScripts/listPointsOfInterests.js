// this component will list all the points of interests
import domBuilder from "./travelDomHtmlBuilder"

const listPoints = {
    listAllThePoints: (pointArray) => {
        pointArray.forEach(pointObject => {
            console.log(pointObject)
            domBuilder.pointOfInterestBuilder(pointObject)
        });
    }
}


export default listPoints