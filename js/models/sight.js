class Sight {

static all = []

constructor({id, name, image, details, likes, stateID}) {
    this.id = id
    this.name = name
    this.image = image
    this.details = details
    this.likes = likes
    this.stateID = stateID

    Sight.all.push(this)
}



}