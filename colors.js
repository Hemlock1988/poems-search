const colors = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    grey: '\x1b[90m',
};

function colorize(text, color) {
    return colors[color] + text + colors.reset;
}

function highlight(text, word, color) {
    const regex = new RegExp(word, 'gi');
    return text.replace(regex, (match) => colorize(match, color));
}

module.exports = { colorize, highlight, colors };