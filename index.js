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


                    // let img = new Image;
                
                    let image = response.data.avatar_url;
                    const email = response.data.email;
                    
                    // createImg(json.response.avatar_url);


                    let allAnswers = [
                        "\n", "[![Generic badge](https://img.shields.io/badge/<SUBJECT>-<STATUS>-<COLOR>.svg)](https://shields.io/)", "\n",
                        "\n", "## Title: ", "\n", projectTitle, "\n",
                        "\n", "## Description: ", "\n", projectDescription, "\n",
                        "\n", "## Table of Conents ", "\n", tableOfContents, "\n",
                        "\n", "## Installation: ", "\n", installation, "\n",
                        "\n", "## Usage: ", "\n", instruction, "\n",
                        "\n", "## License:  ", "\n", licenseName, "\n",
                        "\n", "## Contributors: ", "\n", contributors, "\n",
                        "\n", "## User Email: ", "\n", email, "\n",
                        "\n", "![userImage]("+image+")"
                    ];
                    const finalAnswers = allAnswers.toString();
                    var answersNoCommas = finalAnswers.replace(/,/g, "");


                    console.log(answersNoCommas);


                    writeToFile(answersNoCommas);
                });


        })
        .catch(error => {
            console.log("there's an error somewhere dumbass")
        })
}

//         const { makeBadge, ValidationError } = require('badge-maker')
function writeToFile(data) {
    //pass in answers from questions
    // //create an md file
    fs.writeFile('readme.md', data, function (err) {
        if (err) throw err;
        console.log('ReadMe Created!');
    });
}
// const format = {
//   label: 'build',
//   message: 'passed',
//   color: 'green',
// }

// const svg = makeBadge(format)
// console.log(svg) // <svg...

// try {
//   makeBadge({})
// } catch (e) {
//   console.log(e) // ValidationError: Field `message` is required
// }

// };
main();

// let queryURL = ""

// $.ajax({
//     url: queryURL,
//     method: "GET"})
//   .then(function(response) {
//     console.log(response);
//   });



// let anything = 'hello Caroline';
// ENDpoint
// function init(anything) {
//     console.log(anything)
//     return anything;
//     //how am I incorporating this function if I'm writing above 
// }

// init();
