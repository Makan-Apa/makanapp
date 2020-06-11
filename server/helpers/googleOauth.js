function verificationToken(token) {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client('728101544811-4jtjpuoo8fnb1acf3m97scpjno5t97nn.apps.googleusercontent.com');

  return new Promise((resolve, reject) => {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '728101544811-4jtjpuoo8fnb1acf3m97scpjno5t97nn.apps.googleusercontent.com'
      });
      const payload = ticket.getPayload();
      resolve(payload);
    }
    verify().catch(reject);
  });  
}

module.exports = verificationToken;