// json file containing data
const glossaires = require ('../datas/glossaires')
const { v4: uuidv4 } = require ('uuid')
const { writeDataToFile } = require ('../utility')

function findAll () {
    return new Promise ( (resolve, reject) => {
        resolve (glossaires)
    })
}

function findById (id) {
    return new Promise ( (resolve, reject) => {
        const glossaire = glossaires.find((d) => d.id === id)
        resolve (glossaire)
    })
}

function create (glossaire) {

    return new Promise ((resolve, reject) => {

        // on hydrate la nouvelle instance à insérer (newGlossaire) avec un id généré par uuid +  
        const newGlossaire = {id: uuidv4(), ...glossaire}

        // on push {newGlossaire} dans le fichier json glossaires.json
        glossaires.push (newGlossaire)

        // on persiste ça via les streams
        writeDataToFile ('./datas/glossaires.json', glossaires)

        // on resolve la promesse
        resolve (newGlossaire)

    })
}

module.exports = { 
    findAll, 
    findById,
    create
}