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

  // Init users collection
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
  console.log('Reading JSON', adsList);

  try {
    const importedAds = await Ads.create(adsList);
    console.log(`Importing ads...'${importedAds}`);
  } catch (error) {
    console.log('error', error);
  }
}

async function initUsers() {
  // Drop all users documents
  const deleted = await User.deleteMany();
  console.log(`Deleting ${deleted.deletedCount} users.`);

  // Create initial users
  const inserted = await User.insertMany([
    {
      email: 'c3po@quantumpop.net',
      password: await User.hashPassword('supersecure-1!'),
    },
    {
      email: 'jaba.hutt@quantumpop.net',
      password: await User.hashPassword('supersecure-2'),
    },
    {
      email: 'hansolo.hutt@quantumpop.net',
      password: await User.hashPassword('supersecure-3'),
    },
  ]);

  console.log(`Creating ${inserted.length} users.`);
}
