# Health-Hero Backend API

Backend server for DECO7381 developed by Team Running Alpaca

## Deployment

### 1. Deploy Platform

The server has been deployed on [Heroku](https://dashboard.heroku.com/apps).

- It may sleep after long time inactive, please wait 5 - 10 second for the server to awake.

### 2. Essential URL

https://health-hero-team-ra.herokuapp.com/

- After entering the default routes, there should be a page looks like this: \
  ![Landing Page](/assets/landing.png?raw=true 'Image of default route')
- The API document was developed with Swagger, it contains all the available routes and requirement for each request
  [See Details of Our Document](https://health-hero-team-ra.herokuapp.com/api-docs/)

### 3. GitHub Repository

https://github.com/DECO7381-Team-Running-Alpaca/health-hero-backend \
Our team has a GitHun organization [DECO7381-Team-Running-Alpaca](https://github.com/DECO7381-Team-Running-Alpaca) \
Currently all the repos are private to ensure the academic integrity, please contact [Zhenyuan Li](mailto:zhenyuan.li@uqconnect.edu.au) for authorization.

## Running on Local Device

### 1. Preparation

Please prepare the following environment before running the server locally

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- A preferred code editor ([Visual Studio Code](https://code.visualstudio.com/) is recommended)

### Steps

1. Start MongoDB at your local devices
2. Navigate to database connection file (src/utils/mongoose.js), and at line 5, change the constant DBurl to process.env.DB_URL_DEV

```sh
 const DBurl = process.env.DB_URL_DEV;
```

3. In your terminal, run following command, and make sure port 3030 and 27017 are not occupied

```sh
 npm install
 npm run dev
```

4. After server connected, the console should look like this
   ![Console screenshot](/assets/console.png?raw=true 'Image of console')

## Environment Variable

Please ensure your .env file contains the following key and value pairs.

```sh
PORT=3030
DB_URL=mongodb+srv://team_access:123qwe@cluster0.owybn.mongodb.net/health-hero-database?retryWrites=true&w=majority
DB_URL_DEV=mongodb://127.0.0.1:27017/health-hero
JWT_KEY=HEALTHHERO
API_KEY=86b3a96f57c149df83551cd3a481adcc
YOUTUBE_KEY=AIzaSyCQHaHvBZAscOdL_G7kCPXjMVsfi3BVX9Y
```

## Contact

If you encounter any difficulties during running the server or have question about the application, please contact Zhenyuan Li \
Email:
zhenyuan.li@uqconnect.edu.au \
Discord:
Vincent0Li#6646 \
GitHub:
[Zhenyuan-Li](https://github.com/Zhenyuan-Li)
