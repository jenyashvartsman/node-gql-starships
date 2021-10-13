const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const port = 4000;
const {starshipsData} = require('./src/data/starshipsData');

const schema = buildSchema(`
    type Query {
        starship(id: Int!): Starship
        starships(universe: String): [Starship]
    },
    type Starship {
        id: Int
        name: String
        universe: String
        captain: String
        type: String
        crewSize: Int
        image: String
    }
`);

const getStarship = (args) => {
    return starshipsData.find(starship => starship.id === args.id) || null;
}

const getStarships = (args) => {
    return !!args.universe ? starshipsData.filter(starship => starship.universe === args.universe) : starshipsData;
}

const root = {
    starship: getStarship,
    starships: getStarships,
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use(express.static('public'));
app.listen(port, () => console.log(`Express GraphQL Server Now Running On localhost:${port}/graphql`));
