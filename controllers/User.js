import db from "../models/index.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Users = db.Users
export const getUsers = async (req, res) => {
   try {
    const user = await Users.findAll({
        attributes:['name','email','roles']
    })
    res.status(200).json(user);
   } catch (error) {
        console.log(error);
   }
}

export const Register = async (req, res) => {
    const { name, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Users.create({
        name : name,
        email : email,
        password : hashPassword,
        roles : "member"
      })
      
      res.status(200).json({
        msg : "Register Success",
        "name" : name,
        "email" : email,
        "roles" : Users.roles
    });
    } catch (error) {
        res.json({msg : "You need Superadmin access to create this role!"})
    }
}

export const RegisterAdmin = async (req, res) => {
    const { name, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Users.create({
        name : name,
        email : email,
        password : hashPassword,
        roles : "admin"
      })
      res.status(200).json({
        msg : "Register Success",
        "name" : name,
        "email" : email,
        "roles" : Users.roles
    });
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const roles = user[0].roles;
        const accessToken = jwt.sign({userId, name, email, roles}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '180d'
        });
        const refreshToken = jwt.sign({userId, name, email, roles}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ 
            msg: "Login Success", 
            "id"    : userId,
            "name"  : name,
            "email" : email,
            "token" : accessToken
        });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

export const CurrentUser = async(req, res) => {
    try {
        const currentUser = req.user;
        res.status(200).json(currentUser)
    } catch (error) {
        res.json({msg : "Invalid Login Credentials"});
    }
    
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const name = user[0].name;
    await Users.update({refresh_token: null},{
        where:{
            name: name
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}