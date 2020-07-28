$(document).ready(() => {
    $('#buscador').on('submit', (e) => {
        var buscarPorTitulo = $('#buscarPorTitulo').val();
        porTitulo(buscarPorTitulo);
        e.preventDefault();
    });
});

function porTitulo(buscarPorTitulo) {
    axios.get('https://www.omdbapi.com?s=' + buscarPorTitulo + "&apikey=2f3031c")
        .then((respuesta) => {
            console.log(respuesta);
            var peliculas = respuesta.data.Search;
            var output = '';
            $.each(peliculas, (index, movie) => {
                output += `
                <table>
                    <tr>
                        <th><strong>Póster:</strong><br><img src="${movie.Poster}" width="100" height="100"><br></th>
                        <th><br><strong>Titulo:</strong><br>${movie.Title}</th>
                        <th><br><strong>Publicación:</strong><br> ${movie.Released}</th>
                        <th><br><strong>Género:</strong> <br>${movie.Genre}</th>
                        <th><br><strong>Código:</strong> <br>${movie.imdbID}</th>
                        <th><br><br><a class="button" onclick="porId('${movie.imdbID}')" href="#">Detalles</a></th>                       
                    </tr>     
                </table>
                `;
            });
            $('#peliculas').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function porId(id) {
    sessionStorage.setItem('peliculaId', id);
    window.location = 'infPelicula.html';
    return false;
}

function infPelicula() {
    var peliculaId = sessionStorage.getItem('peliculaId');
    axios.get('http://www.omdbapi.com?i=' + peliculaId + "&apikey=2f3031c")
        .then((respuesta) => {
            console.log(respuesta);
            var movie = respuesta.data;
            var output = `
            <table>
                    <tr>
                        <th scope="col"><br><br><img src="${movie.Poster}" width="150" height="150"><br><strong>Titulo:</strong><br>${movie.Title}</th>
                        <th scope="col"><strong>Género:</strong> ${movie.Genre}<br>
                        <strong>Publicación:</strong> ${movie.Released}<br>
                        <strong>Clasificación:</strong> ${movie.Rated}<br>
                        <strong>Calificación IMDB:</strong> ${movie.imdbRating}<br>
                        <strong>Director:</strong> ${movie.Director}<br>
                        <strong>Escritor:</strong> ${movie.Writer}<br>
                        <strong>Actores:</strong> ${movie.Actors}<br>
                        <strong>Código:</strong> ${movie.imdbID}<br>
                        <strong>Introducción:</strong> ${movie.Plot}</th>
                    </tr>
            </table>
        `;
            $('#inf').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

$(document).ready(() => {
    $('#buscadorid').on('submit', (e) => {
        var buscID = $('#buscID').val();
        buscarPorId(buscID);
        e.preventDefault();
    });
});

function buscarPorId(id) {
    axios.get('https://www.omdbapi.com?i=' + id + "&apikey=2f3031c")
        .then((respuesta) => {
            console.log(respuesta);
            var movieID = respuesta.data;
            var output = `
                <table>
                    <tr>
                        <th><br><br><img src="${movieID.Poster}" width="150" height="150"><br><strong>Titulo:</strong><br>${movieID.Title}</th>
                        <th><strong>Género:</strong> ${movieID.Genre}<br>
                        <strong>Publicación:</strong> ${movieID.Released}<br>
                        <strong>Clasificación:</strong> ${movieID.Rated}<br>
                        <strong>Calificación IMDB:</strong> ${movieID.imdbRating}<br>
                        <strong>Director:</strong> ${movieID.Director}<br>
                        <strong>Escritor:</strong> ${movieID.Writer}<br>
                        <strong>Actores:</strong> ${movieID.Actors}<br>
                        <strong>Código:</strong> ${movieID.imdbID}<br>
                        <strong>Introducción:</strong> ${movieID.Plot}</th>
                    </tr>
                </table>
        `;
            $('#peliculasid').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}