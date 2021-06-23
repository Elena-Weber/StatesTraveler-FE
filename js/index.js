document.addEventListener("click", (event) =>{
    console.log("You've Just Clicked on ", event.target)
})

init =()=> {
    API.getStates(),
    API.getSights(),
    API.navi(),
    API.sightButtons(),
    API.mostVisitedState(),
    API.mostLikedSight(),
    createSightForm(),
    createSight(),
    searchFunction()
}

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
    const createForm = document.querySelector("#sightForm")
    createForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = event.target.sightName.value
        const image = event.target.sightImage.value
        const details = event.target.sightDetails.value
        const state = event.target.sightState.value
        const submit = event.target.submit

        if (name == "" || image == "" || details == "") {
            alert("Please fill out all the fields of the form.");
            return false;
        }

        fetch("http://localhost:3000/sights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "image": image,
                "details": details,
                "likes": 0,
                "state_id": state
            })
        })
        .then(resp => resp.json())
        .then(sight => { //console.log(sight)
            const{id, name, image, details, likes} = sight
            new Sight(id, name, image, details, likes, sight.state)
        })
        event.target.reset()
        window.scroll(0,findPos(document.querySelector("#footer")))
    })
}

searchFunction =()=> {
    const sightsList = document.querySelector("#sightsList")
    const searchBar = document.querySelector("#searchBar")
    let sightsArray = []

    searchBar.addEventListener('keyup', (event) => {
        //console.log(event.target.value)
        const searchString = event.target.value.toLowerCase()
        let filteredSights = sightsArray.filter((si) => {
            return (si.name.toLowerCase().startsWith(searchString))
        })

        if (searchString != "") {
        displaySights(filteredSights)
        } else {
            sightsList.innerHTML = ""
        }
    })

    const loadSights = async () => {
            const res = await fetch('http://localhost:3000/sights')
            sightsArray = await res.json()
        }

    const displaySights = (sights) => { //console.log(sights)
        const htmlString = sights.map((sight) => {
            return `
                <li class="searched-sight">
                <img class="small-pic" src="${sight.image}"></img>
                <p>${sight.name} in ${sight.state.name}</p>
                <p>What you think about it: ${sight.details}</p>
                </li>
            `;
        }).join('');
        
    sightsList.innerHTML = htmlString;                              
    }

    loadSights()
}