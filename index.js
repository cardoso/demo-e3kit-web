const log = e => {
    document.getElementById("logs").innerHTML += `${e}<br/>`;
}

const alice = new Device('Alice');
const bob = new Device('Bob');

let bobLookup = null;
let aliceLookup = null;

main();

async function main() {
    await initializeUsers();
    await registerUsers();
    await lookupPublicKeys();
    await encryptAndDecrypt();
}

async function initializeUsers() {
    log(`Initializing ${alice.identity}`);
    await alice.initialize().catch(e => log(`Failed initializing ${alice.identity}: ${e}`));

    log(`Initializing ${bob.identity}`);
    await bob.initialize().catch(e => log(`Failed initializing ${bob.identity}: ${e}`));
}

async function registerUsers() {
    log(`Registering ${alice.identity}`);
    await alice.register().catch(e => log(`Failed registering ${alice.identity}: ${e}`));

    log(`Registering ${bob.identity}`);
    await bob.register().catch(e => log(`Failed registering ${bob.identity}: ${e}`));
}

async function registerUsers() {
    log(`Registering ${alice.identity}`);
    await alice.register().catch(e => log(`Failed registering ${alice.identity}: ${e}`));

    log(`Registering ${bob.identity}`);
    await bob.register().catch(e => log(`Failed registering ${bob.identity}: ${e}`));
}

async function lookupPublicKeys() {
    log(`Looking up ${bob.identity}'s public key`);
    bobLookup = await alice.lookupPublicKeys([bob.identity]).catch(e => log(`Failed looking up ${bob.identity}'s public key: ${e}`));

    log(`Looking up ${alice.identity}'s public key`);
    aliceLookup = await bob.lookupPublicKeys([alice.identity]).catch(e => log(`Failed lookig up ${alice.identity}'s public key: ${e}`));
}

async function encryptAndDecrypt() {
    let aliceEncryptedText = await alice.encrypt('Hello Bob!', bobLookup);
    log(`Alice encrypts and signs: '${aliceEncryptedText}'`);
    let aliceDecryptedText = await bob.decrypt(aliceEncryptedText, aliceLookup[alice.identity]);
    log(`Bob decrypts and verifies Alice's signature: '${aliceDecryptedText}'`);

    let bobEncryptedText = await bob.encrypt('Hello Alice!', aliceLookup);
    log(`Bob encrypts and signs: '${bobEncryptedText}'`);
    let bobDecryptedText = await alice.decrypt(bobEncryptedText, bobLookup[bob.identity]);
    log(`Alice decrypts and verifies Bob's signature: '${bobDecryptedText}'`);
}