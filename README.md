# Peerprep (Group 45)
**Members**: Pham Chau Giang, Fong Yi Fei, Le Quoc Huy, Hoang Le Tri Cuong, Guo Qi

## Assignment 1
### Quick Start
1. From the root folder, navigate to the `backend` folder
2. Run the command `npm install`
3. Make sure the `.env` file containing the MongoDB URI is in this `backend` folder
4. Run the command `npm run start`
5. Open your browser and go to the address http://localhost:3001/
6. The app is now running locally, and connected to an online MongoDB database

## Assignment 2
### Quick Start
1. From the root folder, navigate to the `backend\account-service` folder
2. Run the command `npm install`
3. Ensure the `.env` file containing the MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE is in this `backend\account-service` folder
4. Ensure that you have MySQL Server installed and the service is running
5. Run the command `npm run start`
6. Repeat steps 1 - 5 for the `backend\question-service` folder, with the .env file containing the MongoDB URI
7. Navigate to `frontend-react`
8. Run the command `npm install`
9. Run the command `npm start`
10. The app is now running locally at http://localhost:3000/

## Assignment 3
### Quick Start
1. Navigate to the `backend/account-service` folder
2. Run `npm install`
3. Make sure the include the `.env` file for assignment 3 in this `backend/account-service` folder
4. Run the command `npm run dev` to start the account service
5. Navigate to the `backend/question-service` folder
6. Run the command `npm install`
7. Make sure the include the `.env` file for assignment 3 in this `backend/question-service` folder
8. Run the command `npm run dev` to start the question service
9. Navigate to the `frontend-react` folder
10. Run the command `npm install`
11. Run the command `npm start` to start the front end.
12. The app is now running locally at http://localhost:3000/

## Assignment 4
### Quick Start
1. Make sure the include the `.env` file for assignment 4 in the following folders: `backend/account-service`, `backend/question-service`
2. Install Docker Desktop if you haven't
3. Login to Docker
4. Navigate to the root project folder
5. Run the command `docker login` in the terminal
6. Run the command `docker compose up --build` in the terminal
7. The app is now running locally at http://localhost:3000/

## Assignment 5
### Quick Start
1. Make sure the include the `.env` file for assignment 5 in the following folders: `backend/ai-service`, `backend/account-service`, `backend/question-service`, `backend/collab-service`, `backend/matching-service`
2. Install Docker Desktop if you haven't
3. Login to Docker
4. Navigate to the root project folder
5. Run the command `docker login` in the terminal
6. Run the command `docker compose up --build` in the terminal
7. The app is now running locally at http://localhost:3000/

## Final Submission
### Google Cloud Platform
Our main application can be accessed via the following link: https://frontend-g5qibfavfa-uc.a.run.app

### Local Deployment
1. Follow **Assignment 5**, **Quick Start** step 1. Additionally, make sure to include the `.env` file for final submission in the following folders: root folder, `frontend-react`
2. Install Docker Desktop if you haven't
3. Login to Docker
4. Start Docker Desktop
5. In your terminal, go to the root project folder
6. (Optional) Log into docker using the command `docker login` in the terminal
7. Type `docker compose up –-build` and run the command
8. After all the containers have started, visit http://localhost:3000/ to access our application

### Unit Testing
1. Follow step 1 in **Local Deployment**
2. In the terminal, run the command `npm install` in both the root folder and the `backend/question-service` folder
3. Navigate to the root folder, and run the command `npm run test`

Testing is automatically done when pushing to the repo or merging a Pull Request.
