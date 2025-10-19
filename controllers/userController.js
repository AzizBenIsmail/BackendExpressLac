const userModel = require('../models/userSchema');

// Get all users , add user , delete user , update user

// Create a new user
module.exports.createAdmin = async (req, res) => {
    try {
        // logique
        const { nom, prenom, email, password, age , adminCode} = req.body;
        const role = 'admin';
        const newUser = new userModel({ nom, prenom, email, password, age , role , adminCode });
        await newUser.save();
        res.status(201).json({newUser, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.createClient = async (req, res) => {
    try {
        // logique
        const { nom, prenom, email, password, age , NumTel , Adresse } = req.body;
        const role = 'client';
        const newUser = new userModel({ nom, prenom, email, password, age , role  , NumTel , Adresse });
        await newUser.save();
        res.status(201).json({newUser, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports.getAdmin = async (req, res) => {
    try {
        const users = await userModel.find({role:'admin'});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports.getClient = async (req, res) => {
    try {
        const users = await userModel.find({role:'client'});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}