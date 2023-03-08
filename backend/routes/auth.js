const express = require('express');
const { body,validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')
const router = express.Router(); 

const JWT_SECRET = "Harsh@$%#123";

// router.get('/', (req,res) => {
//     obj = {
//         a: 'thios', 
//         number:34
//     }
//     res.json(obj)
// }).


// router.get("/", (req, res) => {
//     console.log(req.body)
//     res.send("Hello")
// })


// Create a user using: POST "/api/auth/". Doesn't require auth

// router.post('/',(req, res) => {
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);

// })


// // Create a user using: POST "/api/auth/createuser". No login required.

// router.post("/createuser", [
//     body('name',"Enter a valid name").isLength({min:3}),
//     body('email',"Enter a valid email").isEmail(),
//     body('password',"Password must be at least 5 characters").isLength({min:5})
// ], (req, res) => {

//     // if there are errors, return Bad request and the errors.
//     const errors = validationResult(req);
//     if(!errors.isEmpty())
//     {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     User.create({
//         name: req.body.name,
//         email:req.body.email,
//         password: req.body.password,
//     }).then(user => res.json(user))
//         .catch(err => {
//             console.log(err)
//             res.json({ error: "Please enter a unique value for email", message:err.message})
//         })
// })



// Route1: Create a user using: POST "/api/auth/createuser". No login required.

router.post("/createuser", [
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be at least 5 characters").isLength({min:5})
], async(req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({success, errors: errors.array() });
    }

    // check whether the user with this email exists already.
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);  // await means wait to resolve this line of code after go to other line this is due to asynchronous nature of javascript.
        const secPass = await bcrypt.hash(req.body.password,salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id:user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);
        success = true;
        // res.json(user);
        res.json({success, authtoken });  // whenever this authtoken is given to me then i can convert this token into real data and using secret key i can find that anyone don't hack the site.
    }

    // Catch error
    catch (error)
    {
        // console.error(error.message);
        res.status(500).send("Internal server error");
    }
        
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: "Please enter a unique value for email", message:err.message})
        // })
})


// Route 2: Authenticate a user using: POST "/api/auth/createuser": No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body("password",'Password cannot be blank').exists(),
], async (req, res) => {
    
    let success = false;
    // if there are errors then return bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty())
    { 
        return res.status(400).json({success, errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email})

        if(!user)
        { 
            return res.status(400).json({success, error: 'Please try to login with current credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare)
        { 
            return res.status(400).json({success, error: "Please try to login with current credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });

    }
    catch (error)
    {
        // console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route3: Get loggedin User Details using: POST "/api/auth/getuser". Login required.
router.post('/getuser',fetchuser, async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");   // find the user by userid except password. 
        res.send(user);
    }
    catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})
module.exports = router;





// JWT ---> JSONWEBTOKENS:


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
//     SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// first string tells about ---> HEADER: ALGORITHM & TOKEN TYPE
// {
//     "alg": "HS256",
//     "typ": "JWT"
// }
  
// second string tells about ---> PAYLOAD: DATA
// {
//     "sub": "1234567890",
//     "name": "John Doe",
//     "iat": 1516239022
// }

// third string tells about ---> VERIFY SIGNATURE
//     HMACSHA256(
//     base64UrlEncode(header) + "." +
//     base64UrlEncode(payload),
    
//   your-256-bit-secret
  
//   ) secret base64 encoded