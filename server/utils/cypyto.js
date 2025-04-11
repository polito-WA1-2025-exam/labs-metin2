"use strict";
/*
    A utility module for handling cryptographic operations.
    This module provides functions to hash passwords and verify hashes.
*/
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userDao = require("../dao/userDao");

// Function to hash a password using bcrypt
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userDao.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Function to serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Function to deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDao.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Export the functions for use in other modules
