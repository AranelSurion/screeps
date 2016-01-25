# ScreepsJS Bot

ScreepsJS is my very simple bot/AI built on top of Screeps tutorial, for the JavaScript-based MMO Strategy game Screeps.com.

Nothing fancy, but it's fine for the first few hours of the game and (more-or-less) self-sufficient if enough number of Extensions are provided.

# Features
Apart from the original tutorial features, this bot also can:

- Handle timeToLife of Creeps and renew them as needed.
- Recreate creeps if renewal fails and they fall into decay.
- Builders can also maintain Room Controller and work as an Upgrader. (there's also an Upgrader role, if you prefer)
- Builders won't drain a Spawn under half of its capacity.
- Custodian role. Maintains roads and structures under  %90 integrity, also fortifies walls and ramparts in its spare time. (ignores rookie walls)
- Miner/Carrier roles to replace Harvester role. Also refills builders if upgrading Room Controller.
- Guards can talk, and notify you of hostile presence. They can be ordered to move by using GUARD_MOVE flag.
- Spawn guards automatically on hostile presence. You'll also receive a notification.
- Harvesters use and prioritize Extensions, they can also switch back and forth.

**Note**: "Spawn1" is the hardcoded spawn name.

# Installation

- Clone this repo, or simply copy/paste it!