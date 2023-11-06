
# TodoApp - MegaK Final Project

## TodoApp is a task manager written as a final project for the MegaK course. The application allows users to add, delete, edit, and mark tasks as completed.

Hey there! 👋 Welcome to TodoApp – my brainchild from the MegaK course! 🚀 It's not just your run-of-the-mill task manager; it's the culmination of a year's worth of learning and experimenting.

So, what's under the hood? Well, we've got a slick backend dancing to the tunes of Express.js, TypeScript, and Node.js – all in harmony to create those smooth REST APIs. And for the data groove, we're rocking a MySQL database, keeping things organized and snappy.

But wait, there's more! On the frontend, we're strumming the chords of React and TypeScript to create a user interface that's as intuitive as it gets. Adding tasks, deleting them, tweaking titles – it's all a breeze. Oh, and don't forget the sweet satisfaction of marking tasks as done – progress has never been so satisfying!

Ready to dive in? Let's make organizing your tasks a walk in the park. 🚀✨

Happy tasking!

## Watch how my App works! 🛸
![Working App video](https://github.com/GregorySVD/TodoApp/blob/main/TodoApp-gif.gif)

## Installation

Install my-project with npm and MySQL database:


1. Create mySQL Database:

* Open a MySQL terminal or command prompt window.
* Log in to the MySQL server.
* Run the following command to create the database:
```bash
  CREATE DATABASE todo;
```
*Run the following command to create the todos table:
```bash
  CREATE TABLE `todo`.`todos` (
    `id` VARCHAR(36) NOT NULL DEFAULT uuid() COLLATE 'utf8mb4_unicode_ci',
    `title` VARCHAR(150) NOT NULL COLLATE 'utf8mb4_unicode_ci',
    `date` DATETIME NOT NULL DEFAULT current_timestamp(),
    `isDone` TINYINT(1) NOT NULL DEFAULT '0',
    `description` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    PRIMARY KEY (`id`) USING BTREE
);
```

* Once the database and table have been created, you can start the frontend and backend applications as instructed further on. 

2. Clone the project to your local machine.
- Open a terminal or command prompt window.
- Navigate to the directory where you want to clone the project.
- Run the following command to clone TodoApp repository: 

```bash
  git clone https://github.com/GregorySVD/TodoApp
```
3. Start Frontend [FE]:

- Move to frontend folder - type in terminal or command prompt window: 
```bash
  cd .\TodoApp\frontend\     
```
- Install the required dependencies:
```bash
  npm install 
```
- Run the following command to start Frontend:
```bash
  npm run start
```
3. Start Backend [BE]:
- Move to backend folder - if You are still in [FE] folder, type in terminal or command prompt window:
```bash
  cd ..\backend\
```
- Install the required dependencies:
```bash
  npm install 
```
- Run the following command to start Backend:
```bash
  npm run start
```

## Features
- Adding Tasks: Users can add new tasks by specifying their titles.
- Removing Tasks: Tasks can be deleted, allowing for cleaning up the task list.
- Editing Tasks: Existing tasks can be edited by changing their titles.
- Marking Tasks as Completed: Users can mark tasks as completed, facilitating progress tracking.
- Theme Changer: Users can choose between a dark or light version for a personalized interface.
- Toast notification: Users receive real-time feedback and updates about their actions, enhancing the interactive experience.
  
## 🛠 Tech Stack
![Database](https://img.shields.io/badge/Database-MySQL-blue?style=flat-square&logo=mysql)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-blueviolet?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Backend-Express%20%7C%20TypeScript%20%7C%20Jest-green?style=flat-square&logo=express)

## Known issues 
Hey, we're all a work in progress, right? Here are a few quirks in TodoApp that I'm aware of. Blame it on the ticking clock – this is still the beta version, and I promise I'll iron out the kinks soon!

1. Identity Crisis:

Backend vs. Frontend: So, the backend is rocking 'Todo' as the cool name for variables, while the frontend is vibing with 'Task.' It's like they're speaking different languages. Lost in translation, you know?

2. Router Riddles:

Contact and About Saga: The grand plan was for the 'Contact' and 'About' bookmarks to be these cool separate pages, strutting their stuff with react-router. Well, life got busy, and they ended up as not-so-separate entities displayed as modal. Oops!

3. Task Tales:

Missing Descriptions: Adding tasks is a breeze, but let's be real – a task without a story is like a day without sunshine. Currently, they're a bit shy on the description front. Fear not, though! Soon, they'll spill their tales, and you'll be able to add and view those juicy details.

4. File Frenzy:

Balagan Galore: There's a bit of a mess going on in the project files. It's like a jigsaw puzzle with a few missing pieces. Time constraints got the best of me, and organization took a back seat. But hey, we're all friends here, right? We'll tidy up this digital mess soon.

5. Navbar Nomad:

Layout Dilemma: Now, here's the head-scratcher. The NavBar component is having an identity crisis – should it hang out in the 'layouts' folder, rubbing elbows with others, or is it destined for the solo life in its own folder? Decisions, decisions. Feel free to share your thoughts on this one!

## Author

- [@GTerenda](https://github.com/GregorySVD)



