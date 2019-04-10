const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Model
const User = require('../../models/user');

module.exports = {
	createUser: async args => {
		try {
			const existingUser = await User.findOne({ email: args.userInput.email });
			if (existingUser) {
				throw new Error('User already exist');
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
			const user = new User({
				email: args.userInput.email,
				password: hashedPassword
			});
			const result = await user.save();
			return { ...result._doc, _id: result.id, password: null };
		} catch (err) {
			throw err;
		}
	},
	login: async ({ email, password }) => {
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error('User does not exists!');
		}
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			throw new Error('Password is incorrect');
		}
		const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET, {
			expiresIn: '1h'
		});
		return { userId: user._id, token: token, tokenExpiration: 1 };
	}
};
