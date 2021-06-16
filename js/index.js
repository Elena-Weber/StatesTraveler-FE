document.addEventListener("click", (event)=>
{ console.log("You Just Clicked on ", event.target)}
)

const baseURL = "http://localhost:3000/"

let page = 1

init =()=> {
    API.getStates(),
    API.getSights(),
    addArrowsListeners(),
    createSightForm(),
    API.navi(),
    API.sightButtons()//,
    //API.createSightForm()
}

document.addEventListener("DOMContentLoaded", init)

// State
// const getStates =(num)=> {
//     fetch(baseURL + `states/?_limit=10&_page=${num}`)
//     .then(resp => resp.json())
//     .then(statesArray => { //console.log(statesArray);
//     addStatesToPage(statesArray)})
// }

//API
// const navi =()=> {
//     const sightsDiv = document.querySelector("#sights")
//     sightsDiv.innerHTML = ""

//     const title = document.querySelector("#title")
//     title.addEventListener("click", event => {
//         console.log("title clicked")
//     fetch("http://localhost:3000/states")
//     .then(resp => resp.json())
//     .then(statesArray => { console.log(statesArray);
//     addStatesToPage(statesArray)})
//     })
// }

//Sight
// const getSights =(s)=> {
//     fetch(baseURL + `sights`)
//     .then(resp => resp.json())
//     .then(sightsArray => { //console.log(sightsArray);
//         addSightsToPage(sightsArray)})
// }

// State
// const addStatesToPage =(states)=> {
//     states.forEach(function(state) {
//         getState(state)
//     })
// }

//Sight
// const addSightsToPage =(sights)=> {
// sights.forEach(function(sight) {
//     getSight(sight)
// })
// }

// State
// const getState =(state)=> {
//     const stateDiv = document.createElement('div')
//     stateName = document.createElement('p')
//     stateName.innerHTML = `${state.name}`
//     stateName.classList.add("stateClass")
//     stateName.id = state.id
//     stateName.dataset.id = state.id
//     stateDiv.appendChild(stateName)
//     document.querySelector('#menu').appendChild(stateDiv)

//     stateName.addEventListener("click", event => {
//         if(event.target.className === "stateClass") {
//             console.log(event)
//         showStateSights(event)
//         }
        
//     })
// }

// State
// const showStateSights =(event)=> {
//     const sightsDiv = document.querySelector("#sights")
//     sightsDiv.innerHTML = ""
//     let id = event.target.dataset.id
//     fetch(`http://localhost:3000/states/${id}/sights`)
//     .then(resp => resp.json())
//     .then(sights => { console.log(sights);
//         if (sights.length === 0) {
//             console.log("empty")
//             sightsDiv.innerHTML = "You haven't added any sights here or visited this state yet. Try adding some, choose a different state or check out the sights in all the states."
//         } else {
//             sightsDiv.innerHTML = "Here's what you've visited in this state:"
//             sights.forEach(sight => {
//                 getSight(sight)})
//             // const{id, name, image, details, likes, state_id} = sight
//             // new Sight(id, name, image, details, likes, state_id)
//         }
//         // addSightsToPage(sightsArray)
//     })
// }

//Sight
// const getSight =(sight)=> {
//     const sightDiv = document.createElement('div')
//     sightDiv.classList.add("sightClass")
//     sightDiv.setAttribute("data-id", sight.id)
//     sightDiv.id = sight.id

//     sightDiv.innerHTML = `
//     <h2 data-id="${sight.id}" class="sightName"> ${sight.name} </h2>
//     <img data-id="${sight.id}" src=${sight.image} class="sightPic" />
//     <p data-id="${sight.id}" class="sightDetails">Details: ${sight.details} </p>
//     <p data-id="${sight.id}" class="sightState">State: ${sight.state_id} </p>
//     <p data-id="${sight.id}" class="sightLikes"> ${sight.likes} like(s) </p>
//     <button data-id="${sight.id}" class="like-btn"> Like </button>
//     <button data-id="${sight.id}" class="dislike-btn"> Dislike </button>
//     <button data-id="${sight.id}" class="edit-btn"> Edit </button>
//     <button data-id="${sight.id}" class="delete-btn"> Delete </button>
// `
//     // location = document.createElement('h2'),
//     // pic = document.createElement('img'),
//     // comments = document.createElement('p'),
//     // state = document.createElement('p'),
//     // likes = document.createElement('p');
//     // location.innerHTML = `Location: ${sight.name}`,
//     // pic.src = `${sight.image}`
//     // comments.innerHTML = `Details: ${sight.details}`,
//     // state.innerHTML = `State: ${sight.state_id}`,
//     // likes.innerHTML = `${sight.likes} likes`,
//     // sightDiv.appendChild(location),
//     // sightDiv.appendChild(pic),
//     // sightDiv.appendChild(comments),
//     // sightDiv.appendChild(state),
//     // sightDiv.appendChild(likes),
//     document.querySelector('#sights').appendChild(sightDiv)
// }

