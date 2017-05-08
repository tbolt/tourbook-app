'use strict';

{/*
  *   Tourbook iOS App
  *
  *   Realm Database Schema
  *
  *   Tourbook is an app to log and track shows you have
  *   attended. You can add pictures, notes, and more details.
  *   You can also rate shows and share them to social networks.
  *
  *   Tyler Bolchoz
  *   12/28/2016
  *
*/}
const Realm = require('realm');
class Concert {}
Concert.schema = {
  name: 'Concert',
  primaryKey: 'guid',
  properties: {
    guid: 'string', // primary key
    name: 'string',
    artist: 'string',
    venue: 'string',
    location: 'string',
    date: {type: 'string'},
    rating: {type: 'int', default: 0},
    showNotes: 'string',
    concertPhoto: 'string',
    ticketPhoto: 'string'
  }
};

export default new Realm({schema: [Concert], schemaVersion: 400});
