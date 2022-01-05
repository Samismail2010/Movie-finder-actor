
document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}


	var imdbButtonEl = document.querySelector("#getActorId");
	var movieListEl = document.querySelector("#movieList");
	var actorNameEl = document.querySelector("#actorName");


	 function getActorId() {
		// Get the first actor's id by last name that was entered into the last name search bar

		//THE CODE BELOW NEEDS TO BE REPLACED WITH A VARIABLE FROM SEARCH BAR.  TEXT FROM SEARCH BAR SHOULD BE SAVED TO actorsLastName on click.
		var actorLastName = actorNameEl.value;

		fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + actorLastName + "/", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
				"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
			}
		})
			.then(function (response) {
				response.json().then(function (data) {
					// console.log("this is data.results in first fetch: " + data.results);
					// console.log("This should be the actors id: " + data.results[0].imdb_id);
					var actorId = data.results[0].imdb_id;
					getMovies(actorId);
				});
			})
			.catch(err => {
				console.error(err);
			});
	};

	 function getMovies(actorId) {
		// Empty our div
		movieListEl.innerHTML =  "";
		// get Movies known for by id using the id fetched in the getActorId function
		// make a get request to url
		 fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + actorId + "/movies_knownFor/?page_size=50", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
				"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
			}
		})
			.then(response => {
				response.json().then(function (data) {
					// console.log("This is the length of data.results: " + data.results.length);
					for (var i = 0; i < data.results.length; i++) {
						console.log("This is each movie listed: " + data.results[i][0].title);
						var movieTitle = data.results[i][0].title

						// display each movie  ***THESE WILL NEED TO BE CHANGED INTO LINKS TO FIND UTELLY API with getMovieVenue(movieTitle) ***
						var movieEl = document.createElement("div");
						movieEl.innerHTML = `<div class="card">
						<div class="card-content">
						  <div class="media">
							<div class="media-content">
							  <p class="title is-4">${movieTitle}</p>
							</div>
						  </div>
					  
						  <div class="content" id="getVenue${i}">
						  </div>
						</div>
					  </div>`;
						movieListEl.appendChild(movieEl);
						getMovieVenue(movieTitle,i);  
					}
					console.log("This should be the title of the first movie: " + data.results[0][0].title);
				});
			})
			.catch(err => {
				console.error(err);
			});
	};
	function getMovieVenue(movieTitle,index) {
		console.log("About to fetch movie venue data");
		 fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieTitle + "&country=us", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
				"x-rapidapi-key": "5fc5aa35cemshe0675fd52f77da4p17df4bjsn02c652d60788"
			}
		})
			.then(response => {
				response.json().then(function (data) {
					console.log(response);
					console.log("This is the number of venues: " + data.results.length);
					for (var i = 0; i < data.results.length; i++) {
						console.log("This is a venue that the movie can be seen now: " + data.results[i].locations[0].display_name);
						var venueEl = document.querySelector("#getVenue"+index);
						var venue = data.results[i].locations[0].display_name;
						console.log("THE ERROR IS NEXT.  The value of venue is: "+ venue);
						console.log(venueEl);
						var venueContainerEl = document.createElement("p");
						venueContainerEl.innerText = venue;
						venueEl.appendChild(venueContainerEl);

					}
				});
			})
			.catch(err => {
				console.error(err);
			});
	};

	// add event listeners to form and button container
	imdbButtonEl.addEventListener("click", getActorId);
	// venueButtonEl.addEventListener("click", getMovieVenue);
});