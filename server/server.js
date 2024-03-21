// Importing Modules/Packages
const corsOptions = { origin: ['http://localhost:5173', 'https://openchat-0ptg.onrender.com'] };
const { expressMiddleware } = require('@apollo/server/express4');
const { connection } = require('./database/database');
const { ApolloServer } = require('@apollo/server');
const schema = require('./schema/schema');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Creating an instance of ApolloServer for testing queries and mutations
const server = new ApolloServer({ schema });

const startApolloServerAndApp = async () => {

    // Starting Apollo Server
    await server.start();

    // Middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    // Creating API Route for Apollo Server
    app.use('/graphQL', cors(corsOptions), expressMiddleware(server));

    // Listening for Database open
    connection.once('open', () => {
        console.log('Database connected successfully!');

        // Starting Server
        app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`))
        .on('error', (error) => console.log(`Server Error: ${error}`));
    })
    .on('error', (error) => console.log(`Database Connection Error: ${error}`));
}

// Starts Application
startApolloServerAndApp();


