class API {

    static getSights() {
        fetch("http://localhost:3000/sights")
        .then(resp => resp.json())
        .then(sightsArray => { //console.log(sightsArray);
            sightsArray.forEach(sight => {
                const{id, name, image, details, likes, state} = sight
                new Sight(id, name, image, details, likes, state)
            })
            // addSightsToPage(sightsArray)
        })
    }
}