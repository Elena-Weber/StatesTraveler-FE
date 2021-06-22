class Sight {

    constructor(id, name, image, details, likes, state_id) {
        this.id = id
        this.name = name
        this.image = image
        this.details = details
        this.likes = likes
        this.state = state_id
        this.getSight()
        
    }

    sightCard =()=> {
        return `
            <h2 data-id="${this.id}" class="sightName">${this.name}</h2>
            <img data-id="${this.id}" src=${this.image} class="sightPic" />
            <p data-id="${this.id}" class="sightDetails">${this.details}</p>
            <p data-id="${this.id}" class="sightState">State: ${this.state.name}</p>
            <p data-id="${this.id}" class="sightLikes">${this.likes} like(s)</p>
            <button data-id="${this.id}" class="like-btn">Like</button>
            <button data-id="${this.id}" class="dislike-btn">Dislike</button>
            <button data-id="${this.id}" class="edit-btn">Edit</button>
            <button data-id="${this.id}" class="delete-btn">Delete</button>
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
                <br>
                <input type="submit" name="submit"
                value="Update this sight"
                class="submit-button"/>
                </form>
                <br><br><br>
                `
                sightDiv.append(sightToEditForm)

                sightDiv.querySelector(".edit-btn").disabled = true

                const notEdit = sightToEditForm.querySelector(".close-button")
                notEdit.addEventListener("click", () => {
                    sightToEditForm.remove()
                    sightDiv.querySelector(".edit-btn").disabled = false
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
                        sightDiv.querySelector(".edit-btn").disabled = false
                    }
                })
            }
        })
    }
}