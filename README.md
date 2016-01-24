# ScreepsJS Bot

ScreepsJS is my very simple bot/AI built on top of Screeps tutorial, for the JavaScript-based MMO Strategy game Screeps.com.

Nothing fancy, but it's fine for the first few hours of the game and (more-or-less) self-sufficient if enough number of Extensions are provided.

# Features
Apart from the original tutorial features, this bot also can:

- Handle timeToLife of Creeps and renew them as needed.
- Recreate creeps if renewal fails and they fall into decay.
- Builders can also maintain Room Controller and work as an Upgrader. (there's also an Upgrader role, if you prefer)
- Builders won't drain a Spawn under half of its capacity.
- Custodian role. Maintains roads and structures under less than %90 integrity, also fortifies walls and ramparts in its spare time.
- Guards can talk, and notify you of hostile presence.
- Spawn guards automatically on hostile presence.
- Harvesters use and prioritize Extensions, they can also switch back and forth.


**Note**: "Spawn1" is the hardcoded spawn name.

# Installation

- Clone this repo, or simply copy/paste it!