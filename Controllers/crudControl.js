const express = require("express");
const BlogModel = require("../Models/postModel");
const mongoose = require("mongoose");

const Create = async (req, res) => {
  const username = req.params.user;
  console.log(username);
  try {
    const { title, description } = req.body;
    const blog = await BlogModel.create({
      title: title,
      description: description,
      user: username,
    });

    console.log(blog);
    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(400).json(error);
  }
};
const Read = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("user");

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const Update = async (req, res) => {
  const { title, description } = req.body;
  try {
  } catch (error) {}
  // If user exists, update the user
};

const Delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedItem = await BlogModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({ deletedItem });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { Create, Read, Update, Delete };
