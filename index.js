const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const root = {
    message: () => 'Hello World!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));
