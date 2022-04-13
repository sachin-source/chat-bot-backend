const debuggerEnabled = false;
const debuggerString = 'chat-backend:server';
const loginJwtSecret = "mounaraaga";
const supportJwtSecret = "supportMounaraaga"

const generateRandomString = (length: number = 16) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const generateChannelKey = () => {
    return generateRandomString(5) + (new Date().getTime()) + generateRandomString(5);
}

const generateUserId = () => {
    return generateRandomString(8) + (new Date().getTime()) + generateRandomString(3);
}

export { debuggerEnabled, debuggerString, loginJwtSecret, supportJwtSecret, generateChannelKey, generateRandomString, generateUserId };