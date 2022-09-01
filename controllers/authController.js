const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


module.exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        firstName: req.body.firstName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        role: "user",
        governorate: req.body.governorate,
        city: req.body.city,
        address: req.body.address,
        postalCode: req.body.postalCode
    });

    try {
        const savedUser = await user.save();
        return res.status(200).send({ savedUser });

    } catch (err) {
        return res.status(400).json(err);
    }
};


module.exports.logIn = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send("Your username is incorrect");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send("Your password is incorrect");

        const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
        res.header('auth-token', token).status(200).send(token);

    } catch (err) {
        return res.status(400).json(err);
    }
};


/*module.exports.forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('Invalid email ')
        let transporter = nodemailer.createTransport(({
            service: "Outlook365",
            host: "smtp.office365.com",
            port: "587",
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            auth: {
                user: 'medecommerce@outlook.fr',
                pass: '6936A62D91'
            }
        }));

        const payload = {
            email: user.email,
            id: user._id
        };

        const secret = process.env.TOKEN_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const email = user.email;

        let info = {
            from: 'medecommerce@outlook.fr',
            to: `${email}`,
            subject: "Reset password",
            html: `Forgot your password? <br> We received a request to reset the password for your account. <br> 
            To reset your password, click on the link below: <br> http://localhost:3000/api/user/reset-password/${user.id}/${token}`
        };

        transporter.sendMail(info, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Message sent: ");
                res.json({ message: "Message sent" });
            };
        });
        await user.updateOne({ $set: { resetLink: token } });

    } catch (err) {
        console.log(err);
    }
};


module.exports.ResetPassword = async (req, res, next) => {
    const { id, resetLink } = req.params.id
    const { mdp } = req.body

    try {
        const user = await User.findOne({ id: req.params.id, resetLink: req.params.resetLink })

        if (!user) return res.status(400).send('id invalide ')
        console.log(user.resetLink)

        const salt = await bcrypt.genSalt(10)
        const hPassword = await bcrypt.hash(req.body.mdp, salt)
        await user.updateOne({ mdp: hPassword, }).then((docs, err) => {
            if (!err) return res.json({ message: "Password changed." });

        });
    }

    catch (err) {
        console.log(err);
    }
};*/