function lps(s, lo, hi, memo) {
    if (lo === hi) return 1;
    if (s[lo] === s[hi] && lo + 1 === hi) return 2;
    if (memo[lo][hi] !== undefined) return memo[lo][hi];

    if (s[lo] === s[hi]) {
        memo[lo][hi] = lps(s, lo + 1, hi - 1, memo) + 2;
    } else {
        memo[lo][hi] = Math.max(lps(s, lo, hi - 1, memo), lps(s, lo + 1, hi, memo));
    }

    return memo[lo][hi];
}

function constructLPS(s, lo, hi, memo) {
    let lpsStr = "";
    
    while (lo <= hi) {
        if (s[lo] === s[hi]) {
            lpsStr += s[lo];
            lo++;
            hi--;
        } else if (memo[lo][hi - 1] > memo[lo + 1][hi]) {
            hi--;
        } else {
            lo++;
        }
    }

    // Construct the full LPS by adding the reverse of the first half
    const secondHalf = lpsStr.split('').reverse().join('');
    return lpsStr + secondHalf.slice(1); // Avoid duplicating the middle character
}

document.getElementById('calculateButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputString').value;
    const n = userInput.length;
    const memo = Array.from({ length: n }, () => Array(n));
    
    const lengthOfLPS = lps(userInput, 0, n - 1, memo);
    const lpsString = constructLPS(userInput, 0, n - 1, memo);
    
    document.getElementById('result').textContent = 
        "The length of the LPS is " + lengthOfLPS + 
        " and the LPS is: " + lpsString;
});
