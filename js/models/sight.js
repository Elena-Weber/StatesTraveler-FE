class Sight {

constructor(id, name, image, details, likes, state_id) {
    this.id = id
    this.name = name
    this.image = image
    this.details = details
    this.likes = likes
    this.state_id = state_id

    this.getSight()
    //this.sightButtons()
}

getSight =(sight)=> {
    const sightDiv = document.createElement('div')
    sightDiv.classList.add("sightClass")
    sightDiv.setAttribute("data-id", this.id)
    sightDiv.id = this.id

    sightDiv.innerHTML = `
    <h2 data-id="${this.id}" class="sightName"> ${this.name} </h2>
    <img data-id="${this.id}" src=${this.image} class="sightPic" />
    <p data-id="${this.id}" class="sightDetails">Details: ${this.details} </p>
    <p data-id="${this.id}" class="sightState">State: ${this.state_id} </p>
    <p data-id="${this.id}" class="sightLikes"> ${this.likes} like(s) </p>
    <button data-id="${this.id}" class="like-btn"> Like </button>
    <button data-id="${this.id}" class="dislike-btn"> Dislike </button>
    <button data-id="${this.id}" class="edit-btn"> Edit </button>
    <button data-id="${this.id}" class="delete-btn"> Delete </button>
    `
    document.querySelector('#sights').appendChild(sightDiv)
    }


// sightButtons =()=> {
//     const sightsColumn = document.querySelector("#sights")
//     sightsColumn.addEventListener("click", event => {
//         event.preventDefault();
    
//         if(event.target.matches(".like-btn")){
//             const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
//             console.log(likesSection)
//             const likesCount = parseInt(likesSection.textContent)
//             const newLikes = likesCount + 1
//             const id = event.target.dataset.id
            
//             const sightObj = {
//                 likes: newLikes
//             }
//             fetch(`http://localhost:3000/sights/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(sightObj),
//             })
//             .then(resp => resp.json())
//             .then(updatedLikes => {
//                 console.log(updatedLikes)
//                 likesSection.textContent = `${updatedLikes.likes} like(s)`
//             })
//         }
    
//         if(event.target.matches(".dislike-btn")){
//             const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
//             const likesCount = parseInt(likesSection.textContent)
//             const newLikes = likesCount - 1
//             const id = event.target.dataset.id
//             const sightObj = {
//                 likes: newLikes
//             }
//             fetch(`http://localhost:3000/sights/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(sightObj),
//             })
//             .then(resp => resp.json())
//             .then(updatedLikes => {
//                 console.log(updatedLikes)
//                 likesSection.textContent = `${updatedLikes.likes} like(s)`
//             })
//         }
    
//         if(event.target.matches(".delete-btn")) {
//             const id = event.target.dataset.id
//             const sightToDelete = document.getElementById(id)
//             fetch(`http://localhost:3000/sights/${id}`, {
//                 method: "DELETE",
//                 headers: { "Content-Type": "application/json" }
//             })
//             .then(resp => resp.json())
//             .then(sightToDelete.remove())
//         }
    
//         if(event.target.matches(".edit-btn")) {
//             const id = event.target.dataset.id
//             const sightToEdit = document.getElementById(id)
//             console.log(sightToEdit)
//             fetch(`http://localhost:3000/sights/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" }
//             })
//             .then(resp => resp.json())
            
//         }
    
//     })}

    // getSights =(s)=> {
    //     fetch(baseURL + `sights`)
    //     .then(resp => resp.json())
    //     .then(sightsArray => {
    //         addSightsToPage(sightsArray)})
    // }

    // addSightsToPage =(sights)=> {
    //     sights.forEach(function(sight) {
    //         getSight(sight)
    //     })
    // }

}