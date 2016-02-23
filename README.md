# ScreepsJS Bot

ScreepsJS is my simple bot/AI built for the JavaScript-based MMO Strategy game Screeps.com.

Nothing fancy, but it's fine for up to RCL8 and (more-or-less) self-sufficient if enough number of Extensions are provided. 


# Features
This bot can:
- Renew or recreate creeps.
- Handle Walls, Ramparts, Towers, Links and Storage.
- Defend rooms and notify you of hostile presence.
- Provide many roles for different tasks.
- Run with many rooms and spawns. 


# Roles and Settings
Roles can be set by running Memory.creeps.Creepname.role="rolename"
Settings can be changed by altering creep memory. Syntax: Memory.creeps.Creepname.setting=value

- Builder: Builds structures and upgrades the controller.
	- waitmode: If set 1, Builder will not return to fill itself for upgrading, it will wait for a Carrier or an adjacent Link to provide energy.

- Miner: Stationary miner, harvests resource and hands it over to a Carrier.
	- target: place a flag at source, and set it as the same name of that flag. If empty, miner will choose on its own and Carriers will not come to take energy.
	- cstorage: If set 1, Miner will store energy in adjacent storage instead.

- Carrier: Carries energy from miners/storage to extension/spawn/tower/builder/link/storage.
	- target: energy source. "storage", "spawn" or same flag name as used by Miner.
	- jobs: an array of jobs to be carried by Carrier, in order. Example: [0,1,2,3,6]
		- 0: FILL, 1: EXTENSION, 2: SPAWN, 3: TOWER, 4: BUILDERS: 5: STORAGE, 6: LINK
		- job 6 will require properly set "linkpoints" memory entry in the same room.
	- job: current job as Integer.
	- Will move to any flag named CREEPNAME_MOVE.

- Custodian: Repairs roads, structures, ramparts and walls.
	- Requires properly set "wallhits" memory entry in the same room.

- Guard: Basic fighting role.

- Harvester: Basic mining role for new game, limited by single Spawn per room. Prefer Miner/Carriers over harvesters.

- Hauler: For now, simply goes to a flag, picks up dropped energy and stores it on a hard-coded room storage or upgrades the hard-coded controller.
	- target: Pickup target, give it the same name as the flag.
	- jobs: an array of jobs to be done by Hauler, in order. Example: [0,1]
		- 0: PICKUP, 1: STORE
	- job: current job as Integer.
- Claimer: Claims/Damages or -not yet- reserves a controller.
	- target: energy source. "storage", "spawn" or same flag name as used by Miner.
	- goto: flag name of the target controller to be claimed/reserved.
	- jobs: an array of jobs to be done by Claimer, in order. Example: [0,1,2]
		- 0: FILL, 1:CLAIM/DAMAGE 2: RESERVE (not yet implemented)
	- job: current job as Integer.


- Buildernew: Work-in-progress role to replace current Builder role. Better suited for room claiming for now.
- Upgrader: Obsolete role, replaced by Builders. It upgrades controllers and it's commented-out by default.


Room settings:
	- wallhits: Maximum hitpoint of Walls and Ramparts.
	- linkpoints: An array of Link coordinates to determine connections between them, in this order: [[FROM X],[FROM Y],[TO X],[TO Y]]

# Installation

- Clone this repo, or simply copy/paste it!