const Order = require('../models/orderModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createOrder = async (req, res) => {
    const order = new Order({
        announcement: req.body.announcement,
        postedBy: req.body.postedBy,
        orderedBy: req.body.orderedBy
    });

    try {
        const savedOrder = await order.save();
        res.send({ savedOrder });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateOrder = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Order.findByIdAndUpdate(
            { _id: req.params.id }, {
            announcement: req.body.announcement,
            postedBy: req.body.postedBy,
            orderedBy: req.body.orderedBy,
            state: req.body.state
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteOrder = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Order.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllOrders = async (req, res) => {
    const orders = await Order.find()
    .populate({ path: 'announcement', select: ['title', 'price', 'type'] })
    .populate({ path: 'postedBy', select: ['name', 'firstName', 'phoneNumber'] })
    .populate({ path: 'orderedBy', select: ['name', 'firstName', 'phoneNumber'] });
    res.status(200).json(orders);
};


module.exports.orderInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Order.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    }).populate({ path: 'announcement', select: ['title', 'price', 'type'] })
    .populate({ path: 'postedBy', select: ['name', 'firstName', 'phoneNumber'] })
    .populate({ path: 'orderedBy', select: ['name', 'firstName', 'phoneNumber'] });;
};