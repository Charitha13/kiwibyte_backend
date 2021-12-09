const Topic = require("../models/topics");
const fs = require("fs");

module.exports = class API {

    static async fetchAllTopics(req,res) {
        try{
            const topics = await Topic.find();
            res.status(200).json(topics);
        } catch (err)  {
            res.status(404).json({message: err.message});
        }
    }

    static async fetchTopicByID(req,res) {
        const id = req.params.id;
        try{
            const topic = await Topic.findById(id);
            res.status(200).json(topic);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    static async createTopic(req,res) {

        const topic = req.body;
        const photoName = req.file.filename;
        topic.photo = photoName;
        try{
            await Topic.create(topic);
            res.status(201).json({message: "Topic has been created and posted succefully"});            
        }catch(err){
            res.status(400).json({message: err.message});
            
        }
    }

    static async updateTopic(req,res) {
        const id = req.params.id;
        let new_photo = "";
        if(req.file){
            new_photo = req.file.filename;
            try{
                fs.unlinkSync("./images/" + req.body.old_photo);

            }catch(err){
                console.log(err);
            }
        }
        else{
            new_photo = req.body.old_photo;
        }
        const newTopic = req.body;
        newTopic.photo = new_photo;
        try{
            await Topic.findByIdAndUpdate(id, newTopic);
            res.status(200).json({message: "Topic Updated Successfully"});

        }catch(err){
            res.status(404).json({message: err.message});

        }


    }

    static async deleteTopic(req,res) {
        const id = req.params.id;
        try{
            const result = await Topic.findByIdAndDelete(id);
            if(result.photo != ""){
                try{
                    fs.unlinkSync("./images" + result.photo);

                }catch(err){
                    console.log(err);

                }
            }
            res.status(200).json({message: "Topic Deleted succesfully"});

        }catch(err){
            res.status(404).json({message: err.message});

        }
    }


};  