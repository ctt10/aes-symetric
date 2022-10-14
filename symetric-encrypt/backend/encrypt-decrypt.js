import crypto from "crypto-browserify";
const algorithm = 'aes-256-cbc';
// const key = '4cef96b801e198f5c2f74f8d26aeb2ac4e6aac2c1f83e53c719aed882623473f';//crypto.randomBytes(32);
const key = process.env.UCM_SECRET_KEY;
const iv = crypto.randomBytes(16);

export function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(text) {
text=JSON.parse(text)
 console.log('text', typeof(text), text)
 let iv = Buffer.from(text.iv, 'hex');
console.log('iv', iv)
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
console.log('encryptedText', encryptedText)
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
console.log('decipher', decipher)
 let decrypted = decipher.update(encryptedText);
console.log('decrypted', decrypted)
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 console.log('decrypted.toString()', decrypted.toString())
 return decrypted.toString();
}