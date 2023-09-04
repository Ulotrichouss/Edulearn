# Edulearn Mobile

## Table of contents

- [Introduction](#introduction)
- [Install](#install)
- [Run](#run)
- [Database Models](#database)

## Introduction

An api about Edulearn application using Node js, Express js, and Mongoose.

NOTE: Please read the RUN section before opening an issue.

## Install

Installing NPM modules on both client and server folders

Execute these commands from the project directory

```
npm install
```

## Run

Open a terminal on server directory

```
npm run start:dev
```

and open another terminal on client directory

```
npm run start
```

Access the web app at http://localhost:5000/

## Database

All the models can be found in the models directory created using mongoose.

### User Schema:

- username (String)
- edu (String)
- age (String)
- phone (String)
- email (String)
- password (String)
- image (String)
- about (String)
- role (String - default user) 
- token (String)
- createdAt

### Category Schema:

- name (String)
- image (String)

### Class Schema:

- author (ObjectId - a reference to the user schema)
- video (String)
- image (String)
- title (String)
- intro (String)
- about (Number)
- keypoint [String]
- benefit [String]
- tool [ObjectId - a reference to the tool schema]
- register [ObjectId - a reference to the user schema]
- rating: an array of objects, each object contains: <br>
  ~ userId (ObjectId - a reference to the user schema) <br>
  ~ star (Number) <br>
- price (String)
- totalRating (Number - default 0)

### Group Schema:

- name (String)
- image (String)
- include: an array of objects, each object contains: <br>
  ~ classId (ObjectId - a reference to the class schema) <br>
  ~ level (String) <br>

### Lesson Schema:

- classId (ObjectId - a reference to the class schema)
- name (String)
- file (String)
- userId (ObjectId - a reference to the user schema)

### Tools Schema:

- name (String)
- image (String)
