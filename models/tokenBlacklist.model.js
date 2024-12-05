module.exports = (sequelize, Sequelize) => {
    const TokenBlacklist = sequelize.define('token_blacklist', {
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure no duplicate tokens
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  
    return TokenBlacklist;
  };
  