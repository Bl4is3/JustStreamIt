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
    document.getElementById('genres').innerHTML += genres;
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

function get_element_film(key, n) {
    url_film = url + key.toString();
    return fetch(url_film)
        // interrogation de l'api pour l'id souhaité
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
            if (n == 0) {
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
                document.getElementById('oups').src = movie.image_url;
                document.getElementById('titre_best').innerHTML = movie.title
                document.getElementById('resume_best').innerHTML += movie.description
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
for (let [key, value] of categories) {
    eval("var p_" + key + "=0;");
    afficherMasquer(key);
    fetch(value)
        .then((resp) => resp.json())
        .then(function (data) {
            let movies = data.results;
            if (key == 'Bests') {
                document.getElementById('oups').src = movies[0].image_url;
                get_element_film(movies[0].id, 1);
                //supression du 1er éléménet du tableau
                movies.shift();
            }
            return movies.map(function (movie) {
                const elt_href = document.getElementById(key).children;
                const image = elt_href[movies.indexOf(movie)].children;
                image[0].src = movie.image_url;
                elt_href[movies.indexOf(movie)].href = `javascript: get_element_film(${movie.id},0);`;
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

// function get_best_film(urlbestfilm) {
//     // object-fit cover pour affichage
//     return fetch(urlbestfilm)
//         .then((resp) => resp.json())
//         .then(function (data) {
//             let movies = data.results;
//             let div = document.getElementById('Best');
//             let titre = createNode('h2');
//             var btn = createNode('button');
//             let img = createNode('img');
//             // let span = createNode('span');
//             var modal = createNode('div');
//             var modal_content = createNode('div');
//             var text_modal = createNode('p')
//             var span_modal = createNode('span');
//             titre.textContent += `${movies[0].title} `;
//             img.src = movies[0].image_url;
//             img.height = "300";
//             img.width = '300';
//             btn.id = `myBtn_${movies[0].id} `;

//             modal.id = `myModal_${movies[0].id} `;
//             modal.className = "modal";
//             modal_content.className = 'modal-content';
//             text_modal.textContent = `id:${movies[0].id} `;
//             span_modal.className = "close";
//             span_modal.textContent += 'X';
//             append(div, titre);
//             append(div, btn);
//             append(btn, img);
//             append(div, modal);
//             append(modal, modal_content);
//             append(modal_content, span_modal);
//             append(modal_content, text_modal);
//             var modal_locale = document.getElementById(`myModal_${movies[0].id} `);

//             var btn_local = document.getElementById(`myBtn_${movies[0].id} `);

//             btn_local.onclick = function () {
//                 console.log('ca devrait etre Best');
//                 modal_locale.style.display = "inline-block";

//             }
//             span_modal.onclick = function () {
//                 modal_locale.style.display = "none";
//             }
//             window.onclick = function (event) {
//                 if (event.target == modal_locale) {
//                     modal_locale.style.display = "none";
//                 }
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// el = get_best_film(urlbestfilm);


const span = document.querySelector('.close');
span.addEventListener('click', function () {
    modale = document.querySelector('.modal');
    modale.style.display = "none";
    document.getElementById('titre').innerHTML = "Titre: ";
    document.getElementById('img_modale').src = "";
    document.getElementById('genres').innerHTML = "genres: ";
    document.getElementById('date_published').innerHTML = "date_published: ";
    document.getElementById('rated').innerHTML = "rated: ";
    document.getElementById('imdb_score').innerHTML = "imdb_score: ";
    document.getElementById('directors').innerHTML = "directors: ";
    document.getElementById('actors').innerHTML = "actors: ";
    document.getElementById('duration').innerHTML = "duration: ";
    document.getElementById('countries').innerHTML = "countries: ";
    document.getElementById('avg_vote').innerHTML = "avg_vote: ";
    document.getElementById('description').innerHTML = "description: ";

});

const elts_left = document.querySelectorAll('.btn-left');
elts_left.forEach(function (elt_left) {
    elt_left.addEventListener('click', function () {
        key = elt_left.previousElementSibling.childNodes[1].id;
        eval("var p = p_" + key + ";");
        if (p > -3)
            p--;
        element = document.getElementById(key)
        element.style.transform = "translate(" + p * 200 + "px)";
        element.style.transition = "all 0.5s ease";
        eval("p_" + key + " = p;");
        afficherMasquer(key);
    });
});

const elts_right = document.querySelectorAll('.btn-right');
elts_right.forEach(function (elt_right) {
    elt_right.addEventListener('click', function () {
        key = elt_right.previousElementSibling.previousElementSibling.childNodes[1].id;
        eval("var p = p_" + key + ";");
        if (p < 0)
            p++;
        element = document.getElementById(key)
        element.style.transform = "translate(" + p * 200 + "px)";
        element.style.transition = "all 0.5s ease";
        eval("p_" + key + " = p;");
        afficherMasquer(key);
    });
});

function afficherMasquer(key) {
    diva = document.getElementById(key).parentElement.parentElement;
    eval("var p = p_" + key + ";");
    g = diva.querySelector(' .btn-left');
    if (p == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = diva.querySelector('.btn-right');
    if (p == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";

}
