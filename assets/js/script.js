var imdbButtonEl = document.querySelector("#getActorId");
var movieSearchButtonEl = document.querySelector("getVenue");



console.log ("This should just be an html element imdbid button: " + imdbButtonEl);
console.log ("This should just be an html element movieSearchid button: " + movieSearchButtonEl);



async function getActorId() {
	// Get the first actor's id by last name that was entered into the last name search bar
	
	//hard coded last name needs to be removed
	var actorLastName = "Pitt"

	await fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/"+ actorLastName + "/", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
			"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
		}
	})
	.then(function(response){
		response.json().then(function(data) {
		console.log("this is data.results in first fetch: " + data.results);
		console.log("This should be the actors id: " + data.results[0].imdb_id);
		var actorId = data.results[0].imdb_id;
		getMovies(actorId);
		});
	})
	.catch(err => {
		console.error(err);
	});
};		

async function getMovies (actorId) {
// get Movies known for by id using the id fetched in the getActorId function
// make a get request to url
	await fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + actorId + "/movies_knownFor/?page_size=50", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
			"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
		}
	})
	.then(response => {
		response.json().then(function(data) {
			console.log("This is the length of data.results: " + data.results.length);
			for (var i = 0; i < 1; i++) { //data.results.length; i++) {
			console.log ("This is each movie listed: " + data.results[i][0].title);
			var movieTitle = data.results[i][0].title //*** THIS IS JUST PLACEHOLDER TO TEST WITH.  REAL CODE Should display each on screen as clickable text. */
				
			getMovieVenue(movieTitle);
			}
			console.log("This should be the title of the first movie: " + data.results[0][0].title);
		});
	})
	.catch(err => {
		console.error(err);
	});
};
async function getMovieVenue (movieTitle) {
	console.log ("About to fetch movie venue data");
	await fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieTitle + "&country=us", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
			"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
		}
	})
	.then(response => {
		response.json().then(function(data) {
		console.log(response);
		console.log("This is the number of venues: " + data.results.length);
			for (var i = 0; i < data.results.length; i++) {
				console.log ("This is a venue that the movie can be seen now: " + data.results[i].locations[0].display_name);
			}
		});
	})
	.catch(err => {
		console.error(err);
	});
};






// add event listeners to form and button container
imdbButtonEl.addEventListener("click", getActorId);
//movieSearchButtonEl.addEventListener("click", getVenue);
