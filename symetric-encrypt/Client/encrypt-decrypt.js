import crypto from "crypto-js";

//named globally to make unique to user
// const key = crypto.enc.Hex.parse(crypto.lib.WordArray.random(32));

/**
 * 
 * Key length for AES-256 must be 32 bytes 
 *  (32 byte hex string is 64 characters long) 
 * AES requires a unique (but not necessarily randomized) IV of 16 bytes.
 *  https://stackoverflow.com/questions/31132162/what-size-of-initialization-vector-needed-for-aes-256-encryption-in-java
 * 
 * In this form of encryption party with secret key can intercept and decode messages
 * 
 * For this to work, the secret key cannot be placed in 
 *  frontend javascript which is accessible to users. Key must be retrieved
 */
export function encrypt(text){
   const key = crypto.enc.Hex.parse("4cef96b801e198f5c2f74f8d26aeb2ac4e6aac2c1f83e53c719aed882623473f");
   const iv = crypto.enc.Hex.parse(crypto.lib.WordArray.random(16).toString()); //unique to each encoded string
   console.log('iv',iv)
   // AES-256
   const encrypted = crypto.AES.encrypt(text, key, {
     iv,
     mode: crypto.mode.CBC,
     padding: crypto.pad.Pkcs7,
   });
   const encryptedData = encrypted.ciphertext.toString(crypto.enc.Hex);
   return { iv: iv.toString(crypto.enc.Hex), encryptedData }  
}
 
export function decrypt(text) {
const key = crypto.enc.Hex.parse("4cef96b801e198f5c2f74f8d26aeb2ac4e6aac2c1f83e53c719aed882623473f");
   
   return crypto.AES.decrypt(text, key);
}