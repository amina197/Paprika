# Paprika  

## Table of Contents 
- [About](#about)
- [Technologies](#technologies)
- [Routes](#routes)
- [Database](#database)
- [Deployment](#deployment)
- [Performance](#performance)

## About
![GitHub top language](https://img.shields.io/github/languages/top/amina197/Paprika)  
Backend system for a Questions and Answers Section of an e-commerce website built to handle a 1,000 request per second with an average response time of 85ms and a 0% error rate

## Technologies
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge)
![AWS EC2](https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![Loader.io](https://img.shields.io/badge/-Loader.io-5379B9?logo=loader.io&logoColor=white&style=for-the-badge)
![Artillery.io](https://img.shields.io/badge/-Artillery.io-202020?logo=artillery.io&logoColor=white&style=for-the-badge)
![NGINX](https://img.shields.io/badge/-NGINX-009639?logo=nginx&logoColor=white&style=for-the-badge)

## Routes

| HTTP Method | Endpoint       | Query parameters         | Status Code | Action                  |
|-------------|----------------|--------------------------|-------------|----------------------------------------------------------|
|    GET      | /qa/:productId |  :productId              |     200     |Retrieve all questions and answers (with photos) from the specified product | 
|   POST      | /qa/:productId/q/add | :productId + question object in the body|  201     |Post a new question related to the specified product in the database|
|   POST      | /qa/a/add            | question ID & answer object in the body|  201     |Post a new answer related to the specified question|
|   PUT      | /qa/q/helpful            | question ID in the body |  200    | Mark the specified question as helpful by adding 1 to its score|
|   PUT      | /qa/a/helpful            | question ID and answer ID in the body |  200    | Mark the specified answer as helpful by adding 1 to its score|
|   PUT      | /qa/q/report           | question ID in the body |  200    | Report the specified question by changing its reported value from false to true|
|   PUT      | /qa/a/report           | question ID and answer ID in the body |  200    | Report the specified answer by changing its reported value from false to true|

## Database

MongoDB database aggregating all data in a single collection: 
- **3.5M** questions
- **6.9M** answers
- **2.1M** images

## Deployment
Server deployed on 2 t2 micro AWS EC2 instances load-balanced in round-robin with NGINX  
Database also deployed on a t2 micro AWS EC2 instance

## Performance
Average response time of 85ms and 0% error rate
