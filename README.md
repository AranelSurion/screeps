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
Settings can be changed by altering creep memory. Syntax: Memory.creeps.Creepname.setting=value

- Builder: Builds structures and upgrades the controller.
	- waitmode: If set 1, Builder will not return to fill itself for upgrading, it will wait for a Carrier or an adjacent Link to provide energy.
- Miner: Stationary miner, harvests resource and hands it over to a Carrier.
	- cstorage: If set 1, Miner will store energy in adjacent storage instead.

- Carrier
- Custodian
- Guard
- Harvester
- Hauler
- Claimer

- Buildernew
- Custodiannew

- Upgrader


# Installation

- Clone this repo, or simply copy/paste it!