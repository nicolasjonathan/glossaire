// import model
const Glossaire = require ('../models/glossaireModel')
const { getPostData } = require ('../utility')

// @desc        get all routes
// @routes      GET /api/glossaire/
async function getDefinitions (req, res) {
    try {
        const glossaire = await Glossaire.findAll()
        res.writeHead (200, {'Content-Type' : 'application/json'})
        res.end (JSON.stringify(glossaire))
    } catch (error) {
        console.log (error)
    }
}

// @desc       get a single route by id
// @routes      GET /api/glossaire/:id
async function getDefinition (req, res, id) {
    try {
        const glossaire = await Glossaire.findById(id)
        if (!glossaire) {
            res.writeHead (404, {'Content-Type' : 'application/json'})
            res.end (JSON.stringify({message : 'ressource not found'}))
        } else {
            res.writeHead (200, {'Content-Type' : 'application/json'})
            res.end (JSON.stringify(glossaire))
        }
    } catch (error) {
        console.log (error)
    }
}

// @desc        post a ressources
// @routes      POST /api/glossaire/
async function createDefinition (req, res) {
    try {
        let body = ''
        req.on ('data', (chunk) => {
            body += chunk.toString()
        })

        req.on ('end', async ()=> {

            // On attribue les valeurs du json stringé aux differentes methodes letter et definition
            const { letter, definition } = JSON.parse(body)

            // {def} instance à insérer
            const def = {
                letter, 
                definition
            }

            // revient à faire $newDef = $GlossaireModel->create($def)
            const newDef = await Glossaire.create (def)

            // POST code
            res.writeHead (201, {'Content-Type' : 'application/json'})

            // return new def to program
            return res.end (JSON.stringify(newDef))

        })

    } catch (error) {
        console.log(error)
    }

}

// export
module.exports = { 
    getDefinition, 
    getDefinitions,
    createDefinition
}