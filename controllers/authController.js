
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };
    


    export const loginUser = async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: "User Not Found" });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid Password" });
          }
      
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          user.token = token;
          await user.save();
          res
            .status(200)
            .json({ message: "User Logged In Successfully", token: token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
      };

      export const getUser = async (req, res) => {
        try {
          //const userId = req.user._id;
          const user = await User.find();
          res.status(200).json({ message: "Authorized User", data: user });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      
  