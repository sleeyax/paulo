# Paulo
Yet another discord bot.

## Developers

### Installation
```
$ npm install
$ npm run build:watch
$ npm run serve:watch
```

### Production
```
$ npm run dist
$ docker build -t sleeyax/paulo:latest .
$ docker run -d --name paulobot -e "DISCORD_TOKEN=your_discord_bot_token_here" sleeyax/paulo:latest
```