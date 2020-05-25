const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
function main() {
    console.log(`starting`);
    const questions = [
        {
            type: "input",
            message: "What is your Project Title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "What is in your table of contents?",
            name: "contents"
        },
        {
            type: "input",
            message: "Provide instructions for installation: ",
            name: "instructionInstall"
        },
        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instructionUse"
        },
        {
            type: "input",
            message: "Provide License name: ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "Please enter git hub user names of the contributor if any: ",
            name: "contributors"
        },
        {
            type: "input",
            message: "Please enter your GitHub user name: ",
            name: "user"
        }
    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            const projectTitle = answers.projectTitle;
            const projectDescription = answers.projectDescription;
            const tableOfContents = answers.contents;
            const installation = answers.instructionInstall;
            const instruction = answers.instructionUse;
            const licenseName = answers.licenseName;
            const contributors = answers.contributors;
            const userName = answers.user;

            axios.get('https://api.github.com/users/' + userName)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });

            // let img = new Image;
            // img.src = response.avatar_url;
            // const email = response.email;

            // createImg(json.response.avatar_url);

            let allAnswers = [
                "\n", "Title: ", "\n", projectTitle, "\n",
                "\n", "Description: ", "\n", projectDescription, "\n",
                "\n", "Table of Conents ", "\n", tableOfContents, "\n",
                "\n", "Installation: ", "\n", installation, "\n",
                "\n", "Usage: ", "\n", instruction, "\n",
                "\n", "License:  ", "\n", licenseName, "\n",
                "\n", "Contributors: ", "\n", contributors, "\n"
                // ![userImage](img.src, "image")
                // "\n", "User Email: ", "\n", email, "\n"
                // "\n", "User Image: ", "\n", img.src, "\n"
            ];
            const finalAnswers = allAnswers.toString();
            var answersNoCommas = finalAnswers.replace(/,/g, "");

            console.log(answersNoCommas);

            function writeToFile(fileName, data) {
                //pass in answers from questions
                // //create an md file
                fs.writeFile('readme.md', answersNoCommas, function (err) {
                    if (err) throw err;
                    console.log('ReadMe Created!');
                });
            }

         

            writeToFile();


        })
        .catch(error => {
            console.log("there's an error somewhere dumbass")
        })


};
main();

// let queryURL = ""

// $.ajax({
//     url: queryURL,
//     method: "GET"})
//   .then(function(response) {
//     console.log(response);
//   });




function init() {
    //how am I incorporating this function if I'm writing above 
}

init();
