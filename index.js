document.addEventListener("click", (event)=>{ console.log("You Just Clicked on ", event.target)})

const sightsURL = "http://localhost:3000/sights"
const statesURL = "http://localhost:3000/states"


init = () => {
    getSights(),
    getStates()
}

document.addEventListener("DOMContentLoaded", init)

const getSights = s => {
    fetch(sightsURL)
    .then(resp => resp.json())
    .then(sightsArray => { console.log(sightsArray);
        addSightsToPage(sightsArray)})
}
const getStates = s => {
    fetch(statesURL)
    .then(resp => resp.json())
    .then(statesArray => { console.log(statesArray);
        addStatesToPage(statesArray)})
}

const addSightsToPage = (sights) => {
sights.forEach(function(sight) {
    getSight(sight)
})
}
const addStatesToPage = (states) => {
    states.forEach(function(state) {
        getState(state)
    })
}

const getSight = (sight) => {
    const sightDiv = document.createElement('div'),
    // sightDiv.classList.add("sightClass")
    // sightDiv.setAttribute("data-id", sight.id)
    // sightDiv.id = sight.id

// sightDiv.innerHTML = `
//     <h2 data-id="${sight.id}"> ${sight.name} </h2>
//     <img src=${sight.image} class="sightPic" />
//     <p> ${sight.likes} likes </p>
//     <button data-id="${sight.id}" class="like-btn"> Like </button>
//     <button data-id="${sight.id}" class="edit-btn"> Edit </button>
//     <button data-id="${sight.id}" class="delete-btn"> Delete </button>
// `
    location = document.createElement('h2'),
    pic = document.createElement('img'),
    comments = document.createElement('p'),
    state = document.createElement('p'),
    likes = document.createElement('p');

    location.innerHTML = `Location: ${sight.name}`,
    pic.src = `${sight.image}`
    comments.innerHTML = `Details: ${sight.details}`,
    state.innerHTML = `State: ${sight.state_id}`,
    likes.innerHTML = `${sight.likes} likes`,

    sightDiv.appendChild(location),
    sightDiv.appendChild(pic),
    sightDiv.appendChild(comments),
    sightDiv.appendChild(state),
    sightDiv.appendChild(likes),
    document.querySelector('#sights').appendChild(sightDiv)
}
const getState = (state) => {
    const stateDiv = document.createElement('div'),
    stateName = document.createElement('p')
    stateName.innerHTML = `${state.name}`
    stateDiv.appendChild(stateName)
    document.querySelector('#menu').appendChild(stateDiv)
}