IDEAS:

- 3 Different Views
    - TV
    - Player
    - Host

- HOST
    - Requires Login
    - Can create a game (with a game code)
    - Can add Questions
    - Can create teams
    - Can assign players to teams

- TV
    - Can join through game code
    - Just shows current game state

- Player
    - Can join through game code
    - Can Answer questions
    - Shows current game state


- [ ] Google Login  
- [ ] Create a game
    - Add Questions
    - Assign Teams
    - Set a game as active/inactive


- [ ] Game state object
    - unstarted - Game has not been started by the host
    - pending - Game has been started no question has been picked
    - in_question - Question has been picked, every team has not answered
    - answered - all teams have answered have answered
    - show_answers - all teams have answered and host has requested to show answers
    - finished - all questions have been answered.