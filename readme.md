# Star Wars API

Run out of time to put it in docker.
Needs a .env file, similar to .env.template

### `npm install`

Install dependencies.

### `npm start`

Runs the app.\

## Documentation

### /films

Returns all films

### /films/:id

Returns a specific film

### /planets

Returns all planets

### /planets/:id

Returns a specific planet

### /planets/page/:page

Returns 10 planets

### /species

Returns all species

### /species/:id

Returns a specific species

### /species/page/:page

Returns 10 species

### /starships

Returns all starships

### /starships/:id

Returns a specific starship

### /starships/page/:page

Returns 10 starships

### /vehicles

Returns all vehicles

### /vehicles/:id

Returns a specific vehicle

### /vehicles/page/:page

Returns 10 vehicles

### /opening_crawl/word_count

Returns array of words and their number of occurances in opening crawls.

### /opening_crawl/most_popular

Returns a name or names of characters that appear in openings most often.

### /opening_crawl/trie

Returns total number of nodes in a trie build from words in openings.

### /signup

Create user. Needs 'email' and 'password' as input.

### /login

Login. Needs 'email' and 'password' as input. Returns a token.

## User

These endpoints need authentication.
In header:
authorization: bearer ${token}

### /user/films

Returns all user films

### /user/films/:id

Returns a specific film

### /user/planet or /user/homeworld

Returns user planet

### /user/planets/:id

Returns a specific planet

### /user/species

Returns all user species

### /user/species/:id

Returns a specific species

### /user/starships

Returns all user starships

### /user/starships/:id

Returns a specific starship

### /user/vehicles

Returns all vehicles

### /user/vehicles/:id

Returns a specific vehicle
