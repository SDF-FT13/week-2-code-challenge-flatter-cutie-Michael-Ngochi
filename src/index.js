document.addEventListener("DOMContentLoaded", () => {
    let characterInfo = {};//individual character information
    let characterData = [];//all characters information
    let characterID ;// my current character id
  
    // Fetch all characters data
    function getData() {
      fetch('http://localhost:3000/characters')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse JSON data
        })
        .then(data => {
           characterData = data;
           characterData = [...characterData].sort((a, b) => b.votes - a.votes);
           //console.log(characterData);
          displayAllCharacters();
        })
        .catch(error => console.error('Fetch error:', error));
      
    }
  
    // Display all characters
    function displayAllCharacters() {
      let charnames = document.getElementById("character-bar");
      charnames.innerHTML = ''; // Clear existing characters before rendering new ones
      for (const animal of characterData) {
        let charname = document.createElement("span");
        charname.id = animal.id;
        charname.innerHTML = `${animal.name} <br><span class="vote-score">${animal.votes}</span>`;
        charnames.appendChild(charname);

        // Listen for click on character name
        charname.addEventListener("click", () => {
          characterID = animal.id;
          getSingle(characterID);
        });
      }
    }
  
    // Fetch a single character's data
    function getSingle(id) {
      fetch(`http://localhost:3000/characters/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse JSON data
        })
        .then(data => {
          characterInfo = data;
          document.getElementById("name").innerHTML = characterInfo.name;
          document.getElementById("image").src = characterInfo.image;
          document.getElementById("image").alt = characterInfo.name;
          document.getElementById("vote-count").innerHTML = characterInfo.votes;
        })
        .catch(error => console.error('Fetch error:', error));
    }
  
    // Add a vote to a character
    function addvote() {
      let voteInput = parseInt(document.getElementById("votes").value);
  
      if (isNaN(voteInput) || voteInput <= 0) {
        alert('Please enter a valid number of votes.');
        return;
      }
  
      // Update the votes in the local characterInfo
      characterInfo.votes += voteInput;
  
      // Update the vote count on the page
      document.getElementById("vote-count").innerHTML = characterInfo.votes;
  
      // Send the updated votes to the server
      fetch(`http://localhost:3000/characters/${characterID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          votes: characterInfo.votes
        })
      })
        .then(response => response.json())
        .then(updatedCharacter => {
        //   console.log('Updated character:', updatedCharacter);
        //   alert(`Votes successfully added ${voteInput} votes to ${updatedCharacter.name}`);
        document.getElementById("vote-count").innerHTML = updatedCharacter.votes;
        getData();
         })
        .catch(error => console.error('Error updating votes:', error));

      displayAllCharacters();

    }


    // Event listener for the vote form submission
    document.querySelector("#votes-form").addEventListener("submit", (event) => {
      event.preventDefault();
      addvote();
    });

//function for vote reset
    function resetVote(){
        fetch(`http://localhost:3000/characters/${characterID}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              votes: 0
            })
          })
          .then(updatedCharacter => {
            characterInfo.votes = 0;
            document.getElementById("vote-count").innerHTML = 0;
            document.getElementById("votes").value=null
            getData(); // ✅ Re-fetch and re-render character list
          })

    }

//listen for vote reset
document.querySelector("#reset-btn").addEventListener("click",()=>{
    event.preventDefault();
    resetVote();
    document.getElementById("vote-count").innerHTML = 0;
    getData();
    displayAllCharacters();
})

//listen for add new character click
document.querySelector("#character-form").addEventListener("submit",()=>{
event.preventDefault();
addNew();
})
//function for adding new character
function addNew(){
    newName=document.querySelector("#newName").value
    newImage=document.querySelector("#image-url").value
    let newCharacter={
        name:newName,
        image:newImage,
        votes:0
    }
    //alert(`added ${newName} with url\n ${newImage}`)
    fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCharacter)
      })
      .then(res => res.json())
  .then(created => {
    getData(); // ✅ Refresh list to show new character
  })

}

    // main function to run program
    function main() {
      getData();
    }
    main();
  });