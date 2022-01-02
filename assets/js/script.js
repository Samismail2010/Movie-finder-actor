var imdbButtonEl = document.querySelector("#imdbid");
var movieSearchButtonEl = document.querySelector("#moviesearchid");



console.log ("This should just be an html element imdbid button: " + imdbButtonEl);
console.log ("This should just be an html element movieSearchid button: " + movieSearchButtonEl);



async function getActorId() {
	// Get the first actor's id by last name that was entered into the last name search bar
	
	//hard coded last name needs to be removed
	var actorLastName = "Pacino"

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
		console.log("This should be Pacinos id: " + data.results[0].imdb_id);
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
			console.log("This is the data results of the 2nd fetch" + data);
			console.log("This should be the title of the first movie: " + data.results[0][0].title);
		});
	})
	.catch(err => {
		console.error(err);
	});
};





// add event listeners to form and button container
imdbButtonEl.addEventListener("click", getActorId);
//movieSearchButtonEl.addEventListener("click", movieSearchApicall);
