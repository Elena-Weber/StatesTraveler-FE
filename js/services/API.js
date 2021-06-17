class API {

    static getStates() {
        fetch("http://localhost:3000/states")
        .then(resp => resp.json())
        .then(states => { //console.log(states)
            states.forEach(state => {
                const{id, name} = state
                new State(id, name)   
            })
        })
    }

    static getSights() {
        fetch("http://localhost:3000/sights")
        .then(resp => resp.json())
        .then(sights => { //console.log(sights);
            sights.forEach(sight => {
                const{id, name, image, details, likes, state_id} = sight
                new Sight(id, name, image, details, likes, state_id)
            })
        })
    }

    static navi =()=> {
        const sightsDiv = document.querySelector("#sights")
        const title = document.querySelector("#title")
        title.addEventListener("click", event => { event.preventDefault()
            //console.log("title clicked")
            sightsDiv.innerHTML = ""
        this.getSights()
        })
    }

    static sightButtons =()=> {
        const sightsColumn = document.querySelector("#sights")
        sightsColumn.addEventListener("click", event => {
            event.preventDefault();

            if(event.target.matches(".like-btn")){
                const likesSection = event.target.closest(".sightClass").querySelector(".sightLikes")
                console.log(likesSection)
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
                console.log(sightToDelete)
                fetch(`http://localhost:3000/sights/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(resp => resp.json())
                
                .then( console.log(sightToDelete),
                    sightToDelete.remove())
            }
        
            if(event.target.matches(".edit-btn")) {
                const id = event.target.dataset.id
                const sightToEdit = document.getElementById(id)
                console.log(sightToEdit)
                fetch(`http://localhost:3000/sights/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" }
                })
                .then(resp => resp.json())

            }
        })
    }

    // static createSightForm =()=> {
    //     const sightForm = document.createElement('form')
    //     sightName = document.createElement('input')
    //     sightImage = document.createElement('input')
    //     sightDetails = document.createElement('input')
    //     sightState = document.createElement('select')
    //     sightButton = document.createElement('button')
    //     sightForm.id = 'sight_form'
    //     sightName.id = 'sight_name'
    //     sightImage.id = 'sight_image'
    //     sightDetails.id = 'sight_details'
    //     sightState.id = 'sight_state'
    //     sightButton.id = 'sight_button'
    //     sightName.placeholder = 'Name'
    //     sightImage.placeholder = 'Image path'
    //     sightDetails.placeholder = 'Impressions'
    //     //sightState.meaning = State.all
    //     sightButton.innerHTML = 'Create a sight'
    //     sightForm.appendChild(sightName)
    //     sightForm.appendChild(sightImage)
    //     sightForm.appendChild(sightDetails)
    //     sightForm.appendChild(sightState)
    //     sightForm.appendChild(sightButton)
    //     document.getElementById('new_form').appendChild(sightForm)
    //     }


}