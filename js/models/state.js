class State {

    static all = []
    
    constructor({id, name}) {
        this.id = id
        this.name = name
    
        State.all.push(this)
    }
    
    getState =()=> {
        const stateDiv = document.createElement('div')
        stateName = document.createElement('p')
        stateName.innerHTML = this.name
        stateName.classList.add ="stateClass"
        stateName.id = this.id
        stateName.dataset.id = this.id
        stateDiv.appendChild(stateName)
        document.querySelector('#menu').appendChild(stateDiv)
        stateName.addEventListener("click", event => {
            if(event.target.className === "stateClass")
            console.log(event)
            this.showStateSights(event)
        })
    }

    addStatesToPage =(states)=> {
        states.forEach(function(state) {
            getState(state)})
    }

    getStates =(num)=> {
        fetch(`http://localhost:3000/states/?_limit=10&_page=${num}`)
        .then(resp => resp.json())
        .then(statesArray => { //console.log(statesArray);
        addStatesToPage(statesArray)})
    }

    showStateSights(event) {
        let id = event.target.dataset.id
        fetch("http://localhost:3000/states/${id}/sights")
        .then(resp => resp.json())
        .then(sights => { //console.log(sightsArray);
            sights.forEach(sight => {
                const{id, name, image, details, likes, state_id} = sight
                new Sight(id, name, image, details, likes, state_id)
            })
            // addSightsToPage(sightsArray)
        })
    }

    }