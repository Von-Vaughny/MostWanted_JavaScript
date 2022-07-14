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
    let displayOption = promptFor(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`,
        chars
    ).toLowerCase();
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
            traitCount = [];
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
    let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
    let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
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
    let reFilter = parseInt(promptFor(`Search Results (Traits: ${traitCount.join(", ")})\n\n${results}Enter 0 to search an additional trait.`, nums)); 
    switch (true) {
        case (reFilter <= pCount && reFilter >= 0):
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
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    const personalInfo = ["First Name", "Last Name", "Gender", "DOB", "Height", "Weight", "Eye Color", "Occupation"]; // Refactor?
    const personalInfoKeys = Object.values(person).slice(1,9);
    let personInfo = "";
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
    return /^[a-z]+$/.test(input.toLowerCase());
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * This helper function checks to see if the value passed into input 
 * can be converted into an integer.
 * @param {String} input        A string that will be checked to see if it can be convreted into an integer.
 * @returns {Boolean}           The result of our condition evaluation.
 */
function nums(input){
    return Number.isInteger(Number(input));
}
// End of nums()

/**
 * This helper function checks to see if the value passed into input is a valid date.
 * @param {String} input        A string that will be checked to see if it is a valid date.
 * @returns {Boolean}           The result of ourr condition evaluation.
 */
function dates(input) {
    // Is moment.js a better option for real-world operation?
    let params = input.split(/[/]/);
    let mm = Number(params[0]);
    let dd = Number(params[1]);
    let yyyy = Number(params[2]);
    let date = new Date(yyyy,mm-1,dd,0,0,0,0);
    return mm === date.getMonth()+1 && dd === date.getDate() && yyyy === date.getFullYear();
}
// End of dates()

/**
 * This helper function will be useful for STRINGIFYING a person-objects parents 
 * and spouse properties and determing siblings in order to easily send the 
 * information to the user in the form of an alert().
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
 * This helper function will be useful for STRINGIFYING a person-objects 
 * parents property in order to easily send the information to the user 
 * in the form of an alert().
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
 * This helper function will be useful for STRINGIFYING a person-objects 
 * spouse property in order to easily send the information to the user 
 * in the form of an alert().
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
 * This helper function will be useful for determining and STRINGIFYING a 
 * person-objects siblings in order to easily send the information to the 
 * user in the form of an alert().
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
 * This helper function will be useful for determining and STRINGIFYING a 
 * person-objects descendants in order to easily send the information to 
 * the user in the form of an alert().
 * @param {Object} person       A singular object.
 * @param {Array} people        A collection of the person objects.
 * @returns {String}            A string of the person's descendants (returns 'None' if none are determined).
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
    if (iCount === tempDescendants.length) { // Better as a switch?
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
 * This function is used when searching the people collection by a 
 * person-object's property/properties.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
function searchByTraits(people){
    let trait = promptFor("Do you want to search by 'id', 'firstname', 'lastname', 'gender', 'dob', 'height', 'weight', 'eyecolor', "
        + "'occupation', 'parents', or 'currentspouse'?\nType the option you want or type 'quit'.", chars).toLowerCase();
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
                traitCount.push("lastname")
                filteredPeople = searchByLastName(filteredPeople);
            } else {
                alert("Trait 'last name' has already been searched.")
            }
            break;  
        case "gender":
            // Returns more than one person.
            if (!traitCount.includes("gender")) {
                traitCount.push("gender");
                filteredPeople = searchByGender(filteredPeople);
            } else {
                alert("Trait 'gender' has already been searched.");
            }
            break;
        case "dob":
            // Returns one person as dobs are all unique.
            filteredPeople = searchByDob(filteredPeople);
            break;
        case "height":
            // May return more than one person as heights are not all unique.
            if (!traitCount.includes("height")) {
                traitCount.push("height");
                filteredPeople = searchByHeight(filteredPeople);
            } else {
                alert("Trait 'height' has already been searched.");
            }
            break;
        case "weight":
            // May return more than one person as weights are not all unique.
            if (!traitCount.includes("weight")){
                traitCount.push("weight");
                filteredPeople = searchByWeight(filteredPeople);
            } else {
                alert("Trait 'weight' has already been searched.");
            }
            break;
        case "eyecolor":
            // May return more than one person as eye colors are not all unique.
            if (!traitCount.includes("eyecolor")) {
                traitCount.push("eyecolor");
                filteredPeople = searchByEyeColor(filteredPeople);
            } else {
                alert("Trait 'eye color' has already been search.");
            }
            break;
        case "occupation":
            // May return more than one person as occupations are not all unique.
            if (!traitCount.includes("occupation")) {
                traitCount.push("occupation");
                filteredPeople = searchByOccupation(filteredPeople);
            } else {
                alert("Trait 'occupation' has already been searched.")
            }
            break;
        case "parents":
            // May return more than one person as a parent may have more than one child.
            if (!traitCount.includes("parents")) {
                traitCount.push("parents");
                filteredPeople = searchByParent(filteredPeople);
            } else {
                alert("Trait 'parents' has already been searched.")
            }
            break;
        case "currentspouse":
            // May returns more than one person as multiple people have no spouse.
            if (!traitCount.includes("currentspouse")) {
                traitCount.push("currentspouse");
                filteredPeople = searchByCurrentSpouse(filteredPeople);
            } else {
                alert("Trait 'currentspouse' has already been searched");
            }
            break;
        case "quit":
            traitCount = [];
            return;
        default:
            // Prompt user again. Instance of recursion.
            return searchByTraits(filteredPeople);   
    }

    // A check to verify a person exists in the filtered list.
    if (!filteredPeople[0]) {
        alert("Could not find a person matching search trait(s).");
        return;   
    } else if (traitCount.length <= 5) {
        let reFilter = displayPeople(filteredPeople);
        let arr = [] // rename
        switch (true) {
            case (reFilter > 0):
                arr.push(filteredPeople[reFilter-1]);
                return arr;  
            default:
                return searchByTraits(filteredPeople);
        }
    }
}
// End of searchByTraits()

/**
 * This function is used when searching the people collection by the ID property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.           
 */
function searchById(people) {
    let selectedId = parseInt(promptFor("Enter ID to search:", nums));
    if (selectedId > 100000000 && selectedId < 1000000000) {    
        let filteredResult = people.filter(function(person){
            return person.id === selectedId;
        });
        return filteredResult;
    } else {
        alert("Person ID is 9 numbers long.");
        searchById(people);
    }
}
// End of searchById()

/**
 * This funtion is used when searching the people collection by the firstName
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
function searchByFirstName(people) {
    let selectedFirstName = promptFor("Enter first name to search:", chars).toLowerCase();
    let filteredResult = people.filter(function(person){
        return person.firstName.toLowerCase() === selectedFirstName;
    });
    return filteredResult;
}
// End of searchByFirstName()

/**
 * This function is used when searching the people collection by the lastName
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
function searchByLastName(people) {
    let selectedLastName = promptFor("Enter last name to search:", chars).toLowerCase();
    let filteredResult = people.filter(function(person){
        return person.lastName.toLowerCase() === selectedLastName;
    });
    return filteredResult;
}
// End of searchByLastName()

/**
 * This function is used when searching the people collection by the gender
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
function searchByGender(people) {
    let selectedGender = promptFor("Enter gender to search:", chars).toLowerCase();
    let genders = ["male", "female", "nonbinary"]
    if (genders.includes(selectedGender)){
        let filteredResult = people.filter(function(person){
            return person.gender === selectedGender;
        });
        return filteredResult;
    } else {
        alert(`Please enter one of the following genders: ${genders.join(", ")}`);
        searchByGender(people);
    }
}
// End of searchByGender()

/**
 * This function is used when searching the people collection by the dob
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByDob(people) {
    let selectedDob = promptFor("Enter date of birth (format 02/21/1999) to search:", dates);  
    let filteredResult = people.filter(function(person){
        return person.dob === selectedDob;
    });
    return filteredResult;
}
// End of searchByDob()

/**
 * This function is used when searching the people collection by the height
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByHeight(people) {
    let selectedHeight = parseInt(promptFor("Enter height (inches) to search:", nums));
    if (selectedHeight > 0 && selectedHeight < 100) {
        let filteredResult = people.filter(function(person){
            return person.height === selectedHeight;
        });
        return filteredResult;
    } else {
        alert("Please enter height between 0 and 100 inches.");
        return searchByHeight(people);
    }

}
// End of searchByHeight()

/**
 * This function is used when searching the people collection by the weight
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByWeight(people) {
    let selectedWeight = parseInt(promptFor("Enter weight (lbs) to search:", nums)); 
    if (selectedWeight > 0 && selectedWeight < 500) {
        let filteredResult = people.filter(function(person){
            return person.weight === selectedWeight;
            });
        return filteredResult; 
    } else {
        alert("Please enter a weight between 0 and 500 lbs.");
        return searchByWeight(people); 
    }
}
// End of searchByWeight()

/**
 * This function is used when searching the people collection by the eyeColor
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByEyeColor(people) {
    let selectedEyeColor = promptFor("Enter eye color to search:", chars).toLowerCase();
    let eyeColors = ["brown", "hazel", "blue", "green", "gray", "amber"];
    if (eyeColors.includes(selectedEyeColor)){ 
        let filteredResult = people.filter(function(person) {
            return person.eyeColor === selectedEyeColor;
        });
        return filteredResult;
    } else {
        alert(`Please enter one of the following natural eye colors: ${eyeColors.join(", ")}`);
        return searchByEyeColor(people);
    }
}
// End of searchByEyeColor()

/**
 * This function is used when searching the people collection by the 
 * occupation property.
 * @param {Array} people        A collection of the person objects. 
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByOccupation(people) {
    let selectedOccupation = promptFor("Enter occupation to search:", chars).toLowerCase();
    let filteredResult = people.filter(function(person){
        return person.occupation === selectedOccupation;
    });
    return filteredResult;
}
// End of searchByOccupation()

/**
 * This function is used when searching the people collection by the parents
 * property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the fiiltered person objects.
 */
 function searchByParent(people) {
    let selectedParent = parseInt(promptFor("Enter parent id (or 0 for no parent) to search:", nums));  
    let filteredResult;
    if ((selectedParent > 100000000 && selectedParent < 1000000000) || selectedParent == 0) {
        if (selectedParent === 0) {
            filteredResult = people.filter(function(person){
                return person.parents.length === 0;
            })
        } else {
            filteredResult = people.filter(function(person){
                return person.parents.includes(selectedParent);
            });
        }
        return filteredResult;
    } else {
        alert("Parent ID is 9 numbers long.");
        return searchByParent(people);
    }
}
// End of searchByParent()

/**
 * This function is used when searching the people collection by the 
 * currentSpouse property.
 * @param {Array} people        A collection of the person objects.
 * @returns {Array}             A collection of the filtered person objects.
 */
 function searchByCurrentSpouse(people) {
    let selectedCurrentSpouse = parseInt(promptFor("Enter current spouse id (or 0 for no current spouse) to search:", nums));
    let filteredResult;
    if ((selectedCurrentSpouse > 100000000 && selectedCurrentSpouse < 1000000000) || selectedCurrentSpouse === 0) {
        if (selectedCurrentSpouse === 0) {
            filteredResult = people.filter(function(person){
                return person.currentSpouse === null;
            });
        } else {
            filteredResult = people.filter(function(person){
                return person.currentSpouse === selectedCurrentSpouse;
            }); 
        }
        return filteredResult;
    } else {
        alert("Current Spouse ID is 9 numbers long.");
        return searchByCurrentSpouse(people);
    }    
}
// End of searchByCurrentSpouse()