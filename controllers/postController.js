const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const Post = require('../models/Post');
const {body, validationResult} = require('express-validator')
const { convert } = require('html-to-text');
var validator = require('validator');

module.exports.createPost = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async(err, fields) => {
    const errors = [];
    const { body, id, name, slug, title, description, url, date} = fields;
    if (title === "") {
      errors.push({ msg: "Missing Title" });
    }
    if(date === ""){
      errors.push({ msg: "Missing Date" });
    }
    if(url === "" || validator.isURL(url)===false){
      errors.push({ msg:"URL is missing or invalid"});
    }
    if (body === "") {
      errors.push({ msg: "Missing Body" });
    }
    if (description === "") {
      errors.push({ msg: "Missing Description" });
    }
      let checkSlug;
      try {
        checkSlug = await Post.findOne({ slug });
      } catch (error) {
        errors.push({ msg: error.message });
      }
      if (checkSlug) {
        errors.push({ msg: "Duplicate title" });
      }
    if (errors.length > 0) {
      return res.status(400).json({errors: errors});
      // return res.json({ files });
    }
    else{
      try {
        const post = new Post({
          title,
          body,
          description,
          slug,
          userName: name,
          url,
          date,
          userId: id,
        });
        await post.save();
        return res.status(200).json({ msg: "Your Article is Created", post: post });
      } catch (error) {
        return res.status(500).json({errors: errors, msg: error.message});
        console.log("HEllo");
      }
    
    }
  });
};

module.exports.fetchPosts = async (req, res) =>{
  const id = req.params.id;
  try {
    const response = await Post.find({userId: id });
    return res.status(200).json({response: response});
  } catch (error) {
    return res.status(500).json({errors: errors, msg: error.message});
  }
}

module.exports.fetchPost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findOne({_id: id});
    return res.status(200).json({post});
  } catch (error) {
    return res.status(500).json({errors: errors, msg: error.message});
  }
}

module.exports.updateValidations = [
  body('title').notEmpty().trim().withMessage("Title is required"),
  body('body').notEmpty().trim().custom(value =>{
    let bodyValue = value.replace(/\n/g, '');
    if(convert(bodyValue).trim().length === 0) {
      return false;
    }
    else{
      return true;
    }
  }).withMessage("Body is required"),
  body('description').notEmpty().trim().withMessage("Description is required"),
  body('url').notEmpty().trim().custom(value=>{
    let url = value;
    if(validator.isURL(url)===false){
      return false;
    }
    else{
      return true;
    }
  }).withMessage("Url is required or Invalid"),
  body('date').notEmpty().trim().withMessage("Date is required"),

]

module.exports.updatePost = async (req, res) => {
  const {title, body, description, id, url, date} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  else{
    try {
      const response = await Post.findByIdAndUpdate(id,{
        title, body, description, url, date
      })
      return res.status(200).json({ msg: "Your Article is Updated", post: response });
    } catch (error) {
      return res.status(500).json({errors: errors, msg: error.message});
    }
  }
}

module.exports.deletePost = async (req, res) =>{

  const id = req.params;
  try {
    const response = await Post.findByIdAndRemove({_id: id});
    return res.status(200).json({ msg: "Your Article has been Deleted", post: response });
  } catch (error) {
    return res.status(500).json({errors: errors, msg: error.message});
  }
}

module.exports.home = async (req, res) => {
  try {
    const response = await Post.find({}).sort({updatedAt: -1})
    return res.status(200).json({response: response});
  } catch (error) {
    return res.status(500).json({errors: errors, msg: error.message});
  }
}