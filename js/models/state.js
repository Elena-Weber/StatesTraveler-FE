class State {
    
    constructor(id, name) {
        this.id = id
        this.name = name
        this.getState()
    }
    
    getState =()=> {
        const stateDiv = document.createElement('div')
        const stateName = document.createElement('p')
        stateName.id = this.id
        stateName.dataset.id = this.id
        stateName.classList.add("stateClass")
        //stateName.innerHTML += this.showHTML()
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
    // showHTML =()=> {
    //     return `
    //     <p>${this.name}</p>
    //     `
    // }

    // addStatesToPage =(states)=> {
    //     states.forEach(function(state) {
    //         getState(state)})
    // }

    // getStates =()=> {
    //     fetch("http://localhost:3000/states")
    //     .then(resp => resp.json())
    //     .then(states => { //console.log(statesArray);
    //     addStatesToPage(states)})
    // }

    // addStatesToPage =(states)=> {
    //     states.forEach(function(state) {
    //         getState(state)
    //     })
    // }

    showStateSights(event) {
        const sightsDiv = document.querySelector("#sights")
        sightsDiv.innerHTML = ""
        let id = event.target.dataset.id
        fetch(`http://localhost:3000/states/${id}/sights`)
        .then(resp => resp.json())
        .then(sights => { console.log(sights);
            if (sights.length === 0) {
                console.log("no sights in this state")
                sightsDiv.innerHTML = "You haven't added any sights here or visited this state yet. Try adding some, choose a different state or check out the sights in all the states."
            } else {
                sightsDiv.innerHTML = "Here's what you've visited in this state:"
                sights.forEach(sight => {
                const{id, name, image, details, likes, state_id} = sight
                new Sight(id, name, image, details, likes, state_id)
                })
            }
        })
    }

    // not finished
    // createSights =(event)=> {
    //     let id = e.target.dataset.id
    //     fetch(`http://localhost:3000/states/${id}/sights`)
    //     .then(resp => resp.json())
    //     .then(sights => {
    //         sights.forEach(sight => {
    //             const{id, name, image, details, likes, state_id} = sight
    //             new Sight(id, name, image, details, likes, state_id)
    //         })
    //     })
    // }
}