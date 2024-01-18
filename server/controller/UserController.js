import bigPromise from '../middlewares/bigPromise.js'
import User from '../models/user.js'
import Product from '../models/product.js'

//Any new user can register the portal
export const createUser = bigPromise(async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobilePhone,
      password,
      confirmPassword,
    } = req.body

    //check if the fields are missing
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobilePhone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all the required fields',
      })
    }

    //check if the user already exists
    const existingUser = await User.findOne({ email: email })
      .lean()
      .catch((error) => {
        console.log(`erroe which chekcing for existing user: ${error}`)
      })

    // check if exists
    if (existingUser) {
      return res.status(500).json({
        success: true,
        message: 'User already exist with the email-id provided by you!',
      })
    }

    // checking is passwords matches
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ success: true, message: 'Password doesnt matches' })
    }

    //creating a new user
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobilePhone: req.body.mobilePhone,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    })
    // console.log(user.firstName)
    return res
      .status(200)
      .json({ success: true, message: 'User created successfully', data: user })
  } catch (error) {
    console.log(`Error while creating a new user:${error}`)
  }
})

//the user can login
export const Login = bigPromise(async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: 'false',
        message: 'please enter all the required fields!',
      })
    }

    //check if the user exists with the provided email id
    const user = await User.findOne({ email: email })
      .lean()
      .catch((error) => {
        console.log(`erroe which chekcing for existing user: ${error}`)
      })

    // if the user not found with provided email id
    if (!user)
      return res.status(400).json({
        success: 'false',
        message: 'no such user found with the provided email',
      })

    const passwordValidationResult = checkPasswordValidation(password)
    if (passwordValidationResult !== null) {
      return res.status(400).json({
        success: false,
        message: passwordValidationResult,
      })
    }

    const isPasswordCorrect = await user.isValidatedPassword(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: 'false',
        message: 'Incorrect Password',
      })
    }
    res
      .status(200)
      .json({ success: true, message: 'You have login successfully', user })
  } catch (error) {
    console.log(`Error while login :${error}`)
  }
})
