document.addEventListener("DOMContentLoaded",()=>{
let characterInfo;
let characterData=[];
function getData(){
fetch('http://localhost:3000/characters')
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log("okay!!")
    //console.log(response.json());
    return response.json();  // Parse JSON data
  }
)
.then(data=>{
    characterData=data;
    displayAllCharacters();
    //console.log(characterData)
    // console.log(data[0])
})
}

function displayAllCharacters(){
    let charnames=document.getElementById("character-bar")
    //console.log(characterData)
    for (animal of characterData){
        console.log(animal.name+"(Displayall)")
        charname=document.createElement("span");
        charname.id=animal.id
        charname.innerHTML=animal.name
               charname.addEventListener("click",()=>{
                let characterID=event.target.id;
        getSingle(characterID)
      })

        charnames.appendChild(charname)
    }
}


function getSingle(id){
fetch(`http://localhost:3000/characters/${id}`)
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log("Fetching singe character info....")
    //console.log(response.json());
    return response.json();  // Parse JSON data
  }
)
.then(data=>{
    document.getElementById("name").innerHTML=data.name
    document.getElementById("image").src=data.image
    document.getElementById("image").alt=data.name
    document.getElementById("vote-count").innerHTML=data.votes

    console.log(data)
})


function displayCharacterDetails(character) {
    const detailsDiv = document.getElementById("character-details");
    detailsDiv.innerHTML = `
      <h2>${character.name}</h2>
      <p>ID: ${character.id}</p>
      <p>Other details...</p>  <!-- Add more details as needed -->
    `;
  }
}




function main(){
    getData();
}


main();

});