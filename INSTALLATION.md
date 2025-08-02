# Discord Bot Installation Guide

This guide will walk you through the process of setting up and running your Discord moderation bot.

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed (version 16.9.0 or higher). You can download it from [nodejs.org](https://nodejs.org/).

2. **Discord Account**: You need a Discord account and the ability to create a bot application.

## Step 1: Create a Discord Bot Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application" and give your application a name.
3. Navigate to the "Bot" tab and click "Add Bot".
4. Under the bot section, you'll see your bot's token. Click "Copy" to copy it (you'll need this later).
5. In the same page, scroll down to "Privileged Gateway Intents" and enable:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
6. Save your changes.

## Step 2: Invite the Bot to Your Server

1. In the Developer Portal, go to the "OAuth2" tab, then "URL Generator".
2. Under "Scopes", select "bot" and "applications.commands".
3. Under "Bot Permissions", select the following permissions:
   - Manage Roles
   - Kick Members
   - Ban Members
   - Moderate Members
   - Send Messages
   - Embed Links
   - Read Message History
4. Copy the generated URL at the bottom of the page.
5. Paste the URL in your web browser and select the server you want to add the bot to.

## Step 3: Set Up the Bot

1. Create a `.env` file in the root directory of the project with the following content:

```
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_application_id_here
WEATHER_API_KEY=your_openweather_api_key_here
```

2. Replace `your_discord_bot_token_here` with the token you copied earlier.
3. Replace `your_discord_application_id_here` with your application's ID (found in the General Information tab of the Developer Portal).
4. For the weather command, you'll need an OpenWeather API key. Get one for free at [OpenWeather](https://openweathermap.org/api).

## Step 4: Install Dependencies

Open a terminal in the project directory and run:

```
npm install
```

This will install all the required dependencies for the bot.

## Step 5: Deploy Commands

Run the following command to register the slash commands with Discord:

```
node deploy-commands.js
```

## Step 6: Start the Bot

Run the following command to start the bot:

```
node index.js
```

You should see a message saying "Logged in as [your bot's name]" if everything is set up correctly.

## Step 7: Set Up the Members Role

For the auto-role feature to work, you need to create a role named "members" in your Discord server:

1. Go to your Discord server settings.
2. Navigate to the "Roles" section.
3. Create a new role named "members" (case-sensitive).
4. Set the appropriate permissions for this role.
5. Make sure your bot's role is positioned above the "members" role in the role hierarchy.

## Using the Bot

Once the bot is running, you can use the following slash commands in your server:

- `/kick <user> [reason]` - Kick a user from the server
- `/ban <user> [reason]` - Ban a user from the server
- `/mute <user> [duration] [reason]` - Mute a user
- `/timeout <user> [duration] [reason]` - Timeout a user
- `/weather <location>` - Get weather information for a location

The bot will also automatically assign the "members" role to new users who join the server.

## Troubleshooting

- If commands aren't working, make sure you've run `deploy-commands.js` and that your bot has the necessary permissions.
- If the bot isn't responding, check that your token is correct in the `.env` file.
- For the auto-role feature, ensure the "members" role exists and that the bot has permission to manage roles.
- If the weather command isn't working, verify your OpenWeather API key is correct.

## Keeping the Bot Online

To keep the bot running 24/7, you might want to consider:

1. Using a process manager like PM2: `npm install -g pm2` and then `pm2 start index.js`
2. Hosting the bot on a cloud service like Heroku, Replit, or a VPS.
