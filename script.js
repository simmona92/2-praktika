let parent = document.getElementById("parent");

const createCard = (title, text) => {
    let div = document.createElement("div");
    div.classList.add("card-body");
    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    let p = document.createElement("p");
    p.classList.add("card-text");
    let a = document.createElement("a");
    a.classList.add("btn", "btn-primary");
    h5.innerHTML = title;
    p.innerHTML = text;
    a.innerHTML = "Go somewhere";
    div.append(h5, p, a);
    let divParent = document.createElement("div");
    divParent.classList.add("card");
    let img = document.createElement("img");
    img.setAttribute("src", "https://th.bing.com/th/id/R.30ab5c5f19121a386ca1b5295af759b8?rik=RO6UnwW5ixbUtQ&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f25527-nature-hill-Sun.jpg&ehk=hgyB105muadFNSDQjRHEUqVXGmRdDOxaNbGkgs8tXbU%3d&risl=&pid=ImgRaw&r=0");
    img.classList.add("card-img-top");
    divParent.append(img, div);
    return divParent;
};

const allPeopleCards = (card) => {
    for (let i = 0; i < card.length; i++) {
        const { gender, height, mass, birth_year } = card[i];
        let textLine = "Gender: " + gender + ", " + "Height: " + height + ", " + "Mass: " + mass + ", " + "Birth year: " + birth_year;
        parent.append(createCard(card[i].name, textLine));
    };
};

const personById = (person) => {
    const { gender, height, mass, birth_year } = person;
    let textLine = "Gender: " + gender + ", " + "Height: " + height + ", " + "Mass: " + mass + ", " + "Birth year: " + birth_year;
    parent.append(createCard(person.name, textLine));
};

async function getAllPeople() {
    const requestURL = 'https://swapi.dev/api/people/?format=json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const data = await response.json();
    allPeopleCards(data.results);
};

async function getPersonById(id) {
    const requestURL = 'https://swapi.dev/api/people/' + id + '/?format=json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const data = await response.json();
    personById(data);
};
let select = document.getElementById("select");
select.addEventListener("change", (e) => {
    parent.innerHTML = "";
    if (select.value == 0) {
        getAllPeople();
    } else {
        getPersonById(select.value);
    };
})

