"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.once = exports.name = void 0;
exports.name = "ready";
exports.once = true;
const execute = (client) => {
    console.log(`Sparks, ready! Logged in as ${client.user.tag}.`);
};
exports.execute = execute;
