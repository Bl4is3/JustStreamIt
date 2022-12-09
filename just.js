const url = "http://localhost:8000/api/v1/titles/";
const urlbestfilm = url + '?sort_by=-imdb_score&page_size=7';
const urlcomedy = url + "?genre=comedy&sort_by=-imdb_score&page_size=7";
const urlhistory = url + "?genre=history&sort_by=-imdb_score&page_size=7";
const urlbiography = url + "?genre=biography&sort_by=-imdb_score&page_size=7";


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}
let categories = new Map();

categories.set('Bests', urlbestfilm);
categories.set('Comedy', urlcomedy);
categories.set('History', urlhistory);
categories.set('Biography', urlbiography);

let promise = fetch("http://localhost:8000/api/v1/titles/574", {
    method: 'GET'
});

function createModale(key) {
    url_film = url + key.toString();
    console.log(url_film);
    return fetch(url_film)
        // interrogation de l'api pour l'id souhaité
        .then((resp) => resp.json())
        .then(function (movie) {
            let modale = document.querySelector(".modal");
            let text = document.querySelector('.textArea');
            let img = createNode('img');
            img.src = movie.image_url;
            img.height = "400";
            img.width = '400';
            modale.style.display = "block";
            let titre = createNode('p');
            titre.textContent = `Title: ${movie.title}`;
            let genres = createNode('p');
            genres.textContent += `Genre: ${movie.genres}`;
            let date_published = createNode('p');
            date_published.textContent = `Date published: ${movie.date_published}`;
            let rated = createNode('p');
            rated.textContent += `Rated: ${movie.rated}`;
            let imdb_score = createNode('p');
            imdb_score.textContent = `Imdb score: ${movie.imdb_score}`;
            let directors = createNode('p');
            directors.textContent += `Directors: ${movie.directors}`;
            let actors = createNode('p');
            actors.textContent = `Actors: ${movie.actors}`;
            let duration = createNode('p');
            duration.textContent += `Duration: ${movie.duration} min`;
            let countries = createNode('p');
            countries.textContent += `Countries: ${movie.countries}`;
            let avg_vote = createNode('p');
            avg_vote.textContent = `AVG Vote: ${movie.avg_vote}`;
            let description = createNode('p');
            description.textContent += `Description: ${movie.description}`;
            append(text, img);
            append(text, titre);
            append(text, genres);
            append(text, date_published);
            append(text, rated);
            append(text, imdb_score);
            append(text, directors);
            append(text, actors);
            append(text, duration);
            append(text, countries);
            append(text, avg_vote);
            append(text, description);
            let span = document.querySelector('.close');
            span.onclick = function () {
                modale.style.display = "none";
                text.innerHTML = ""
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
for (let [key, value] of categories) {

    fetch(value)
        .then((resp) => resp.json())
        .then(function (data) {
            let movies = data.results;
            console.log('movies', movies)
            return movies.map(function (movie) {
                let div = document.getElementById(key);
                let a = createNode('a');
                let img = createNode('img');
                img.src = movie.image_url;
                img.class = "img-fluid"
                img.height = "200";
                img.width = '200';
                a.href = `javascript: createModale(${movie.id}); `;
                a.id = `myBtn_${movie.id} `;
                append(div, a);
                append(a, img);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

function get_best_film(urlbestfilm) {
    return fetch(urlbestfilm)
        .then((resp) => resp.json())
        .then(function (data) {
            let movies = data.results;
            let div = document.getElementById('Best');
            let titre = createNode('h2');
            var btn = createNode('button');
            let img = createNode('img');
            // let span = createNode('span');
            var modal = createNode('div');
            var modal_content = createNode('div');
            var text_modal = createNode('p')
            var span_modal = createNode('span');
            titre.textContent += `${movies[0].title} `;
            img.src = movies[0].image_url;
            img.height = "300";
            img.width = '300';
            btn.id = `myBtn_${movies[0].id} `;

            modal.id = `myModal_${movies[0].id} `;
            modal.className = "modal";
            modal_content.className = 'modal-content';
            text_modal.textContent = `id:${movies[0].id} `;
            span_modal.className = "close";
            span_modal.textContent += 'X';
            append(div, titre);
            append(div, btn);
            append(btn, img);
            append(div, modal);
            append(modal, modal_content);
            append(modal_content, span_modal);
            append(modal_content, text_modal);
            var modal_locale = document.getElementById(`myModal_${movies[0].id} `);

            var btn_local = document.getElementById(`myBtn_${movies[0].id} `);

            btn_local.onclick = function () {
                console.log('ca devrait etre Best');
                modal_locale.style.display = "inline-block";

            }
            span_modal.onclick = function () {
                modal_locale.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal_locale) {
                    modal_locale.style.display = "none";
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

el = get_best_film(urlbestfilm);

p_Bests = 0;
p_Comedy = 0;
p_History = 0;
p_Biography = 0;


window.onload = function () {

    afficherMasquer('Bests');
    afficherMasquer('Comedy');
    afficherMasquer('History');
    afficherMasquer('Biography');
}
// var key = 'Bests;';
// eval("var p = p_" + key + ";")
// console.log('P:', p);
function afficherMasquer(key) {

    eval("var p = p_" + key + ";");
    eval("var id_g = 'g_" + key + "';");
    eval("var id_d = 'd_" + key + "';");

    g = document.getElementById(id_g);
    if (p == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = document.getElementById(id_d)
    if (p == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}

function gauche(key) {
    eval("var p = p_" + key + ";");
    if (p > -3)
        p--;
    element = document.getElementById(key)
    element.style.transform = "translate(" + p * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    eval("p_" + key + " = p;");
    afficherMasquer(key);
}


function droite(key) {
    eval("var p = p_" + key + ";");
    if (p < 0)
        p++;
    element = document.getElementById(key)
    element.style.transform = "translate(" + p * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    eval("p_" + key + " = p;");
    afficherMasquer(key);
}