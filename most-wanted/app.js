/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match).
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    let results = "";
    let pCount = 0; // Refactor? 
    for (let i = 0; i < people.length; i++){
        results += `Enter ${i+1} to select ${people[i].firstName} ${people[i].lastName}\n`
        pCount++; // Refactor?
    }
    let reFilter = parseInt(prompt(`Search Results\n\n${results}Enter 0 to search an additional trait.`)); 
    switch (true) {
        case (reFilter <= pCount && reFilter >= 0):  // Acts a form of validation. Can do another function
            return reFilter;
        default:
            return displayPeople(people);
    }
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 * @returns {String}            A string of the person's personal information.
 */
function displayPerson(person) {
    /**
     * Loop Explaination
     * let personInfo = `First Name: ${person.firstName}\n`;
     * personInfo += `Last Name: ${person.lastName}\n`;
     * personInfo += `Gender: ${person.gender}\n`;
     * personInfo += `DOB: ${person.dob}\n`;
     * personInfo += `Height: ${person.height}\n`;
     * personInfo += `Weight: ${person.weight}\n`;
     * personInfo += `Eye Color: ${person.eyeColor}\n`;
     * personInfo += `Occupation: ${person.occupation}`;
     */
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    const personalInfo = ["First Name", "Last Name", "Gender", "DOB", "Height", "Weight", "Eye Color", "Occupation"];
    const personalInfoKeys = Object.values(person).slice(1,9);
    let personInfo = "";
    for (let i = 0; i < personalInfo.length; i++){
        personInfo += `${personalInfo[i]}: ${[personalInfoKeys[i]]}\n`;
    }
    return `${person.firstName} ${person.lastName}'s Information\n\n${personInfo}`;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function chars(input) {
    // Need to add info, family, descendants. FIX - for property values or add one for people <---- or.... do for loop in a for loop.
    const personProperties = ["id", "firstName", "lastName", "gender", "dob", "height", "weight", "eyeColor", "occupation", "parents", "currentSpouse"]; 
    let properties = personProperties.map(function(property){
        return property.toLowerCase();
    });
    //return properties.includes(input.toLowerCase());
    return input.toLowerCase();
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function nums(input){
    return !isNaN(input) && Number.isInteger(Number(input));
}

/**
 * This helper function will be useful for STRINGIFYING a person-objects parents and spouse properties and 
 * determing siblings in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of the person's family (returns 'None' for empty properties).
 */
function findPersonFamily(person, people){
    let personName = `${person.firstName} ${person.lastName}'s Family\n\n`;
    let personParents = `Parent(s):${searchForParents(person, people)}\n`;
    let personSpouse = `Spouse: ${searchForSpouse(person, people)}\n`;
    let personSiblings = `Sibling(s):${searchForSiblings(person, people)}`;
    return personName + personParents + personSpouse + personSiblings;
}
// End findPersonFamily()

/**
 * This helper function will be useful for STRINGIFYING a person-objects parents property in order to 
 * easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of the person's parents (returns 'None' for empty property).
 */
function searchForParents(person, people){
    let personParents = ' None';
    if (person.parents.length > 0){
        personParents = people.filter(function(el){
            return person.parents.includes(el.id);
        }).map(function(el){
            return ` ${el.firstName} ${el.lastName}`;
        });
    }
    return personParents;
}
// End of searchForParents()

/**
 * This helper function will be useful for STRINGIFYING a person-objects spouse property in order to
 * easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of the person's spouse (returns 'None' for empty property).
 */
function searchForSpouse(person, people){
    let personSpouse = 'None';
    if (person.currentSpouse){
        personSpouse = people.filter(function (el){
            return el.id === person.currentSpouse;
        }).map(function(el){
            return `${el.firstName} ${el.lastName}`;
        });
    }
    return personSpouse;
}
// End of serachForSpouse()

/**
 * This helper function will be useful for determining and STRINGIFYING a person-objects siblings in 
 * order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular objecct.
 * @param {Array} people        A collection of the person objects.
 * @returns {String}            A string of the person's siblings (returns 'None' if none are determined).
 */
function searchForSiblings(person, people){
    let personSiblings = ' None';
    if (person.parents.length > 0){
        personSiblings = people.filter(function(el){
            return (el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1])) && el.id !== person.id;
        }).map(function(el){
            return ` ${el.firstName} ${el.lastName}`;
        });
    }
    return personSiblings
}
// End of searchForSiblings()

