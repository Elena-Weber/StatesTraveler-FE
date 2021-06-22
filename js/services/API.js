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
                const{id, name, image, details, likes} = sight
                new Sight(id, name, image, details, likes, sight.state)
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

    static mostVisitedState =()=> {
        const mostVisited = document.querySelector("#mostP")
        fetch(`http://localhost:3000/mostvis`)
        .then(resp => resp.json())
        .then(state => { //console.log(state)
            mostVisited.innerHTML = state.name
        })
    }

    static mostLikedSight =()=> {
        const mostLiked = document.querySelector("#likedP")
        fetch(`http://localhost:3000/mostliked`)
        .then(resp => resp.json())
        .then(sight => { //console.log(sight)
            mostLiked.innerHTML = sight.name
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
                    //console.log(updatedLikes)
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
                //debugger
                const sightToDelete = event.target.parentElement
                //console.log(sightToDelete)
                fetch(`http://localhost:3000/sights/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(resp => resp.json())
                .then(sightToDelete.remove())
            }
        })
    }

    
}