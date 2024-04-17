document.getElementById('randomColorButton').addEventListener('click', function() {
    var randomHex = generateRandomHex();
    document.getElementById('hexInput').value = randomHex;
    updateBackgroundColor(randomHex);
    addToColorHistory(randomHex);
});

document.getElementById('hexInput').addEventListener('input', function() {
    var hex = this.value;
    updateBackgroundColor(hex);
});

document.getElementById('colorHistoryButton').addEventListener('click', function() {
    document.getElementById('colorHistoryDropdown').classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
    loadColorHistory();
});

function generateRandomHex() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateBackgroundColor(hex) {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        document.body.style.backgroundColor = hex;
    } else {
        document.body.style.backgroundColor = '#f2f2f2';
    }
}

function addToColorHistory(hex) {
    var colorHistory = getColorHistory();
    colorHistory.unshift(hex);
    localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
    updateColorHistoryDropdown(colorHistory);
}

function getColorHistory() {
    var colorHistory = localStorage.getItem('colorHistory');
    return colorHistory ? JSON.parse(colorHistory) : [];
}

function loadColorHistory() {
    var colorHistory = getColorHistory();
    updateColorHistoryDropdown(colorHistory);
}

function updateColorHistoryDropdown(colorHistory) {
    var dropdown = document.getElementById('colorHistoryDropdown');
    dropdown.innerHTML = '';
    var maxColors = 100; // Maximum number of colors to display
    colorHistory.slice(0, maxColors).forEach(function(hex) {
        var colorSwatch = document.createElement('div');
        colorSwatch.style.backgroundColor = hex;
        colorSwatch.classList.add('colorSwatch');
        colorSwatch.addEventListener('click', function() {
            document.getElementById('hexInput').value = hex;
            updateBackgroundColor(hex);
        });
        dropdown.appendChild(colorSwatch);
    });
}

function copyToClipboard() {
    var hexInput = document.getElementById("hexInput");
    hexInput.select();
    hexInput.setSelectionRange(0, 99999); /* For mobile devices */

    document.execCommand("copy");
    alert("Copied the text: " + hexInput.value);
}

