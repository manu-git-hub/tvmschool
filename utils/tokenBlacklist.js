const blacklistedTokens = new Set();

// Add a token to the blacklist
function blacklistToken(token, expiresIn) {
  blacklistedTokens.add(token);

  // Automatically remove the token from the blacklist after it expires
  setTimeout(() => {
    blacklistedTokens.delete(token);
  }, expiresIn * 1000);
}

// Check if a token is blacklisted
function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
