module.exports = {
    name: 'ready',
    once: true,
    execute: function (client) {
        console.log("Sparks, ready! Logged in as ".concat(client.user.tag));
    },
};
