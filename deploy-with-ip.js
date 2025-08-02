// This script is a modified version of deploy-commands.js that uses a direct IP address
// for Discord's API to bypass DNS resolution issues

const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create custom agent with longer timeout
const https = require('https');
const agent = new https.Agent({
  keepAlive: true,
  timeout: 30000, // 30 seconds timeout
});

// Override DNS resolution for discord.com
const dns = require('dns');
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (hostname === 'discord.com') {
    console.log('Overriding DNS resolution for discord.com');
    // Use one of Discord's IP addresses directly
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    process.nextTick(() => {
      callback(null, '162.159.128.233', 4);
    });
    return;
  }
  return originalLookup(hostname, options, callback);
};

// Get command files
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

// Configure REST client with custom agent
const rest = new REST({ version: '9' })
  .setToken(process.env.DISCORD_TOKEN)
  .setAgent(agent);

// Deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Set a custom header to ensure we're using the IP address
    const headers = {
      'Host': 'discord.com',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-api-docs, 9)',
    };

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands, headers }
    );

    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
})();
