class Sight {

static all = []

constructor({id, name, image, details, likes, state}) {
    this.id = id
    this.name = name
    this.image = image
    this.details = details
    this.likes = likes
    this.state = state

    Sight.all.push(this)
}

}