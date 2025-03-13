//! creating a basic express server:
// init the jokes and albums fixturesL
const jokes = require("./data/jokes.js");
const albums = require("./data/albums.js");
const { randomizer } = require("./helper/random.js")

// TODO: need a helper functions as well:
// Init an express server:
const express = require("express");
// invoke express: since express is a function!
const app = express();
const cors = require("cors");
const PORT = 3000;

//? body parser is depracated:
// app.use(bodyParser());
// Middle-ware to parse to JSON: 
app.use(express.json());
app.use(cors());

// home Route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to my Jokes & Albums API</h1>");
});

// jokes Route
app.get("/jokes", async (req, res) => {
    try {
        if (!jokes || jokes.length === 0) {
            return res.status(404).json({ error: "No jokes found" });
        }

        // Return a single random joke
        const randomJoke = randomizer(jokes);
        res.json(randomJoke);

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve a joke" });
    }
});

//* put updates in place, and modify the existing data:
//* post on the other hand will actually create a new piece of data:
app.put("/jokes/:id", async (req, res) => {
    try {
        const jokeId = parseInt(req.params.id, 10);
        const jokeIndex = jokes.findIndex(joke => joke.id === jokeId);

        if (jokeIndex === -1) {
            return res.status(404).json({ error: `Joke with ID ${jokeId} not found.` });
        }

        // update the joke
        jokes[jokeIndex] = { ...jokes[jokeIndex], ...req.body };

        res.json({ message: "Joke updated successfully!", joke: jokes[jokeIndex] });

    } catch (error) {
        res.status(500).json({ error: "Failed to update the joke" });
    }
});

// delete the joke by id
app.delete("/jokes/:id", async (req, res) => {
    try {
        const jokeId = parseInt(req.params.id, 10);
        const jokeIndex = jokes.findIndex(joke => joke.id === jokeId);

        if (jokeIndex === -1) {
            return res.status(404).json({ error: `Joke with ID ${jokeId} not found.` });
        }

        const deletedJoke = jokes.splice(jokeIndex, 1);
        res.json({ message: "Joke deleted successfully!", joke: deletedJoke });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete the joke" });
    }
});

//  albums API Route
app.get("/albums", async (req, res) => {
    try {
        if (!albums || albums.length === 0) {
            return res.status(404).json({ error: "No albums found" });
        }

        //  Return a single random album
        const randomAlbum = randomizer(albums);
        res.json(randomAlbum);

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve an album" });
    }
});

//  404 route Handler
app.use((req, res) => {
    res.status(404).json({ error: "404 - Route Not Found" });
});

// start Server and listen to the default PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});