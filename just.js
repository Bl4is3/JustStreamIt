const url = "http://localhost:8000/api/v1/titles/";
const urlbestfilm = url + '?sort_by=-imdb_score&page_size=8';
const urlcomedy = url + "?genre=comedy&sort_by=-imdb_score&page_size=7";
const urlhistory = url + "?genre=history&sort_by=-imdb_score&page_size=7";
const urlbiography = url + "?genre=biography&sort_by=-imdb_score&page_size=7";

let categories = new Map();

categories.set('Bests', urlbestfilm);
categories.set('Comedy', urlcomedy);
categories.set('History', urlhistory);
categories.set('Biography', urlbiography);

function createModale(
    titre,
    image_url,
    genres,
    date_published,
    rated,
    imdb_score,
    directors,
    actors,
    duration,
    countries,
    avg_vote,
    description
) {
    document.querySelector(".modal").style.display = "block";
    document.getElementById('titre').innerHTML += titre;
    document.getElementById('img_modale').src = image_url;
    document.getElementById('genres').innerHTML = 'Genre: ' + genres;
    document.getElementById('date_published').innerHTML += date_published;
    document.getElementById('rated').innerHTML += rated;
    document.getElementById('imdb_score').innerHTML += imdb_score;
    document.getElementById('directors').innerHTML += directors;
    document.getElementById('actors').innerHTML += actors;
    document.getElementById('duration').innerHTML += duration;
    document.getElementById('countries').innerHTML += countries;
    document.getElementById('avg_vote').innerHTML += avg_vote;
    document.getElementById('description').innerHTML += description;
}

function get_element_film(key, modale_creation = true) {
    url_film = url + key.toString();
    return fetch(url_film)
        .then((resp) => resp.json())
        .then(function (movie) {
            var image_url = movie.image_url;
            let titre = movie.title;
            let genres = movie.genres;
            let date_published = movie.date_published;
            let rated = movie.rated;
            let imdb_score = movie.imdb_score;
            let directors = movie.directors;
            let actors = movie.actors;
            let duration = movie.duration;
            let countries = movie.countries;
            let avg_vote = movie.avg_vote;
            let description = movie.description;
            if (modale_creation) {
                createModale(titre,
                    image_url,
                    genres,
                    date_published,
                    rated,
                    imdb_score,
                    directors,
                    actors,
                    duration,
                    countries,
                    avg_vote,
                    description)
            }
            else {
                document.getElementById('top_film').src = movie.image_url;
                document.getElementById('titre_best').innerHTML = movie.title
                document.getElementById('resume_best').innerHTML += movie.description
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
for (let [key, value] of categories) {
    eval("var position_" + key + "=0;");
    afficherMasquer(key);
    fetch(value)
        .then((resp) => resp.json())
        .then(function (data) {
            let movies = data.results;
            if (key == 'Bests') {
                document.getElementById('top_film').src = movies[0].image_url;
                get_element_film(movies[0].id, modale_creation = false);
                //supression du 1er éléménet du tableau
                movies.shift();
            }
            return movies.map(function (movie) {
                const image = document.getElementById(key).children;
                image[movies.indexOf(movie)].src = movie.image_url;
                image[movies.indexOf(movie)].dataset.id = movie.id;  // utilisation de l'attaribut data- idela avec HTML5, recupérable en JS et en CSS
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}


const span = document.querySelector('.close');
span.addEventListener('click', function () {
    modale = document.querySelector('.modal');
    modale.style.display = "none";

});

const elts_left = document.querySelectorAll('.btn-left');
elts_left.forEach(function (elt_left) {
    elt_left.addEventListener('click', function () {
        key = elt_left.previousElementSibling.childNodes[1].id;
        eval("var position = position_" + key + ";");
        if (position > -3) {
            position--;
        }
        element = document.getElementById(key)
        element.style.transform = "translate(" + position * 200 + "px)";
        element.style.transition = "all 0.5s ease";
        eval("position_" + key + " = position;");
        afficherMasquer(key);
    });
});

const elts_right = document.querySelectorAll('.btn-right');
elts_right.forEach(function (elt_right) {
    elt_right.addEventListener('click', function () {
        key = elt_right.previousElementSibling.previousElementSibling.childNodes[1].id;
        eval("var position = position_" + key + ";");
        if (position < 0) {
            position++;
        }
        element = document.getElementById(key)
        element.style.transform = "translate(" + position * 200 + "px)";
        element.style.transition = "all 0.5s ease";
        eval("position_" + key + " = position;");
        afficherMasquer(key);
    });
});

const images_cliquable = document.querySelectorAll('.img');
images_cliquable.forEach(function (image_cliquable) {
    image_cliquable.addEventListener('click', function () {
        get_element_film(image_cliquable.dataset.id)
        console.log(image_cliquable.dataset.id)
    });
});

function afficherMasquer(key) {
    diva = document.getElementById(key).parentElement.parentElement;
    eval("var position = position_" + key + ";");
    g = diva.querySelector(' .btn-left');
    if (position == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = diva.querySelector('.btn-right');
    if (position == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";

}
