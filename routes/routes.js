const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./images");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now() + "_" + file.originalname);
    },
});

let image = multer({
    storage: storage,
}).single("photo");


router.get("/", API.fetchAllTopics);
router.get("/:id", API.fetchTopicByID);
router.post("/", image,  API.createTopic);
router.patch("/:id", image, API.updateTopic);
router.delete("/:id", API.deleteTopic);



module.exports = router;
