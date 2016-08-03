var col = require('./collector')(require('http'));
var diskspace = require('diskspace');
var os = require('os');
var psRunner = require('./psRunner');
var config = require('./config/config.json');

var Memory = require('./counter/memory/memory.js');
var Cpu = require('./counter/cpu/cpu.js');
var Disc = require('./counter/disc/disc.js');

var memory = new Memory();
var cpu = new Cpu();
var disc = new Disc();

col.collect(10000, config.boards, memory);
col.collect(5000, config.boards, cpu);
col.collect(30000, config.boards, disc);