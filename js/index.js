document.addEventListener("click", (event)=>
{ console.log("You Just Clicked on ", event.target)}
)

const baseURL = "http://localhost:3000/"

let statesPage = 1

init =()=> {
    getStates(),
    getSights(),
    addArrowsListeners(),
    createSightForm()
}

document.addEventListener("DOMContentLoaded", init)

const getStates =(statesPage)=> {
    fetch(baseURL + `states/?_limit=10&_page=${statesPage}`)
    .then(resp => resp.json())
    .then(resp => {
        //document.querySelector('#menu').innerHTML = 'States:';
        for(let i = 1; i < resp.length; i++)
        getState(resp[i])
    })
}
// const getStates = st => {
//     fetch(baseURL + `states/?_limit=25&_statesPage=${st}`)
//     .then(resp => resp.json())
//     .then(statesArray => { console.log(statesArray);
//         addStatesToPage(statesArray)})
// }
const getSights =(s)=> {
    fetch(baseURL + `sights`)
    .then(resp => resp.json())
    .then(sightsArray => { //console.log(sightsArray);
        addSightsToPage(sightsArray)})
}

const addStatesToPage =(states)=> {
    states.forEach(function(state) {
        getState(state)
    })
}
const addSightsToPage =(sights)=> {
sights.forEach(function(sight) {
    getSight(sight)
})
}

const getState =(state)=> {
    const stateDiv = document.createElement('div')
    stateName = document.createElement('p')
    stateName.innerHTML = `${state.name}`
    stateName.classList.add("stateClass")
    stateName.id = state.id
    stateDiv.appendChild(stateName)
    document.querySelector('#menu').appendChild(stateDiv)
}
const getSight =(sight)=> {
    const sightDiv = document.createElement('div')
    sightDiv.classList.add("sightClass")
    sightDiv.setAttribute("data-id", sight.id)
    sightDiv.id = sight.id

    sightDiv.innerHTML = `
    <h2 data-id="${sight.id}" class="sightName"> ${sight.name} </h2>
    <img data-id="${sight.id}" src=${sight.image} class="sightPic" />
    <p data-id="${sight.id}" class="sightDetails">Details: ${sight.details} </p>
    <p data-id="${sight.id}" class="sightState">State: ${sight.state_id} </p>
    <p data-id="${sight.id}" class="sightLikes"> ${sight.likes} like(s) </p>
    <button data-id="${sight.id}" class="like-btn"> Like </button>
    <button data-id="${sight.id}" class="dislike-btn"> Dislike </button>
    <button data-id="${sight.id}" class="edit-btn"> Edit </button>
    <button data-id="${sight.id}" class="delete-btn"> Delete </button>
`
    // location = document.createElement('h2'),
    // pic = document.createElement('img'),
    // comments = document.createElement('p'),
    // state = document.createElement('p'),
    // likes = document.createElement('p');
    // location.innerHTML = `Location: ${sight.name}`,
    // pic.src = `${sight.image}`
    // comments.innerHTML = `Details: ${sight.details}`,
    // state.innerHTML = `State: ${sight.state_id}`,
    // likes.innerHTML = `${sight.likes} likes`,
    // sightDiv.appendChild(location),
    // sightDiv.appendChild(pic),
    // sightDiv.appendChild(comments),
    // sightDiv.appendChild(state),
    // sightDiv.appendChild(likes),
    document.querySelector('#sights').appendChild(sightDiv)
}

addArrowsListeners =()=> {
    let back = document.querySelector('#previous'),
    forward = document.querySelector('#next');
    back.addEventListener('click', () => {pageDown()}),
    forward.addEventListener('click', () => {pageUp()})
}

pageUp =()=> {
    statesPage < 5 ? (statesPage++, getStates(statesPage)) : alert('No more pages')
    // statesPage++, getStates(statesPage)
}

pageDown =()=> {
    1 < statesPage ? (statesPage--, getStates(statesPage)) : alert('No more pages')
}

const sightsColumn = document.querySelector("#sights")
sightsColumn.addEventListener("click", event => {
    event.preventDefault();

    if(event.target.matches(".like-btn")){
        const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
        const likesCount = parseInt(likesSection.textContent)
        const newLikes = likesCount + 1
        const id = event.target.dataset.id
        const sightObj = {
            likes: newLikes
        }
        fetch(`http://localhost:3000/sights/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sightObj),
        })
        .then(resp => resp.json())
        .then(updatedLikes => {
            console.log(updatedLikes)
            likesSection.textContent = `${updatedLikes.likes} like(s)`
        })
    }

    if(event.target.matches(".dislike-btn")){
        const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
        const likesCount = parseInt(likesSection.textContent)
        const newLikes = likesCount - 1
        const id = event.target.dataset.id
        const sightObj = {
            likes: newLikes
        }
        fetch(`http://localhost:3000/sights/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sightObj),
        })
        .then(resp => resp.json())
        .then(updatedLikes => {
            console.log(updatedLikes)
            likesSection.textContent = `${updatedLikes.likes} like(s)`
        })
    }

if(event.target.matches(".delete-btn")) {
    const id = event.target.dataset.id
    const sightToDelete = document.getElementById(id)
    fetch(`http://localhost:3000/sights/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then(resp => resp.json())
    .then(sightToDelete.remove())
}


})

createSightForm =()=> {
const sightForm = document.createElement('form'),
sightName = document.createElement('input'),
sightImage = document.createElement('input'),
sightDetails = document.createElement('input'),
sightButton = document.createElement('button');
sightForm.id = 'sight_form',
sightName.id = 'sight_name',
sightImage.id = 'sight_image',
sightDetails.id = 'sight_details',
sightName.placeholder = 'Sight location',
sightImage.placeholder = 'Sight image',
sightDetails.placeholder = 'Sight details',
sightButton.innerHTML = 'Create sight',
sightForm.appendChild(sightName),
sightForm.appendChild(sightImage),
sightForm.appendChild(sightDetails),
sightForm.appendChild(sightButton),
document.getElementById('new_form').appendChild(sightForm)
}
