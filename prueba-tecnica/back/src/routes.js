const { Router } = require("express");
const router = Router();
const ModelSchema = require("./Model")

const urlGenerator = async () => {
    const links = await ModelSchema.find()
    const keyLinks = links.map(e => e.key)
    let characters = 'abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLÑZXCVBNM0123456789';
    let chaactersLength = characters.length
    let result = ""
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    if (keyLinks.includes(result)) {
        return urlGenerator()
    } else {
        return result
    }
}


router.post("/", async (req, res) => {
    const link = req.body
    console.log(link)
    link.link.includes("https://") ? null : link.link = `https://${link.link}` 
    try {
        const verify = await ModelSchema.findOne(link)

        if (verify) {
            res.status(200).json(verify)
        } else {
            const url = await urlGenerator()
            link.key = url
            const newLink = new ModelSchema(link)
            newLink.save();
            res.status(200).json(newLink)
        }
    }

    catch {
        res.status(400).json("error")
    }
})
router.get("/", async (req, res) => {
    const { webKey } = req.query
    try {
        const links = webKey ? await ModelSchema.find({ key: webKey }) : await ModelSchema.find()
        if (links) {
            res.status(200).json(links)
        } else {
            res.status(200).json("there are no links yet")
        }
    }
    catch {
        res.status(400).json("error")
    }
})

module.exports = router;