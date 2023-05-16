'use strict';

// Import local variable values
require('dotenv').config();

const { Ads, User } = require('../models');
const connection = require('../lib/connectMongoose');

// Wait for database to connect, log an error if there is a problem
main().catch(err => console.log('There was an error', err));

async function main() {
  // Initialize Ads collection
  await initAds();

  // init users collection
  await initUsers();

  connection.close();
}

/**
 * Initiate Ads collection
 * Drop and fresh load data
 */
async function initAds() {
  // Drop data from Ads collection
  const deleted = await Ads.deleteMany();
  //console.log(`Dropping ads.. ${deleted.deletedCount}`);

  // Load exinting Ads
  await loadAds();
}

/**
 * Loads existing Ads from ads.json file
 */
async function loadAds() {
  const fs = require('fs');
  const adsList = await JSON.parse(
    fs.readFileSync('./models/Ads.json', 'utf-8')
  );
  //console.log('Reading JSON', adsList);

  try {
    const importedAds = await Ads.create(adsList);
    //console.log(`Importing ads...'${importedAds}`);
  } catch (error) {
    console.log('error', error);
  }
}

async function initUsers() {
  // drop all users documents
  const deleted = await User.deleteMany();
  console.log(`Deleting ${deleted.deletedCount} users.`);

  // create initial users
  const inserted = await User.insertMany([
    { email: 'user@example.com', password: '1234' },
    { email: 'jaba.hutt@nodepop.com', password: '1234' },
    { email: 'boba.hutt@nodepop.com', password: '1234' },
  ]);

  console.log(`Creating ${inserted.length} users.`);
}
