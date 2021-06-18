document.addEventListener("click", (event) =>{
    console.log("You Just Clicked on ", event.target)
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
    //st.id = sight.state_id
    let opt = document.createElement('option')
    opt.appendChild(document.createTextNode(st))
    opt.value = i + 1
    opt.className = "stateOptions"
    sightState.appendChild(opt)
    //console.log(st)
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
        //API.getSights()
        event.target.reset()
        console.log("I'm here")
        window.scroll(0,findPos(document.querySelector("#footer")))
        console.log("end")
    })
}

// not working yet
// getSingleSight =(sight)=> {
//     const chosenSight = document.querySelector(".sightName")
//     chosenSight.dataset.id = sight.id
//     chosenSight.addEventListener("click", event => {
//     console.log(chosenSight)
//     renderSingleSight()
//     })
// }
//not working yet
// renderSingleSight =()=> {
//     const sightDiv = document.createElement('div')
//     sightDiv.classList.add("singleSight")
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
//     `
//     document.querySelector('single_sight').appendChild(sightDiv)
// }