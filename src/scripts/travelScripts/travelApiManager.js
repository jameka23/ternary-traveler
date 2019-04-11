// this is the component that handles all the api fetch calls

const url = "http://localhost:8088";
const api = {
    getPlaces: () => {
        return fetch(`${url}/places`)
        .then(response => response.json())
    },
    getInterests: () => {
        return fetch(`${url}/interests/?_expand=place`)
        .then(response => response.json())
    },
    getSingleInterest: (interestId) => {
        return fetch(`${url}/interests/${interestId}/?_expand=place`)
        .then(response => response.json())
    },
    postNewInterest: (interestObj) => {
        return fetch(`${url}/interests`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(interestObj)
        })
    },
    patchInterest: (interestId, updatedInterestObj) => {
        return fetch(`${url}/interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedInterestObj)
        })

    },
    deleteInterest: (interestId) => {
        return fetch(`${url}/interests/${interestId}`, {
            method: "DELETE"
        })
    }
}

export default api