const { Users } = require ('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {
    let users = new Users({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    users = await users.save();

    if (!users) return res.status(400).send('The user cannot be created')

    res.send(users);
});

router.get('/:id', async(req,res)=>{
    const { id } = req.params.id
    console.log(id)
    const user = await Users.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

router.get('/', async(req, res) => {
    const userList = await Users.find().select('-passwordHash');

    if (!userList) res.status(500).json({success: false})

    res.send(userList);
});

router.post('/login', async (req,res) => {
    const user = await Users.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})


module.exports = router;