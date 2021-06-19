document.addEventListener("click", (event) =>{
    console.log("You've Just Clicked on ", event.target)
})

const baseURL = "http://localhost:3000/"

//let page = 1

init =()=> {
    API.getStates(),
    API.getSights(),
    //addArrowsListeners(),
    createSightForm(),
    createSight(),
    API.navi(),
    API.sightButtons()
}

//let preventMultipleEdit = true;

document.addEventListener("DOMContentLoaded", init)

createSightForm =()=> {
    const sightForm = document.createElement('form')
    sightName = document.createElement('input')
    sightImage = document.createElement('input')
    sightDetails = document.createElement('input')
    sightState = document.createElement('select')
    sightButton = document.createElement('button')
    sightForm.id = 'sightForm'
    sightName.id = 'sightName'
    sightImage.id = 'sightImage'
    sightDetails.id = 'sightDetails'
    sightState.id = 'sightState'
    sightButton.id = 'sightButton'
    sightName.placeholder = 'Sight name'
    sightImage.placeholder = 'Image path'
    sightDetails.placeholder = 'Impressions'

    const statesArray = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    statesArray.forEach((st, i) => {
        let opt = document.createElement('option')
        opt.appendChild(document.createTextNode(st))
        opt.value = i + 1
        opt.className = "stateOptions"
        sightState.appendChild(opt)
    })

    sightButton.innerHTML = 'Create a sight'
    sightForm.appendChild(sightName)
    sightForm.appendChild(sightImage)
    sightForm.appendChild(sightDetails)
    sightForm.appendChild(sightState)
    sightForm.appendChild(sightButton)
    document.getElementById('new_form').appendChild(sightForm)
}

findPos =(obj)=>  {
    let spot = 0;
    if (obj.offsetParent) {
        do {
            spot += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return spot;
    }
}

createSight =()=> {
    const allSights = document.querySelectorAll(".sightClass")

    const createForm = document.querySelector("#sightForm")
    createForm.addEventListener("submit", event => {
        event.preventDefault();
    //console.log("submit button clicked")
        const name = event.target.sightName.value
        const image = event.target.sightImage.value
        const details = event.target.sightDetails.value
        const state_id = event.target.sightState.value
        const submit = event.target.submit
    //console.log("submitting this:", submit)
        fetch("http://localhost:3000/sights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "image": image,
                "details": details,
                "likes": 0,
                "state_id": state_id
            })
        })
        .then(resp => resp.json())

        .then(sight => {
            const{id, name, image, details, likes, state_id} = sight
            new Sight(id, name, image, details, likes, state_id)
        })
        event.target.reset()
        console.log("I'm here")
        window.scroll(0,findPos(document.querySelector("#footer")))
        console.log("end")
    })
}


// addArrowsListeners =()=> {
//     let back = document.querySelector('#previous'),
//     forward = document.querySelector('#next');
//     back.addEventListener('click', () => {pageDown()}),
//     forward.addEventListener('click', () => {pageUp()})
// }

// pageUp =()=> {
//     page < 5 ? (page++, getStates(page)) : alert('No more pages')
// }

// pageDown =()=> {
//     1 < page ? (page--, getStates(page)) : alert('No more pages')
// }