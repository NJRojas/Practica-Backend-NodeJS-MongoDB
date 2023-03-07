'use strict';

const Ads = require('../models/Ads');
const connection = require('../lib/connectMongoose');

// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log('There was an error', err));

async function main() {

    // Initialize Ads collection
    await initAds();

    connection.close();
}

/**
 * Initiate Ads collection
 * Drop and fresh load data
 */
async function initAds() {

    // Drop data from Ads collection
    const deleted = await Ads.deleteMany();
    console.log(`Dropping ads.. ${deleted.deletedCount}`);

    // Load exinting Ads
    await loadAds();
}

/**
 * Loads existing Ads from ads.json file
 */
async function loadAds() {

    const fs = require('fs')
    const adsList = await JSON.parse(fs.readFileSync('./models/Ads.json', 'utf-8'));
    console.log('Reading JSON', adsList);

    try {
        const importedAds = await Ads.create(adsList);
        console.log(`Importing ads...'${importedAds}`);

    } catch (error) {
        console.log('error', error)
    }
}