/**
 * This helper function will be useful for determining and STRINGIFYING a person-objects descendants in
 * order to easily send the information to the user in the form of an alert().
 * @param {Object} person     A singular object.
 * @param {Array} people      A collection of the person objects.
 * @returns {String}          A string of the person's descendants (returns 'None' if none are determined).
 */
let iCount = -1;
let tempDescendants = [];
function findPersonDescendants(person, people){
    let descendants = people.filter(function(el){
        return el.parents.includes(person.id);
    });
    /**
     * Ternary Operator Explaination
     * if (tempDescendants.length){
     *    tempDescendants.push(descendants);
     * } else {
     *    tempDescendants = descendants;
     * }
     */
    if (descendants.length) {
        tempDescendants.length ? tempDescendants.push(descendants) : tempDescendants = descendants;
    }
    iCount++;
    if (iCount == tempDescendants.length) { // Switch to case?
        let personDescendants = [];
        // .flat() seems to only like being placed in format variable1 = variable2.flat(), not variable = variable.flat().
        tempDescendants.length ? personDescendants = tempDescendants.flat().map(function(el){return ` ${el.firstName} ${el.lastName}`;}) : personDescendants = "None";
        return `Descendants: ${personDescendants}`;
    } else {
        let temporaryDescendants = tempDescendants.flat();
        return findPersonDescendants(temporaryDescendants[iCount], people); // Does not like iCount++   
    }
}
// End of findPersonDescendants();

let traitCount = []; // Add into functionality to keep track of trait count.
/**
 * 
 * @param {Array} people 
 * @returns {}
 */
function searchByTraits(people){
    let trait = promptFor("Do you want to search by 'id', 'firstname', 'lastname', 'gender', 'dob', 'height', 'weight', 'eyecolor', "
        + "'occupation', 'parents', or 'currentspouse'?\nType the option you want or type 'restart' or quit'.", chars).toLowerCase();
    let filteredPeople = people;
    // Routes search on the user's input.
    switch (trait) {
        case "id": 
            // Returns one person as ids are all unique.
            filteredPeople = searchById(filteredPeople);
            break;
        case "firstname":
            // Returns one person as first names are all unique.
            filteredPeople = searchByFirstName(filteredPeople);
            break;
        case "lastname":
            // May return more than one person as last names are not all unique.
            if (!traitCount.includes("lastname")) {
                traitCount.push("lastname");
                filteredPeople = searchByLastName(filteredPeople);
            } else {
                alert("Trait 'last name' has already been used.")
            }
            break;  
        case "gender":
            // Returns more than one person.
            filteredPeople = searchByGender(filteredPeople);
            break;
        case "dob":
            // Returns one person as dobs are all unique.
            filteredPeople = searchByDob(filteredPeople);
            break;
        case "height":
            // May return more than one person as heights are not all unique.
            filteredPeople = searchByHeight(filteredPeople);
            break;
        case "weight":
            // May return more than one person as weights are not all unique.
            filteredPeople = searchByWeight(filteredPeople);
            break;
        case "eyecolor":
            // May return more than one person as eye colors are not all unique.
            filteredPeople = searchByEyeColor(filteredPeople);
            break;
        case "occupation":
            // May return more than one person as occupations are not all unique.
            filteredPeople = searchByOccupation(filteredPeople);
            break;
        case "parents":
            // May return more than one person as a parent may have more than one child.
            filteredPeople = searchByParent(filteredPeople);
            break;
        case "currentspouse":
            // Returns one person as current spouses are all unique.
            filteredPeople = searchByCurrentSpouse(filteredPeople);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
        case "quit":
            return;
        default:
            // Prompt user again. Instance of recursion.
            return searchByTraits(filteredPeople);   
    }

    // A check to verify a person exists in the filtered list.
    if (!filteredPeople[0]) {
        alert("Could not find a person matching search trait(s).");
        // Restart app() from the very beginning
        app(people);   
    } else if (traitCount.length <= 5) {
        let reFilter = parseInt(displayPeople(filteredPeople)); // Can add another helper function num
        let arr = [] // rename
        switch (true) {
            case reFilter > 0:
                arr.push(filteredPeople[reFilter-1]);
                return arr;
            default:
                return searchByTraits(filteredPeople);
        }
    }
}
// End of searchByTraits()

