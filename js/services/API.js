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
        fetch("http://localhost:3000/sights")
        .then(resp => resp.json())
        .then(sights => { console.log(sights);
            sights.forEach(sight => {
                const{id, name, image, details, likes, state_id} = sight
                new Sight(id, name, image, details, likes, state_id)
            })
        //getSights()
        })
        })
    }
}