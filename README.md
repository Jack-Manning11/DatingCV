# Dating CV
below is a devlog for the first DatingCV prototype

# Dependencies
- For the router system I am using wouter as I already know it works and is functional with Cargo's deployment service (npm i wouter)
- For styling I am utilizing Styled Components to be able to make clear declarations for individual styled components (npm i styled-components)

# Timeline

## June - Initial Setup
- Installed wouter to set up a base router system that is adaptable in case future pages need to be added 
- Installed styled components and laid the groundwork for base styling
- Initialized a new repository to keep track of all progress
- Finalized AWS Pipeline using a custom statemachine to batch process images stored in S3, writing out the detect faces back into S3 and concatonating all of the JSON data into a single file


## Current Stage:
- Output is temporarily a devtool showing off the data of the first 1000 images

## How to View:
- Clone this repository and install the necessary dependencies (npm i wouter styled-components)
- Initialize the app (npm run start)
- Navigate to the output page (localhost:3000/output)
- Here you should see a detailed look at the data and the breakdown of all of the attribute information
