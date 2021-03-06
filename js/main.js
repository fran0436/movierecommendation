function init() {
    let btn = document.querySelector("#search");
    btn.addEventListener('click', keyword);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.addEventListener('keypress', function (keyword) {
        let char = keyword.char || keyword.charCode || keyword.which;
        if (char == 10 || char == 13) {
            //they hit <enter> or <return>
            btn.dispatchEvent(new MouseEvent('click'));
        }
    })
    let btn1 = document.querySelector("#back");
    btn1.addEventListener('click', back);



    const APIKEY = 'e7665ac25f1eddc9cc86e0c24ec4c813';
    let baseURL = 'https://api.themoviedb.org/3/';
    let configData = null;

    let opts = {
        method: 'get',
        mode: 'cors',
    };

    let getConfig = function () {
        let url2 = "".concat(baseURL, 'movie/', keyword, '?api_key=', APIKEY);
        fetch(url2)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                baseImageURL = data.images.secure_base_url;
                configData = data.images;
                console.log('config:', data);
                console.log('config fetched');
            })
            .catch(function (err) {
                alert(err);
            });
    }



    function keyword(e) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        let key = document.getElementById("search-input").value;

        if (key == '') {
            alert('Search a movie');
        } else if (key == key) {
            document.getElementById('search-results').classList.add('page');
            document.querySelector('.content').innerHTML = '';
            key = document.getElementById("search-input").value;
            document.getElementById('recommend-results').classList.add('page');
            document.getElementById('recommend-results').innerHTML = '';
        }



        let baseImageURL = 'https://image.tmdb.org/t/p/w185';
        let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', key);

        fetch(url, opts)
            .then(result => result.json())
            .then((data) => {
                if (data.results == 0) {
                    alert("No movies found with that keyword")
                    let al = document.getElementById("search-results").classList.add('page');
                    al = document.getElementById('search-results').classList.add('page');
                }
                let str = JSON.stringify(data, null, '\t');
//                console.log(str);
                let sec = document.getElementById('search-results');
                let h8 = document.createElement('h3');
                h8 = document.querySelector('.res')
                for (var i = 0, num = str.length; i < num; i++) {

                    let titles = data.results[i].title;
                    h8.innerHTML = ''.concat('Search results based on your search:', '\xa0', key, '\xa0', '</br>', 'This is the amount of movies came up:', '\xa0', data.results.length);
                    console.log(titles);
                    let overview = data.results[i].overview;
                    //                console.log(overview);
                    let image = data.results[i].poster_path;
                    //                console.log(image);
                    let movieId = data.results[i].id;
                    //                console.log(movieId);
                    let release = data.results[i].release_date;
                    let vote = data.results[i].vote_average;

                    let div = document.createElement('div');
                    let h3 = document.createElement('h1');
                    let h5 = document.createElement('h5');
                    h5.innerHTML = ''.concat('Release Date:', '\xa0', release, '</br>', 'Vote Average:', '\xa0', vote);
                    let p = document.createElement('p');
                    let but = document.createElement('button');
                    but.setAttribute("id", "getId");
                    let img = document.createElement('img');
                    img.alt = titles;
                    img.src = ''.concat(baseImageURL, image);
                    //              console.log(img);
                    h3.innerHTML = ''.concat('Movie Title:', '\xa0', titles, '</br>');
                    p.innerHTML = ''.concat('Overview:', '</br>', overview);
                    but.innerHTML = movieId;
                    div.appendChild(img);
                    div.appendChild(h3);
                    div.appendChild(h5);
                    div.appendChild(p);
                    div.appendChild(but);
                    sec = document.querySelector('.content').appendChild(div);
                    document.getElementById('search-results').classList.remove('page');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    but.addEventListener("click", myFunction);

                };

            })
            .catch(function (err) {
                console.log("ERROR: ", err.message);

            })
    }



    function myFunction(e) {

        console.log(e);
        let movieIds = e.path[0].textContent;
        let baseImageURL2 = 'https://image.tmdb.org/t/p/w185';
        console.log(movieIds);
        let url1 = ''.concat(baseURL, 'movie/', movieIds, '/recommendations?api_key=', APIKEY);
        //    console.log(url1)

        fetch(url1, opts)
            .then(result => result.json())
            .then((data) => {
                if (data.results == 0) {
                    alert("No recommended movies")

                }
                let str1 = JSON.stringify(data, null, '\t');
                //            console.log(str1) ;
                let sec1 = document.getElementById('recommend-results');
                for (var i = 0, num = str1.length; i < num; i++) {
                    let title2 = data.results[i].title;
                    console.log(title2);

                    let overview2 = data.results[i].overview;
                    //                console.log(overview2);
                    let image2 = data.results[i].poster_path;
                    console.log(image2);
                    let vote = data.results[i].vote_average;
                    let release = data.results[i].release_date;
                    let h6 = document.createElement('h5');
                    h6.innerHTML = ''.concat('Release Date:', '\xa0', release, '</br>', 'Vote Average:', '\xa0', vote);
                    let div = document.createElement('div');
                    let h4 = document.createElement('h1');
                    let h5 = document.createElement('h1');
                    h5.setAttribute("id", "title");
                    let p2 = document.createElement('p');
                    let img2 = document.createElement('img');
                    let but2 = document.createElement('button');

                    but2.setAttribute("id", "clear");
                    img2.src = ''.concat(baseImageURL2, image2);
                    img2.alt = title2;
                    h4.innerHTML = ''.concat('Movie Title:', '\xa0', title2, '</br>');
                    p2.innerHTML = ''.concat('Overview:', '</br>', overview2);
                    div.appendChild(img2);
                    div.appendChild(h4);
                    div.appendChild(h6);
                    div.appendChild(p2);
                    div.appendChild(but2);

                    sec1.appendChild(div);

                    document.getElementById('recommend-results').classList.remove('page');
                    document.querySelector('.content');
                    document.getElementById('search-results').classList.add('page');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    but2.addEventListener("click", clearFunc);
                };

            })

    }

    function clearFunc(e) {

        let clr = document.getElementById('recommend-results').classList.add('page');
        clr = document.getElementById('recommend-results').classList.add('page');
        clr = document.getElementById('recommend-results').innerHTML = '';
        document.getElementById('search-results').classList.remove('page');
        clr = document.getElementById('search-results').classList.add('page');
        clr = document.getElementById('recommend-results').classList.add('page');



    }

    function back() {
        let clr = document.getElementById('recommend-results').classList.add('page');
        document.getElementById('recommend-results').innerHTML = '';
        document.getElementById('search-results').classList.remove('page');
        document.getElementById('search-results').classList.add('page');
        document.getElementById('search-results').classList.remove('page');
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }
}
document.addEventListener('DOMContentLoaded', init);


//         document.addEventListener('DOMContentLoaded', getConfig);
