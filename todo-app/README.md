Created by Nogah Goldberg and Yoav Rosenbaum 


Link to heroku project: https://enigmatic-refuge-27351.herokuapp.com

Login/Register Screen:
Each user will need to first register with a username and password.
Once registered, the user can login, and will be redirected to the Main Todo Screen.
If the user tries to login without registering first or tries to login with incorrect username/password, or tries to login or register with empty fields, he/she will be alerted.

Main Todo Screen:
TODO Lists that consists of list elements.
When the user first logs in, if no lists exist, the Main Todo Screen will not contain lists.
The user will be able to add TODO Lists, edit/delete/search elements on lists, delete lists, and share a list with a user.
The user will be able to choose the color background of each list, and the color will be saved so if we refresh or logout, the color will be updated always.
Logout button- when the user logs out, he will be redirected to the login/register screen.

Technologies used: React JS, Mongo DB, Express, Heroku

We enjoyed doing this project and learned a lot :)


How to run the app:
you can either go straight into the heroku link or you can run the app by doing:
npm install
npm start