import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import passwordValidator from 'password-validator'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please enter email in correct format'],
    unique: true,
  },
  mobilePhone: {
    type: 'string',
    pattern: '^[0-9]{10}$',
    required: [true, 'Please provide phone number'],
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation function
        const hasUppercase = /[A-Z]/.test(value)
        const hasLowercase = /[a-z]/.test(value)
        const hasNumber = /[0-9]/.test(value)
        const hasSpecialChar = /[~`!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/_₹]/.test(
          value
        )

        return hasUppercase && hasLowercase && hasNumber && hasSpecialChar
      },
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  },
})

// encrypt password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (
  usersendPassword,
  password
) {
  return await bcrypt.compare(usersendPassword, password)
}

// create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

const User = mongoose.model('User', userSchema)
export default User
