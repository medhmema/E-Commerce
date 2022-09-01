const User = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require("bcryptjs");


module.exports.updateUserInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findByIdAndUpdate(
            { _id: req.params.id }, {
            username: req.body.username,
            name: req.body.name,
            firstName: req.body.firstName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role,
            governorate: req.body.governorate,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode
        }
        ).then((err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json(err);
    };
};


module.exports.updateUserPassword = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.findByIdAndUpdate(
            { _id: req.params.id }, {
            password: hashedPassword
        }
        ).then((err) => {
            if (!err) return res.json({ message: "Password succefully updated" });
        });

    } catch (err) {
        return res.status(500).json(err);
    };
};


module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });

    } catch (err) {
        return res.status(500).json({ message: err });
    };
};


module.exports.saveAnnouncement = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return User.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    savedAnnouncements: req.body.savedAnnouncements
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        ).populate({ path: 'savedAnnouncements', select: ['title', 'price'] });
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.unsaveAnnouncement = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return User.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    savedAnnouncements: req.body.savedAnnouncements
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        ).populate({ path: 'savedAnnouncements', select: ['title', 'price'] });
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.likeUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
                $pull: { dislikers: req.body.id }
            },
            { new: true })
            .catch((err) => { return res.status(500).send({ message: err }) });

        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
                $pull: { dislikes: req.params.id }
            },
            { new: true })
            .then(() => { return res.json({ message: "Done !" }) })
            .catch((err) => { return res.status(500).send({ message: err }) });
    } catch (err) {
        return res.status(500).send(err);
    }
};



module.exports.unlikeUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true })
            .catch((err) => { return res.status(500).send({ message: err }) });

        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true })
            .then(() => { return res.json({ message: "Done !" }) })
            .catch((err) => { return res.status(500).send({ message: err }) });
    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.dislikeUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { dislikers: req.body.id },
                $pull: { likers: req.body.id }
            },
            { new: true })
            .catch((err) => { return res.status(500).send({ message: err }) });

        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { dislikes: req.params.id },
                $pull: { likes: req.params.id }
            },
            { new: true })
            .then(() => { return res.json({ message: "Done !" }) })
            .catch((err) => { return res.status(500).send({ message: err }) });
    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.undislikeUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { dislikers: req.body.id }
            },
            { new: true })
            .catch((err) => { return res.status(500).send({ message: err }) });

        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { dislikes: req.params.id }
            },
            { new: true })
            .then(() => { return res.json({ message: "Done !" }) })
            .catch((err) => { return res.status(500).send({ message: err }) });
    } catch (err) {
        return res.status(400).send(err);
    }
};

// Display functions

module.exports.getAllUsers = async (req, res) => {
    const users = await User.find().populate({ path: 'savedAnnouncements', select: ['title', 'price'] });
    res.status(200).json(users);
};


module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err)
    });
};