addArrowsListeners =()=> {
    let back = document.querySelector('#previous'),
    forward = document.querySelector('#next');
    back.addEventListener('click', () => {pageDown()}),
    forward.addEventListener('click', () => {pageUp()})
}

pageUp =()=> {
    page < 5 ? (page++, getStates(page)) : alert('No more pages')
}

pageDown =()=> {
    1 < page ? (page--, getStates(page)) : alert('No more pages')
}

//Sight
// const sightsColumn = document.querySelector("#sights")
// sightsColumn.addEventListener("click", event => {
//     event.preventDefault();

//     if(event.target.matches(".like-btn")){
//         const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
//         const likesCount = parseInt(likesSection.textContent)
//         const newLikes = likesCount + 1
//         const id = event.target.dataset.id
//         const sightObj = {
//             likes: newLikes
//         }
//         fetch(`http://localhost:3000/sights/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(sightObj),
//         })
//         .then(resp => resp.json())
//         .then(updatedLikes => {
//             console.log(updatedLikes)
//             likesSection.textContent = `${updatedLikes.likes} like(s)`
//         })
//     }

//     if(event.target.matches(".dislike-btn")){
//         const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
//         const likesCount = parseInt(likesSection.textContent)
//         const newLikes = likesCount - 1
//         const id = event.target.dataset.id
//         const sightObj = {
//             likes: newLikes
//         }
//         fetch(`http://localhost:3000/sights/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(sightObj),
//         })
//         .then(resp => resp.json())
//         .then(updatedLikes => {
//             console.log(updatedLikes)
//             likesSection.textContent = `${updatedLikes.likes} like(s)`
//         })
//     }

//     if(event.target.matches(".delete-btn")) {
//         const id = event.target.dataset.id
//         const sightToDelete = document.getElementById(id)
//         fetch(`http://localhost:3000/sights/${id}`, {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" }
//         })
//         .then(resp => resp.json())
//         .then(sightToDelete.remove())
//     }

//     if(event.target.matches(".edit-btn")) {
//         const id = event.target.dataset.id
//         const sightToEdit = document.getElementById(id)
//         console.log(sightToEdit)
//         fetch(`http://localhost:3000/sights/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" }
//         })
//         .then(resp => resp.json())
//     }
// })

//API, select not working
createSightForm =()=> {
    const sightForm = document.createElement('form')
    sightName = document.createElement('input')
    sightImage = document.createElement('input')
    sightDetails = document.createElement('input')
    sightState = document.createElement('select')
    sightButton = document.createElement('button')
    sightForm.id = 'sight_form'
    sightName.id = 'sight_name'
    sightImage.id = 'sight_image'
    sightDetails.id = 'sight_details'
    sightState.id = 'sight_state'
    sightButton.id = 'sight_button'
    sightName.placeholder = 'Sight name'
    sightImage.placeholder = 'Image path'
    sightDetails.placeholder = 'Impressions'
    
const statesArray = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
statesArray.forEach(st => {
    let opt = document.createElement('option')
    opt.appendChild(document.createTextNode(st))
    opt.value = 'option value'
    opt.className = "stateOptions"
    sightState.appendChild(opt)
    //console.log(opt)
})

    sightButton.innerHTML = 'Create a sight'
    sightForm.appendChild(sightName)
    sightForm.appendChild(sightImage)
    sightForm.appendChild(sightDetails)
    sightForm.appendChild(sightState)
    sightForm.appendChild(sightButton)
    document.getElementById('new_form').appendChild(sightForm)
}

//not working yet
getSingleSight =(sight)=> {
    const chosenSight = document.querySelector(".sightName")
    chosenSight.dataset.id = sight.id
    chosenSight.addEventListener("click", event => {
    console.log(chosenSight)
    renderSingleSight()
    })
}
//not working yet
renderSingleSight =()=> {
    const sightDiv = document.createElement('div')
    sightDiv.classList.add("singleSight")
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
    document.querySelector('single_sight').appendChild(sightDiv)
}