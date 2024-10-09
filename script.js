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

document.getElementById('calculateButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputString').value;
    const n = userInput.length;
    const memo = Array.from({ length: n }, () => Array(n));
    const lengthOfLPS = lps(userInput, 0, n - 1, memo);
    
    document.getElementById('result').textContent = "The length of the LPS is " + lengthOfLPS;
});