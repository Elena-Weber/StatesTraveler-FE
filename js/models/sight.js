class Sight {

constructor(id, name, image, details, likes, state_id) {
    this.id = id
    this.name = name
    this.image = image
    this.details = details
    this.likes = likes
    this.state_id = state_id

    this.getSight()
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