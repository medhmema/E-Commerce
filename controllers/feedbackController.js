const Feedback = require('../models/feedbackModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createFeedback = async (req, res) => {
    const feedback = new Feedback({
        stars: req.body.stars,
        message: req.body.message,
        feedbackedBy: req.body.feedbackedBy
    });

    try {
        const savedFeedback = await feedback.save();
        res.send({ savedFeedback });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateFeedback = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Feedback.findByIdAndUpdate(
            { _id: req.params.id }, {
                stars: req.body.stars,
                message: req.body.message
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteFeedback = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Feedback.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.find()
    .populate({ path: 'feedbackedBy', select: ['username','name', 'firstName'] });
    res.status(200).json(feedbacks);
};


module.exports.feedbackInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Feedback.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    }).populate({ path: 'feedbackedBy', select: ['username','name', 'firstName'] });
};