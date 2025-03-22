document.addEventListener("DOMContentLoaded", () => {
    let characterInfo = {};
    let characterData = [];
    let characterID ;
  
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
          displayAllCharacters();
        })
        .catch(error => console.error('Fetch error:', error));
    }
  
    // Display all characters
    function displayAllCharacters() {
      let charnames = document.getElementById("character-bar");
      //charnames.innerHTML = ''; // Clear existing characters before rendering new ones
  
      for (const animal of characterData) {
        let charname = document.createElement("span");
        charname.id = animal.id;
        charname.innerHTML = animal.name;
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
        // .then(updatedCharacter => {
        //   console.log('Updated character:', updatedCharacter);
        //   alert(`Votes successfully added ${voteInput} votes to ${updatedCharacter.name}`);
        // })
        .catch(error => console.error('Error updating votes:', error));
    }


    // Event listener for the vote form submission
    document.querySelector("#votes-form").addEventListener("submit", (event) => {
      event.preventDefault();
      addvote();
    });


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
    }
   
//listen for vote reset
document.querySelector("#reset-btn").addEventListener("click",()=>{
    event.preventDefault();
    resetVote();
})

    // Initialize by fetching data
    function main() {
      getData();
    }
    main();
  });
  