/**
 * 
 * @param {Array} people 
 * @returns {}            
 */
function searchById(people) {
    let selectedId = promptFor("Enter ID to search:", chars); // Change to function nums
    let filteredResult = people.filter(function(person){
        return person.id == selectedId;
    });
    return filteredResult;
}
// End of searchById()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
function searchByFirstName(people) {
    let selectedFirstName = promptFor("Enter first name to search:", chars); //
    let filteredResult = people.filter(function(person){
        return person.firstName == selectedFirstName;
    });
    return filteredResult;
}
// End of searchByFirstName()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
function searchByLastName(people) {
    let selectedLastName = promptFor("Enter last name to search:", chars);
    let filteredResult = people.filter(function(person){
        return person.lastName == selectedLastName;
    });
    return filteredResult;
}
// End of searchByLastName()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
function searchByGender(people) {
    let selectedGender = promptFor("Enter gender to search:", chars);
    let filteredResult = people.filter(function(person){
        return person.gender == selectedGender;
    });
    return filteredResult;
}
// End of searchByGender()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByDob(people) {
    let selectedDob = prompt("Enter date of birth (format 02/21/1999) to search:"); //* Validate using another helper function: nums  
    let filteredResult = people.filter(function(person){
        return person.dob == selectedDob;
    });
    return filteredResult;
}
// End of searchByDob()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByHeight(people) {
    let selectedHeight = prompt("Enter height (inches) to search:"); //* Validate using another helper function: nums
    let filteredResult = people.filter(function(person){
        return person.height == selectedHeight;
    });
    return filteredResult;
}
// End of searchByHeight()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByWeight(people) {
    let selectedWeight = parseInt(promptFor("Enter weight (lbs) to search:", nums)); //* Validate using another helper function: nums
    if (selectedWeight > 0) {
        let filteredResult = people.filter(function(person){
            return person.weight == selectedWeight;
            });
        return filteredResult; 
    } else {
        return searchByWeight(people); 
    }
}
// End of searchByWeight()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByEyeColor(people) {
    let selectedEyeColor = promptFor("Enter eye color to search:", chars);
    let filteredResult = people.filter(function(person){
        return person.eyeColor == selectedEyeColor;
    });
    return filteredResult;
}
// End of searchByEyeColor()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByOccupation(people) {
    let selectedOccupation = promptFor("Enter occupation to search:", chars);
    let filteredResult = people.filter(function(person){
        return person.occupation == selectedOccupation;
    });
    return filteredResult;
}
// End of searchByOccupation()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByParent(people) {
    let selectedParent = prompt("Enter parent id to search:"); //* Validate using another helper function: numberForm to parseInt
    let filteredResult = people.filter(function(person){
        return person.parents.includes(parseInt(selectedParent));
    });
    return filteredResult;
}
// End of searchByParent()

/**
 * 
 * @param {Array} people 
 * @returns 
 */
 function searchByCurrentSpouse(people) {
    let selectedCurrentSpouse = prompt("Enter current spouse id to search:"); //* Validate using another helper function: numberForm to parseInt
    let filteredResult = people.filter(function(person){
        return person.currentSpouse == parseInt(selectedCurrentSpouse);
    });
    return filteredResult;
}
// End of searchByCurrentSpouse()