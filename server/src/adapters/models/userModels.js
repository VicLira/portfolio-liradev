const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

UserSchema.methods.hashPassword = function(password) {
  // Gere um salt aleatório
  const salt = crypto.randomBytes(16).toString('hex');

  // Crie um hash da senha combinada com o salt usando pbkdf2
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');

  // Armazene o hash concatenado com o salt
  this.passwordHash = salt + hash.toString('hex');
};

UserSchema.methods.comparePassword = function(candidatePassword) {
  // Extraia o salt do hash armazenado
  const salt = this.passwordHash.substring(0, 32);

  // Gere o hash da senha candidata usando o mesmo salt
  const hash = crypto.pbkdf2Sync(candidatePassword, salt, 10000, 64, 'sha512');

  // Compare o hash gerado com o hash armazenado
  const candidatePasswordHash = salt + hash.toString('hex');
  return candidatePasswordHash === this.passwordHash;
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
