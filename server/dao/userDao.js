"use strict";
/*
    A data access object (DAO) for managing users in the database.
    This module provides functions to interact with the user table.
*/

const db = require("./db");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const fs = require("fs");
