class API {

    static getStates() { // display all states from database
        fetch("http://localhost:3000/states")
        .then(resp => resp.json())
        .then(states => { //console.log(states)
            states.forEach(state => {
                const{id, name} = state
                new State(id, name)   
            })
        })
    }

    static getSights() { // display all sights from database
        fetch("http://localhost:3000/sights")
        .then(resp => resp.json())
        .then(sights => {
            sights.forEach(sight => {
                const{id, name, image, details, likes} = sight
                new Sight(id, name, image, details, likes, sight.state)
            })
        })
    }

    // UNCOMMENT THIS TO SEE SIGHTS IN THE ALPHABETICAL ORDER
    // AND COMMENT OUT THE PREVIOUS DEFAULT FUNCTION (BY CREATION DATE)

    // static getSights() {
    //     fetch("http://localhost:3000/sights")
    //     .then(resp => resp.json())
    //     .then(sights => { //console.log(sights);
    //         sights.sort((a, b) => (a.name > b.name ? 1 : -1)).forEach(sight => {
    //             const{id, name, image, details, likes} = sight
    //             new Sight(id, name, image, details, likes, sight.state)
    //         })
    //     })
    // }

    static navi =()=> { // display all sights on a click
        const sightsDiv = document.querySelector("#sights")
        const title = document.querySelector("#title")
        title.addEventListener("click", event => { event.preventDefault()
            sightsDiv.innerHTML = ""
        this.getSights()
        })
    }

    static mostVisitedState =()=> { //calculate state with most sights
        const mostVisited = document.querySelector("#mostP")
        fetch(`http://localhost:3000/mostvis`)
        .then(resp => resp.json())
        .then(state => {
            mostVisited.innerHTML = state.name
        })
    }

    static mostLikedSight =()=> { // display sight with most likes
        const mostLiked = document.querySelector("#likedP")
        fetch(`http://localhost:3000/mostliked`)
        .then(resp => resp.json())
        .then(sight => {
            mostLiked.innerHTML = sight.name
        })
    }

    static sightButtons =()=> { // liking and disliking features
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
                    likesSection.textContent = `${updatedLikes.likes} like(s)`
                })
            }
        
            if(event.target.matches(".delete-btn")) { // delete btn
                const id = event.target.dataset.id
                const sightToDelete = event.target.parentElement
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