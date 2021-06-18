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

sightCard =()=> {
    return `
    <h2 data-id="${this.id}" class="sightName"> ${this.name} </h2>
    <img data-id="${this.id}" src=${this.image} class="sightPic" />
    <p data-id="${this.id}" class="sightDetails"> ${this.details} </p>
    <p data-id="${this.id}" class="sightState">State: ${this.state_id} </p>
    <p data-id="${this.id}" class="sightLikes"> ${this.likes} like(s) </p>
    <button data-id="${this.id}" class="like-btn"> Like </button>
    <button data-id="${this.id}" class="dislike-btn"> Dislike </button>
    <button data-id="${this.id}" class="edit-btn"> Edit </button>
    <button data-id="${this.id}" class="delete-btn"> Delete </button>
    `
}

getSight =(sight)=> {
    const sightDiv = document.createElement('div')
    sightDiv.classList.add("sightClass")
    sightDiv.setAttribute("data-id", this.id)
    sightDiv.id = this.id
    sightDiv.innerHTML = this.sightCard()
    document.querySelector('#sights').appendChild(sightDiv)

    sightDiv.addEventListener("click", event => {

        if(event.target.matches(".edit-btn")) {
            const sightToUpdate = event.target.closest(".sightClass")
            const sightToEditForm = document.createElement("form")
            sightToEditForm.innerHTML = `
            <h4>You can edit this sight here:</h4>
            <form class="sight-edit-form">
            <button class="close-button">Changed your mind? Just click here!</button>
            <br>
            <h5>Sight name:</h5>
            <input type="text" name="name"
            value="${sightDiv.querySelector("h2").innerText}"
            placeholder="${sightDiv.querySelector("h2").innerText}"
            class="name-edit"/>
            <br>
            <h5>Image path:</h5>
            <input type="text" name="image"
            value="${sightDiv.querySelector("img").src}"
            placeholder="${sightDiv.querySelector("img").src}"
            class="image-edit"/>        
            <br>
            <h5>Impressions:</h5>
            <input type="text" name="details"
            value="${sightDiv.querySelector("p").innerText}"
            placeholder="${sightDiv.querySelector("p").innerText}"
            class="details-edit"/><br>
            <br>
            <select name="states">123</select>
            <br>
            <input type="submit" name="submit"
            value="Update this sight"
            class="submit-button"/>
            </form>
            <br><br><br>
            `
            sightDiv.append(sightToEditForm)

            const notEdit = sightToEditForm.querySelector(".close-button")
            notEdit.addEventListener("click", () => {
                sightToEditForm.remove()
            })

            sightToEditForm.addEventListener("click", (event) => {
                event.preventDefault();
                if(event.target.matches(".submit-button")) {
                    let editedName = sightToEditForm.querySelector(".name-edit").value
                    let editedImage = sightToEditForm.querySelector(".image-edit").value
                    let editedDetails = sightToEditForm.querySelector(".details-edit").value

                    const sightObject = {
                        name: editedName,
                        image: editedImage,
                        details: editedDetails
                    }

                    const sightID = sightToUpdate.id
                    fetch(`http://localhost:3000/sights/${sightID}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(sightObject)
                    })
                    .then(resp => resp.json())
                    .then(editedSight => {
                        sightToUpdate.querySelector("h2").innerText = editedSight.name
                        sightToUpdate.querySelector("img").src = editedSight.image
                        sightToUpdate.querySelector("p").innerText = editedSight.details
                    })
                    .then(sightToEditForm.remove())
                }
            })
        }
    })
}





    // createSight =(event)=> {
    //     let createForm = document.querySelector("#new_form")
    //     sightButton.addEventListener("submit", event => {
    //         event.preventDefault();
    //         console.log("submit button clicked")
    //         const name = event.target.name.value
    //         const image = event.target.image.value
    //         const details = event.target.details.value
    //         const stateId = event.target.state_id.value
    //         const submit = event.target.submit
    //         console.log("submitting this:", submit)
    //         fetch("http://localhost:3000/sights", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 "name": name,
    //                 "image": image,
    //                 "details": details,
    //                 "likes": 0,
    //                 "state_id": state_id
    //             })
    //         })
    //         .then(resp => resp.json())
    //         .then((newSight) => Sight.getSight(newSight))
    //         event.target.reset()
    //     })
    // }

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


}