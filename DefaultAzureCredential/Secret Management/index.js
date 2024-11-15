import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// Replace with your actual Key Vault name
const keyVaultName = "Your-keyVault-Name";
const vaultUrl = `https://${keyVaultName}.vault.azure.net`;

// Initialize credential and client
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(vaultUrl, credential);

async function manageSecret() {
  // Create a new secret in Key Vault
  const secretName = "MySecretTest";
  const secretValue = "Hello Hello from Microsoft!!";

  try {
    console.log(`Creating secret '${secretName}'...`);
    const createdSecret = await secretClient.setSecret(secretName, secretValue);
    console.log(`Secret created: ${createdSecret.name}`);
    
    // Retrieve the secret's name and value
    console.log(`Retrieving secret '${secretName}'...`);
    const retrievedSecret = await secretClient.getSecret(secretName);
    console.log(`Secret Name: ${retrievedSecret.name}`);
    console.log(`Secret Value: ${retrievedSecret.value}`);
    
    // Delete the secret after retrieving it
    console.log(`Deleting secret '${secretName}'...`);
    await secretClient.beginDeleteSecret(secretName);
    console.log(`Secret deleted: ${secretName}`);
  } catch (err) {
    console.error("Error managing the secret:", err);
  }
}

// Run the function
manageSecret();
