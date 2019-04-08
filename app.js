const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Import Models
const Event = require('./models/event');

const app = express();

// Middleware
app.use(express.json());

app.use(
	'/graphql',
	graphqlHttp({
		schema: buildSchema(`
			type Event {
				_id: ID!
				title: String!
				description: String!
				price: Float!
				date: String!
			}

			input EventInput {
				title: String!
				description: String!
				price: Float!
				date: String!
			}

			type RootQuery {
				events: [Event!]! 
			}	

			type RootMutation {
				createEvent(eventInput: EventInput): Event
			}

			schema {
				query: RootQuery
				mutation:	RootMutation 
			}
		`),
		rootValue: {
			events: () => {
				return Event.find()
					.then(events => {
						return events.map(event => {
							return {
								...event._doc,
								_id: event.id
							};
						});
					})
					.catch(err => {
						throw err;
					});
			},
			createEvent: args => {
				const event = new Event({
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: +args.eventInput.price,
					date: new Date(args.eventInput.date)
				});
				return event
					.save()
					.then(result => {
						return {
							...result._doc,
							_id: result._doc._id.toString()
						};
					})
					.catch(err => {
						throw err;
					});
			}
		},
		graphiql: true
	})
);

// Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${
			process.env.MONGO_PASSWORD
		}@ddcluster-rzhoj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
		{
			useNewUrlParser: true,
			useCreateIndex: true
		}
	)
	.then(() => {
		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`Server is running on port ${port}`));
	})
	.catch(err => {
		console.log(err);
	});
