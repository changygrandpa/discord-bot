// This script uses node-fetch instead of undici to deploy commands

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get command files
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

// Deploy commands using fetch directly
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Use Discord's IP address directly
    const response = await fetch(`https://162.159.128.233/api/v9/applications/${process.env.CLIENT_ID}/commands`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'DiscordBot (https://github.com/discord/discord-api-docs, 9)',
        'Host': 'discord.com'
      },
      body: JSON.stringify(commands),
      timeout: 30000, // 30 seconds timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API response: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
})();
