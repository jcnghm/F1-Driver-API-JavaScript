// JavaScript for Racer API


const form = document.querySelector('#testDataForm')

form.addEventListener('submit', ( event ) => {
    event.preventDefault();

    let query_season = document.querySelector('#season');
    let query_round = document.querySelector('#round');
    let info = getData(query_season, query_round)
    load_data(info) 
})

// Get Data from API
const getData = async (query_season, query_round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${query_season.value}/${query_round.value}/driverStandings.json`)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
}


// Holding Dom Elements

const DOM_Elements = {
    racer_list: '.racer-list',
}

// Creating the Table on the HTML Doc

const create_list = ( position, name, points, nationality, car_number ) => {
    const html2 = 
    `<table class="table table-dark">
        <thead>
        <tr>
            <th scope="col">Position</th>
            <th scope="col">Name</th>
            <th scope="col">Points</th>
            <th scope="col">Nationality</th>
            <th scope="col">Vehicle Number</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>${position}</td>
            <td>${name}</td>
            <td>${points}</td>
            <td>${nationality}</td>
            <td>${car_number}</td>
        </tr>
        </tbody>
    </table>`
    document.querySelector(DOM_Elements.racer_list).insertAdjacentHTML('beforeend', html2)
    
}


// Function to Load Data and display HTML 

const load_data = async (variables) => {
    const racers = await variables;
    console.log(racers[0])
    racers.forEach( element => create_list(element.position, element.Driver.givenName + ' ' + element.Driver.familyName, element.points, element.Driver.nationality, element.Driver.permanentNumber))
}

// Function to Clear Data from HTML

const clear_data = () => {
    document.querySelector(DOM_Elements.racer_list).innerHTML = '';
}