const fs = require('fs');

class FactsManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.facts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    getRandomFact() {
        const factKeys = Object.keys(this.facts);
        const randomKey = factKeys[Math.floor(Math.random() * factKeys.length)];
        return this.facts[randomKey];
    }
}

module.exports = FactsManager;