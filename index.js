import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://we-are-the-champions-d2ff6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")
let textareaEl = document.getElementById("textarea-el")
let publishBtn = document.getElementById("publish-btn")
let endorsementLists = document.getElementById("endorsment-lists")

// this function pushes the info typed in into the database and logs to console
publishBtn.addEventListener("click", function() {
    let inputValue = textareaEl.value
    push(endorsementsInDB, inputValue)
    clearEndorsements()
    console.log(`${inputValue} added to database`)
})

// This function updates the endorsement list displayed in the HTML based on values retrieved from the Firebase Realtime Database when changes occur.
onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsmentsArr = Object.entries(snapshot.val())
    clearEndorsementList()  
    for(let i = 0; i < endorsmentsArr.length; i++) {
        let currentEntry = endorsmentsArr[i]
        let currentEntryID = currentEntry[0]
        let currentEntryValue = currentEntry[1]
        newEndorsement(currentEntry)
   }
    } else {
        endorsementLists.innerHTML += 'Be the first to publish an endorsement!'
    }
   
})

// This function generates a new list item with specified text content and appends it to endorsementLists.
function newEndorsement(newInput) {
    let entryId = newInput[0]
    let entryText = newInput[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = entryText
    
    //// Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
    
    newEl.addEventListener("click", function() {
        let locationOfItemInDB = ref(database, `endorsements/${entryId}`)
        
        remove(locationOfItemInDB)
    })
    
    endorsementLists.append(newEl)
}

// resets the endorsemments
function clearEndorsements() {
    textareaEl.value = ""
}

function clearEndorsementList() {
    endorsementLists.innerHTML = ""
}