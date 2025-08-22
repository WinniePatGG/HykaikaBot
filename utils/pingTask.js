const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { PING_DOMAIN } = require('../config');

function startPingLoop() {
    setInterval(async () => {
        try {
            const res = await fetch(PING_DOMAIN);
        } catch (err) {
            console.error(`[PING] Error: ${err}`);
        }
    }, 20000);
}

module.exports = { startPingLoop };