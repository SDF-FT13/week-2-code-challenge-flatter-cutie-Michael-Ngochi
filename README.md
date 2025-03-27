# Flatacuties

**Flatacuties** is a simple interactive web app that displays cartoon animal characters from a local JSON server. Users can view character details, vote for their favorites, reset votes, and even add new characters.

## Features

- View a list of characters with their vote counts
- Click on a character to see detailed info and image
- Submit votes for any character
- Reset a character’s votes to zero
- Add a new character with a name and image

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- JSON Server (local backend)

## Setup Instructions

### 1. Clone or Download the Project

```bash
git clone https://github.com/yourusername/flatacuties.git
cd flatacuties
```

### 2. Install JSON Server

Install JSON Server globally:

```bash
npm install -g json-server
```

### 3. Create a `db.json` File

In the root of the project directory, create a `db.json` file with the following sample data:

```json
{
  "characters": [
    {
      "id": 1,
      "name": "Cutie Cat",
      "image": "assets/cat.png",
      "votes": 10
    },
    {
      "id": 2,
      "name": "Funny Fox",
      "image": "assets/fox.png",
      "votes": 7
    }
  ]
}
```

### 4. Start the JSON Server

```bash
json-server --watch db.json
```

This will start the server at:

```
http://localhost:3000
```

### 5. Open the Application

Open the `index.html` file in your browser to start using the app.

## Author

Developed by **Michael Ngochi**

## Notes

- The app requires a local JSON server running at `http://localhost:3000`
