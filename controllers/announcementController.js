const Announcement = require('../models/announcementModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createAnnouncement = async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        governorate: req.body.governorate,
        city: req.body.city,
        address: req.body.address,
        description: req.body.description,
        images: req.body.images,
        type: req.body.type,
        postedBy: req.body.postedBy
    });

    try {
        const savedAnnouncement = await announcement.save();
        res.send({ savedAnnouncement });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateAnnouncement = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Announcement.findByIdAndUpdate(
            { _id: req.params.id }, {
            title: req.body.title,
            category: req.body.category,
            subCategory: req.body.subCategory,
            price: req.body.price,
            governorate: req.body.governorate,
            city: req.body.city,
            address: req.body.address,
            description: req.body.description,
            images: req.body.images,
            type: req.body.type
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteAnnouncement = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Announcement.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllAnnouncements = async (req, res) => {
    const announcements = await Announcement.find().populate({ path: 'postedBy', select: ['name', 'firstName', 'phoneNumber'] });
    res.status(200).json(announcements);
};


module.exports.announcementInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Announcement.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    }).populate({ path: 'postedBy', select: ['name', 'firstName', 'phoneNumber'] });
};