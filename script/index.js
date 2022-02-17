const images = [
    "/images/Luke-Skywalker.jpeg", 
    "/images/C-3PO.jpeg", 
    "/images/R2-D2.jpeg", 
    "/images/Darth-vader.jpeg", 
    "/images/Leia-Organa.png", 
    "/images/Owen-Lars.jpeg", 
    "/images/Beru-Whitesun-Lars.jpeg", 
    "/images/R5-D4.jpeg", 
    "/images/Biggs-Darklighter.jpeg", 
    "/images/Obi-Wan-Kenobi.jpeg",
    "/images/multi.gif"
];


function main() {

    fetch("https://swapi.dev/api/people")
    .then (res => {
        if (!res.ok) {
            throw Error ("Error fetching data...")
        } 
        return res.json()
    })
    .then (data => {
        const html = data.results
        .map((people, index) => {
            return ` 
            <div id=${index} class="container">
                <div class="card">
                    <img class="card-img" src=${images[index]} alt="${people.name}">
                    <div class="card-content">
                        <button class="open-btn" data-modal-target=${index}>${people.name}</button>
                    </div>
                </div> 
            </div>
            <div class="modal-container" id=${index}>
                <div class="modal">
                    <img src=${images[index]} alt="Starwars Icon">
                    <h1>${people.name}</h1>
                    <ul>
                        <li>Gender: <span style="color:red">${people.gender  === "n/a" ? "humanoid" : people.gender}</span></li>
                        <li>Height: <span style="color:red">${people.height}</span></li>
                    </ul>
                    <button data-close-button class="close-btn">Close</button>
                </div>
            </div>
            `;
        }).join('');
        
        document.querySelector('.grid').innerHTML = html;

        const open = document.querySelectorAll("[data-modal-target]")
        const close = document.querySelectorAll(".close-btn")
        const modal_container = document.querySelectorAll(".modal-container")


        open.forEach((button, index) => {
            button.addEventListener("click", () => {
            modal_container[index].classList.add("show");
            });
        })

        close.forEach((button, index) => {
            button.addEventListener("click", () => {
            modal_container[index].classList.remove("show");
            });
        })
       
    })
    .catch (err => {
        console.log(err)
    });

}


main();

