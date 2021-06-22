class State {
    
    constructor(id, name) {
        this.id = id
        this.name = name
        this.getState()
    }
    
    getState =()=> {
        const stateDiv = document.createElement('div')
        const stateName = document.createElement('h3')
        stateName.id = this.id
        stateName.dataset.id = this.id
        stateName.innerHTML = `
        <p data-id="${this.id}" class="stateClass">${this.name}</p>
        `
        stateDiv.appendChild(stateName)
        document.querySelector('#menu').appendChild(stateDiv)

        stateName.addEventListener("click", event => {
            if(event.target.className === "stateClass") {
                console.log(event)
            this.showStateSights(event)
            }
        })
    }

    showStateSights(event) {
        const sightsDiv = document.querySelector("#sights")
        sightsDiv.innerHTML = ""
        let id = event.target.dataset.id
        fetch(`http://localhost:3000/states/${id}/sights`)
        .then(resp => resp.json())
        .then(sights => { console.log(sights);
            if (sights.length === 0) {
                sightsDiv.innerHTML = "<h3>You haven't added any sights here or visited this state yet. Try adding some, choose a different state or check out the sights in all the states. There are so many beautiful places in the USA! 🇺🇸</h3><br><br><br><img class=\"pic\" src=\"https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80\" alt=\"picture\">"
            } else {
                sightsDiv.innerHTML = "<h3>Here's what you've visited in this state:</h3>"
                sights.forEach(sight => {
                const{id, name, image, details, likes} = sight
                new Sight(id, name, image, details, likes, sight.state)
                })
            }
        })
    }

}