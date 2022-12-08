const url = "http://localhost:8000/api/v1/titles/";
const urlbestfilm = url + '?sort_by=-imdb_score&page_size=7';
const urlcomedy = url + "?genre=comedy&sort_by=-imdb_score&page_size=7";
const urlfantastic = url + "?genre=History&sort_by=-imdb_score&page_size=7";
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
categories.set('History', urlfantastic);
categories.set('Biography', urlbiography);

let promise = fetch("http://localhost:8000/api/v1/titles/574", {
    method: 'GET'
});

function createModale(key) {
    url_film = url + key.toString();
    console.log(url_film);
    return fetch(url_film)
        .then((resp) => resp.json())
        .then(function (movie) {
            let modale = document.querySelector(".modal");
            let text = document.querySelector('.textArea');
            let img = createNode('img');
            img.src = movie.image_url;
            img.height = "400";
            img.width = '400';
            modale.style.display = "block";
            let text_modal = createNode('p');
            text.textContent += `Titre: ${movie.title} ` + '\n';
            text.textContent += `Genres: ${movie.genres} \n`;
            text.textContent += `Date de sortie: ${movie.year} \n`;
            text.textContent += `Votes: ${movie.votes} \n`;
            text.textContent += `Score Imdb: ${movie.imdb_score} \n`;
            text.textContent += `Réalisateur: ${movie.directors} ` + '\n';
            append(text, img);
            append(modale, text_modal);
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
            // span.innerHTML = `id:${ movies[0].id } `;
            append(div, titre);
            append(div, btn);
            append(btn, img);
            append(div, modal);

            console.log(titre);
            // append(btn, img);
            // append(div, span);
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


var p_Bests = 0;
var p_Comedy = 0;
var p_History = 0;
var p_Biography = 0;

window.onload = function () {
    afficherMasquerBests();
    afficherMasquerComedy();
    afficherMasquerHistory();
    afficherMasquerBiography();
}

function afficherMasquer(Bests) {
    g = document.getElementById(`g_${Bests} `)
    if (p.concat(Bests) == -3)
        g.style.visibility = "hidden";
    else
        console.log(`p_${Bests} `)
    g.style.visibility = "visible";
    d = document.getElementById('d_Bests')
    if (`p_${Bests} ` == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}






function afficherMasquerBests() {
    g = document.getElementById('g_Bests')
    if (p_Bests == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = document.getElementById('d_Bests')
    if (p_Bests == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}

function afficherMasquerComedy() {
    g = document.getElementById('g_Comedy')
    if (p_Comedy == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = document.getElementById('d_Comedy')
    if (p_Comedy == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}

function afficherMasquerHistory() {
    g = document.getElementById('g_History')
    if (p_History == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = document.getElementById('d_History')
    if (p_History == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}

function afficherMasquerBiography() {
    g = document.getElementById('g_Biography')
    if (p_Biography == -3)
        g.style.visibility = "hidden";
    else
        g.style.visibility = "visible";
    d = document.getElementById('d_Biography')
    if (p_Biography == 0)
        d.style.visibility = "hidden";
    else
        d.style.visibility = "visible";
}

function gauche_Bests() {
    if (p_Bests > -3)
        p_Bests--;
    element = document.getElementById('Bests')
    element.style.transform = "translate(" + p_Bests * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerBests();
}


function droite_Bests() {
    if (p_Bests < 0)
        p_Bests++;
    element = document.getElementById('Bests')
    element.style.transform = "translate(" + p_Bests * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerBests();
}

function gauche_Comedy() {
    if (p_Comedy > -3)
        p_Comedy--;
    element = document.getElementById('Comedy')
    element.style.transform = "translate(" + p_Comedy * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerComedy();
}

function droite_Comedy() {
    if (p_Comedy < 0)
        p_Comedy++;
    element = document.getElementById('Comedy')
    element.style.transform = "translate(" + p_Comedy * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerComedy();
}

function gauche_History() {
    if (p_History > -3)
        p_History--;
    element = document.getElementById('History')
    element.style.transform = "translate(" + p_History * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerHistory();
}

function droite_History() {
    if (p_History < 0)
        p_History++;
    element = document.getElementById('History')
    element.style.transform = "translate(" + p_History * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerHistory();
}

function gauche_Biography() {
    if (p_Biography > -3)
        p_Biography--;
    element = document.getElementById('Biography')
    element.style.transform = "translate(" + p_Biography * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerBiography();
}

function droite_Biography() {
    if (p_Biography < 0)
        p_Biography++;
    element = document.getElementById('Biography')
    element.style.transform = "translate(" + p_Biography * 200 + "px)";
    element.style.transition = "all 0.5s ease";
    afficherMasquerBiography();
}


