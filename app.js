const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Middleware
app.use(express.json());

app.use(
	'/graphql',
	graphqlHttp({
		schema: buildSchema(`
			type RootQuery {
				events: [String!]!
			}	

			type RootMutation {
				createEvent(name: String): String
			}

			schema {
				query: RootQuery
				mutation:	RootMutation 
			}
		`),
		rootValue: {
			events: () => {
				return ['Romantic', 'Sailing', 'All-night coding'];
			},
			createEvent: args => {
				const eventName = args.name;
				return eventName;
			}
		},
		graphiql: true
	})
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
