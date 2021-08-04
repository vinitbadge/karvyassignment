const { csonParser } = require("config/parser");
const data = require("../data/data.json")
const { validateCountries } = require("../validation")
const path = require('path');


const multer = require("multer")
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, req.body.name.toLowerCase()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 4000000 // 1000000 Bytes = 1 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('file')




module.exports.createCountry = async (req, res) => {
    imageUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(403).send({ error: [{ file: err.message }] })
        } else if (err) {
            res.status(403).send({ error: [{ file: err }] })
        } else if (!req.file) { res.status(403).send({ error: [{ file: "upload file" }] }) } else {
            let { error } = validateCountries(req.body)
            const valid = error == null;
            if (!valid) {
                const { details } = error;
                const errors = details.map(i => { return { [i.context.key]: i.message } });
                //  console.log("error", details);
                res.status(403).send({ error: errors })
            } else {
                if (data.countries.some(function (el) { return el.name === req.body.name })) {
                    res.status(403).send({ error: [{ name: "name must be unique" }] })
                } else if (data.countries.some(function (el) { return el.rank == req.body.rank; })) {
                    res.status(403).send({ error: [{ rank: "rank must be unique" }] })
                } else {
                    req.body.flag = "images/" + req.file.filename
                    data.countries.push(req.body)
                    res.send({
                        data: data,
                        message: "Country created successfully"
                    });
                }

            }
        }
    })


};

module.exports.getCountries = async (req, res) => {
    if (data.countries.length) {
        let countries = []
        if (req.params.country_id) {
            countries = data.countries.filter(function (country) {
                return country.rank == req.params.country_id
            });
            if (countries.length) {
                countries[0].imagePath = req.protocol + '://' + req.get('host') + "/public/"
            }
        } else {
            countries = data.countries.map(function (country) {
                // console.log({ name: country.name, id: country.rank })
                return { name: country.name, id: country.rank }
            });
        }
        let continent = [...new Set(data.countries.map(item => item.continent))];
        res.send({ data: countries, continent });
    } else {
        res.send({
            data: [],
            message: "no countries found"
        });
    }

};




