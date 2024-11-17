const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

// Sign Up
exports.signUp = async (req, res) => {
  const {username, email, password, role} = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({username, email, password: hashedPassword, role})

    const verificationToken = crypto.randomBytes(32).toString('hex')
    user.verificationToken = verificationToken
    await user.save()

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify Your Email',
      text: `Click the link to verify your email: ${process.env.BASE_URL}/verify/${verificationToken}`,
    }

    await transporter.sendMail(mailOptions)
    res.status(201).json({message: 'User registered. Verify your email.'})
  } catch (err) {
    res.status(500).send(err.message)
  }
}

// Login
exports.login = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials')
    }
    if (!user.email_verified) {
      return res.status(400).send('Please verify your email.')
    }

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
    )
    res.json({token})
  } catch (err) {
    res.status(500).send(err.message)
  }
}

// Verify Email
exports.verifyEmail = async (req, res) => {
  const {verificationToken} = req.params
  try {
    const user = await User.findOneAndUpdate(
      {verificationToken},
      {email_verified: true},
      {new: true},
    )
    if (!user) return res.status(400).send('Invalid or expired token.')
    res.send('Email verified successfully.')
  } catch (err) {
    res.status(500).send(err.message)
  }
}
