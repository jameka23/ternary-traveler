// this component will build the main html section 
import handlers from "./travelEventHandler"
import handler from "./travelEventHandler";

/*
<div class="card">
  <h5 class="card-header">Featured</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
*/

const DomBuilder = {
    htmlFactory: (element, elementClass, elementId, elementTextContent, elementFor) => {
        // this method will make the general html builder
        const elem = document.createElement(element);
        
        if(elementClass){ //if it has a class, declare one
            elem.className = elementClass;
        }
        if(elementId){ //if it has an id, declare one
            elem.id = elementId;
        }
        if(elementTextContent){
            elem.textContent = elementTextContent
        }
        if(elementFor){
            elem.for = elementFor;
        }

        return elem;
    },
    clearElements: (theContainer) => {
        // this function will clear out the container
        while(theContainer.firstChild){
            theContainer.removeChild(theContainer.firstChild)
        }
    },
    formBuilder: (interestId, placeName) => {
        // this function will build the form for points of interests, which will clear out the places container and 
        // show the form 
        const placesContainer = document.querySelector("#place-container");
        const formHeader = DomBuilder.htmlFactory("div", undefined, "header-div", `Point of Interest for: ${placeName}`);
        const formArticle = DomBuilder.htmlFactory("form", "form-places", `place--${interestId}`, undefined);
        //first clear out the container 
        DomBuilder.clearElements(placesContainer);

        const formNameDiv = DomBuilder.htmlFactory("div","form-group");
        const formNameLabel = DomBuilder.htmlFactory("label",undefined, undefined, "Name of Point of Interest", "name")
        const formName = DomBuilder.htmlFactory("input", "form-control", "name", undefined, undefined);
        formName.placeholder = "Enter name of point of interest"
        formNameDiv.appendChild(formNameLabel);
        formNameDiv.appendChild(formName);

        const formDescriptionDiv = DomBuilder.htmlFactory("div","form-group");
        const formDescriptionLabel = DomBuilder.htmlFactory("label",undefined, undefined, "Description", "description")
        const formDescription = DomBuilder.htmlFactory("textarea", "form-control", "description", undefined, undefined)
        formDescription.placeholder = "Enter a description";
        formDescriptionDiv.appendChild(formDescriptionLabel);
        formDescriptionDiv.appendChild(formDescription);
        
        const formCostDiv = DomBuilder.htmlFactory("div","form-group");
        const formCostLabel = DomBuilder.htmlFactory("label",undefined, undefined, "Cost", "cost")
        const formCost = DomBuilder.htmlFactory("input", "form-control", "cost", undefined, undefined);
        formCost.type = "number"
        formCost.placeholder = "Enter a cost";
        formCostDiv.appendChild(formCostLabel);
        formCostDiv.appendChild(formCost);

        const formButton = DomBuilder.htmlFactory("button", "btn btn-primary", `save-place--${interestId}`, "Save");
        formButton.type = "button"
        formButton.addEventListener("click",handlers.handleSaveInterest);

        formArticle.appendChild(formNameDiv);
        formArticle.appendChild(formDescriptionDiv);
        formArticle.appendChild(formCostDiv);
        formArticle.appendChild(formButton);

        //append article to container 
        placesContainer.appendChild(formHeader)
        placesContainer.appendChild(formArticle);
    },
    placesBuilder: (placesArray) => {
        // this is the function that will build the places interest cards that will be appended to the places container
        // grab all the places

        const placesContainer = document.querySelector("#place-container");
        const placeDomFrag = document.createDocumentFragment();
        const mainRow = DomBuilder.htmlFactory("div", "card-group", "main-row", undefined);
        const hr = DomBuilder.htmlFactory("hr");
        const headerDiv = DomBuilder.htmlFactory("div","card-text", "header-div", "Places");


        placesArray.forEach(placeObj => {
            // console.log(placeObj)
            // const placeCol = DomBuilder.htmlFactory("div","col-sm-6", undefined, undefined);
            const placeCard = DomBuilder.htmlFactory("div", "card w-75", `place-card--${placeObj.id}`, undefined);
            const placeCardBody = DomBuilder.htmlFactory("div", "card-body", `place-body--${placeObj.id}`, undefined);
            const placeH3 = DomBuilder.htmlFactory("h3", "card-title", `place--${placeObj.id}`, `${placeObj.name}`);
            const newInterestButton = DomBuilder.htmlFactory("button", "btn btn-info", `place-button--${placeObj.name}`, "New Interest");
            newInterestButton.addEventListener("click", handlers.handleNewPointOfInterest);

            //append to dom frag
            placeCardBody.appendChild(placeH3);
            placeCardBody.appendChild(newInterestButton);
            placeCard.appendChild(placeCardBody);
            placeDomFrag.appendChild(placeCard);
        });
        // console.log(placeDomFrag)
        // append main row and dom frag 
        mainRow.appendChild(placeDomFrag);
        placesContainer.appendChild(headerDiv)
        placesContainer.appendChild(mainRow);
        placesContainer.appendChild(hr);

        
    },
    pointOfInterestBuilder: (interestObj) => {
        // this function will build the points of interest cards that will be appened in the points of interest container
        const pointContainer = document.querySelector("#interests-container");
        const mainDeck = DomBuilder.htmlFactory("div", "card-deck");
        
        const card = DomBuilder.htmlFactory("div", "card", `card--${interestObj.id}`);
        const cardBody = DomBuilder.htmlFactory("div", "card-body", "interest-body", );
        const h3Name = DomBuilder.htmlFactory("h3", "card-title", "interest-id", `${interestObj.name}`)
        const h5Place = DomBuilder.htmlFactory("h5", "card-text", `place-id--${interestObj.place.id}`, `${interestObj.place.name}`);
        const pDescription = DomBuilder.htmlFactory("p", "card-text", "interest-desc", `${interestObj.description}`);
        const pCost = DomBuilder.htmlFactory("p", "card-text", "interest-cost", `$${interestObj.cost}`);
        pCost.type = "number"
        const buttonDiv = DomBuilder.htmlFactory("div", "btn-group");
        buttonDiv.role = "group";
        
        const editButton = DomBuilder.htmlFactory("button", "btn btn-warning", `edit-interest--${interestObj.id}`, "Edit");
        editButton.addEventListener("click", handlers.handleEdit);
        const deleteButton = DomBuilder.htmlFactory("button","btn btn-danger", `delete-interest--${interestObj.id}`, "Delete");
        deleteButton.addEventListener("click", handlers.handleDelete);

        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        cardBody.appendChild(h3Name);
        cardBody.appendChild(h5Place);
        cardBody.appendChild(pDescription);
        cardBody.appendChild(pCost);
        cardBody.appendChild(buttonDiv);
        card.appendChild(cardBody);
        mainDeck.appendChild(card);
        pointContainer.appendChild(mainDeck);
    },
    editBuilder: (editObj) => {
        // this method will create the edit feature that will pop up
        const cardContainer = document.querySelector("#interest-body");
        const h3Name = DomBuilder.htmlFactory("h3", "card-title", "interest-id", `${editObj.name}`)
        const h5Place = DomBuilder.htmlFactory("h5", "card-text", `place-id--${editObj.place.id}`, `${editObj.place.name}`);
        const pDescription = DomBuilder.htmlFactory("p", "card-text", "interest-desc", `${editObj.description}`);
        const pCost = DomBuilder.htmlFactory("input","form-control", `edit-cost--${editObj.id}`)
        pCost.type = "number"
        pCost.value = editObj.cost;
        const pReview = DomBuilder.htmlFactory("textarea", "form-control", `edit-review--${editObj.id}`)
        pReview.value = editObj.review;
        const saveEditButton = DomBuilder.htmlFactory("button", "btn btn-primary", `save-button--${editObj.id}`, "Save");
        saveEditButton.addEventListener("click", handlers.handleSaveEdit);

        cardContainer.appendChild(h3Name)
        cardContainer.appendChild(h5Place)
        cardContainer.appendChild(pDescription)
        cardContainer.appendChild(pCost)
        cardContainer.appendChild(pReview)
        cardContainer.appendChild(saveEditButton)
    }
}

export default DomBuilder

