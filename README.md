# DealShark

## Note between team members for essential changes/details:

### Sunday March 21:
- I created **lazy loading route** for **game** and **user** in general. To do this, I have to create each one a module so the **structure** had been **change**, as well as **url**.
- Component game list, game detail moved inside game module. Url is game for game list, game/game-detail for game detail (just a placeholder)
- Component profile, owned-game, saved-game also moved to user module, url: user/, user/owned-game, user/saved-game

```
http://localhost:4200/user/owned-game
http://localhost:4200/user (profile)
http://localhost:4200/user/saved-game

game list :sortBy
http://localhost:4200/game/sortByRecent 
http://localhost:4200/game/sortByTitle
http://localhost:4200/game/sortByMetacritic
http://localhost:4200/game/sortByDeal
http://localhost:4200/user/owned-game (game detail for now)
```
