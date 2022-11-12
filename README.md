# Braggart Scorekeeper App
An application to keep track of player statistics for your board-gaming group. 

## Description
If you play a lot of board games, you may have a decent sense about who is better at what games and by how much. But if there is disagreement, there isn't much you can do to settle the difference unless you've kept records of your matches. Braggart is inteded as a simple application for keeping track of which games your groups plays, including information about which games players play the most often, what player's win-rates are at the games the play, and what their average deviation from the winning score is.

## Demo
[![A link to a demo video](https://timloughrist.files.wordpress.com/2022/11/ksnip_20221112-054830.png)](https://youtu.be/TuNLKUgQ9EQ)

Click the image above to watch a video demonstrating the app.

## Installation
The current version of the app uses JavaScript/React for the frontend and Ruby/Active Record/Sinatra for the backend.

The repository for the backend of this app can be found [HERE](https://github.com/tloughrist/phase-3-project-backend).

## Usage

**Player:** On the player page you can view existing players, including which games they played most recently, which games they play most often, and how many matches they've played in total. You can edit or delete a current player or create a new player here. If you delete a player, it will not also delete matches that player has played in. To do that, you must delete each of the relevant matches on the matches page.

**Games:** On the games page you can view existing games, including how many times that game has been played, when it was last played, and which player has the most wins at that game. You can edit or delete a current game or create a new game here. If you delete a game, it will also delete corresponding matches. When you create a game, you will specify whether the game is one where the highest score wins.

**Matches:** On the matches page you can view matches that have been recorded, including when it was played, what game was played, who played and what their scores were, and who won. You can edit or delete an existing match or create a new match here. When you create a new match, you will select the date and game. After the match has been created, edit the match to enter the player data: who played and what their scores were.

**Stat Board:** On the stat board page you can view the statistics for each game your group playes, including how many times each player has played it, how many wins each player has at it, what their win rate is, and the average number of points by which they trail the winner. These stats are derived from the information entered on the other pages; they cannot be edited directly.

## Support
If you have any questions about the app or suggestions, please send me an email at tim.loughrist@gmail.com.

## Roadmap
In the future, I'd like to add the following features:

1. Include team games and cooperative games
2. Include a login function and link accounts
3. Include a notes section for each match

## Contributing
If anyone wants to fork this repo and work on the app, I'd love to see what you do with it!

## Authors and acknowledgment
I've been lucky to have the help of instructors at the [Flatiron coding bootcamp](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron&uqaid=513747011248&CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE&gclid=CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE). I also want to thank everyone I've played board games with for inspiring this app.
