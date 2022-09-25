"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
//builders
const discord_js_1 = require("discord.js");
const lib_1 = require("../utils/lib");
//various dice-based roll utilities
const interpreters = __importStar(require("../interpreters/interpreter"));
//commands
const inputs = __importStar(require("../utils/rollCommandBuilders"));
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls dice")
    .addSubcommandGroup(inputs.sbrCommand)
    .addSubcommand(inputs.forgedCommand)
    .addSubcommand(inputs.customRollCommand)
    .addSubcommand(inputs.pbtaCommand);
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isRepliable || !interaction.isChatInputCommand())
        return;
    const rollType = interaction.options.getSubcommandGroup() ||
        interaction.options.getSubcommand();
    let response = {
        title: "Command error!",
        description: "Some kind of command error has occurred. Please post a comment on Sparks' itch.io page if you encounter this message with as much information as you can provide about the command that produced this result!",
        status: lib_1.RollStatus.Failure,
        dice: [],
    };
    switch (rollType) {
        case "custom": {
            const count = interaction.options.getInteger("count");
            const sides = interaction.options.getInteger("sides");
            if (!count || !sides)
                return;
            let rolls = (0, lib_1.rollDice)(count, sides);
            response = interpreters.customRoll(rolls, count, sides);
            break;
        }
        case "sbr": {
            if (interaction.options.getSubcommand() === "fallout") {
                response = interpreters.falloutTest((0, lib_1.rollDice)(1, 12));
            }
            else if (interaction.options.getSubcommand() === "check") {
                const pool = interaction.options.getInteger("pool");
                if (!pool)
                    return;
                const [zeroD, rolls] = pool === 0 ? [true, (0, lib_1.rollDice)(1, 12)] : [false, (0, lib_1.rollDice)(pool, 12)];
                response = interpreters.skillCheck(rolls, zeroD);
            }
            break;
        }
        case "forged": {
            const pool = interaction.options.getInteger("pool");
            const rollTypeKey = interaction.options.getString("type");
            if (!rollTypeKey || !pool)
                return;
            const rollType = lib_1.ForgedType[rollTypeKey];
            const rolls = pool === 0 ? (0, lib_1.rollDice)(2, 6) : (0, lib_1.rollDice)(pool, 6);
            response = interpreters.forgedDice(rolls, rollType, pool === 0);
            break;
        }
        case "pbta": {
            const stat = interaction.options.getInteger("stat");
            if (!stat)
                return;
            let rolls = (0, lib_1.rollDice)(2, 6);
            response = interpreters.pbtaMove(rolls, stat);
            break;
        }
    }
    const colors = {
        [lib_1.RollStatus.Failure]: "Red",
        [lib_1.RollStatus.Mixed]: "Gold",
        [lib_1.RollStatus.Full]: "Green",
        [lib_1.RollStatus.Crit]: "Aqua",
    };
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(response.title)
        .setDescription(response.description)
        .addFields({ name: "Rolls", value: response.dice.join(", ") })
        .setColor(colors[response.status]);
    yield interaction.reply({ embeds: [embed] });
});
exports.execute = execute;
