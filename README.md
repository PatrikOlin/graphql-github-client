# How to run

Projekten förväntar sig en .env-fil i projektroten som ser ut som föjande:

```sh
REACT_APP_GITHUB_TOKEN=<token>
REACT_APP_GITHUB_URL=https://api.github.com/graphql
```

Där `<token>` är en Github-token med scopes `public_repo`

I övrigt ska det bara vara att köra `npm install && npm start` för att starta projektet.
