window.onload = function () {
    let sport = document.getElementById("sport");
    let gameList = document.getElementById("games-list");
    let signupBtn = document.getElementById("sign-in");
    let sportsList = document.getElementById("nav-list");
    let newsList = document.getElementById("news-list");
    let standingsList = document.getElementById("standings-list");
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let today = document.getElementById('date');
    today.innerHTML = year + '-' + month + '-' + day;
    const listItems = document.querySelectorAll("li");

    // Map sports to leagues
    const sportToLeagueMap = {
        NFL: "football/nfl",
        Basketball: "basketball/nba",
        Baseball: "baseball/mlb",
        Hockey: "hockey/nhl",
        EPL: "soccer/eng.1",
        LaLiga : "soccer/esp.1",
        Bundesliga : "soccer/ger.1",
        "Serie A" : "soccer/ita.1",
    };

    listItems.forEach((item) => {
        item.addEventListener("click", () => {
            loadSport(item.textContent);
        });
    });

    function clearPage() {
        sport.innerHTML = "";
        gameList.innerHTML = "";
    }

    async function loadSport(sportName) {
        clearPage();
        sport.innerHTML = sportName;

        try {
            let leagueName = sportToLeagueMap[sportName];
            if (!leagueName) {
                console.error("Sport not recognized:", sportName);
                return;
            }

            const options = {method: 'GET'};

            //Get games
            fetch(`http://site.api.espn.com/apis/site/v2/sports/${leagueName}/scoreboard`, options)
                .then(response =>
                    response.json())
                .then(response => {
                    console.log(response)
                    response.events.forEach(event => {
                        const dateString = event.date;
                        const [gameYear, gameMonth, dayWithTime] = dateString.split('-');
                        const gameDay = dayWithTime.split('T')[0];

                        console.log(`${gameYear}-${gameMonth}-${gameDay}`);
                        if((gameYear + '-' + gameMonth + '-' + gameDay ) !== today.innerHTML){
                            today.innerHTML = gameYear + '-' + gameMonth + '-' + (gameDay - 1);
                        }else{
                            today.innerHTML = gameYear + '-' + gameMonth + '-' + gameDay;
                        }

                        const li = document.createElement('li');
                        li.innerHTML = event.name;
                        gameList.appendChild(li);
                    })
                })
                .catch(err =>
                    console.error(err));

            //Get Standings
            ///TODO: Make a web scrapper to get hte data from the url
            fetch(`https://site.web.api.espn.com/apis/site/v2/sports/${leagueName}/standings?season=${year}`, options)
                .then(response =>
                    response.json())
                .then(response => {
                    console.log(response)
                })
                .catch(err =>
                    console.error(err));
            //Get News
            fetch(`https://site.web.api.espn.com/apis/site/v2/sports/${leagueName}/news`, options)
                .then(response =>
                    response.json())
                .then(response => {
                    response.articles.forEach(article => {
                        console.log(article)
                    })
                })
                .catch(err =>
                    console.error(err));
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    }
    signupBtn.addEventListener('click', () => {
        window.location.href = "/scoreboard/account"
    })
};
