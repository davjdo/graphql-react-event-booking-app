// Import Models
const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge.js');

module.exports = {
	events: async () => {
		try {
			const events = await Event.find();
			return events.map(event => {
				return transformEvent(event);
			});
		} catch (err) {
			throw err;
		}
	},
	createEvent: async args => {
		const event = new Event({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: +args.eventInput.price,
			date: new Date(args.eventInput.date),
			creator: '5cab8c01f61672635ea7a0bf'
		});
		let createdEvent;
		try {
			const result = await event.save();
			createdEvent = transformEvent(result);
			const creator = await User.findById('5cab8c01f61672635ea7a0bf');
			if (!creator) {
				throw new Error('User not found');
			}
			creator.createdEvents.push(event);
			await creator.save();
			return createdEvent;
		} catch (err) {
			throw err;
		}
	}
};
