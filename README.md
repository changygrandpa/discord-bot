# Discord Moderation Bot

A Discord bot with moderation capabilities (kick/ban/mute/timeout), weather information, and auto-role assignment.

## Features

- **Moderation Commands**: Kick, ban, mute, and timeout users
- **Weather Information**: Get weather information based on location
- **Auto Role**: Automatically assign the "members" role to new users

## Setup

1. Install dependencies: `npm install`
2. Create a `.env` file with your Discord bot token and OpenWeather API key
3. Run the bot: `node index.js`

## Configuration

Create a `.env` file with the following variables:

```
DISCORD_TOKEN=your_discord_bot_token
WEATHER_API_KEY=your_openweather_api_key
```

## Commands

- `/kick <user> [reason]` - Kick a user from the server
- `/ban <user> [reason]` - Ban a user from the server
- `/mute <user> [duration] [reason]` - Mute a user
- `/timeout <user> [duration] [reason]` - Timeout a user
- `/weather <location>` - Get weather information for a location
