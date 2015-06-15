// TreeChopper Plus mod by neo091
//https://github.com/neo091/ModPE-Script
// version 0.0.6

var axeIds = [258, 271, 275, 279, 286];
var woodId = 17;
var sapling = 6;
var plant = 1;

function newLevel()
{
	clientMessage(ChatColor.GOLD + "[TreeChopperPlus]" + ChatColor.WHITE + ":" + ChatColor.GREEN + " ON!");
	var tempPlant = ModPE.readData("plant");
	if(tempPlant != ""){
		plant = tempPlant;
		//clientMessage(ChatColor.GOLD + "[TreeChopperPlus]" + ChatColor.WHITE + ":Replant " + plant);
	}
}

function useItem(x,y,z,itemId,blockId,side) {
	//if item is a wood, stone, iron, gold or diamond axe then continue
	if(itemId == axeIds[0] || itemId == axeIds[1] || itemId == axeIds[2] || itemId == axeIds[3] || itemId == axeIds[4]) {
		if(blockId == woodId) { //check if original block touched was wood
			Level.destroyBlock(x, y, z, true); //destroys and drops original wood block
			for(var i = y+1;i < 128;i++) { //loop to look for wood blocks above original block (y+1 as original block has been destroyed at this point)
				if(getTile(x, i, z) == woodId) { //if the block is a wood block
					Level.destroyBlock(x, i, z, true); //destroys and drops wood block
				} else {
					break;
				}
			}

			placeSapling(x, y, z);
			
		}
		preventDefault();
	}
}

function procCmd(cmd)
{
	var data = cmd.split(" ");
	var command = data[0];
	switch(command)
	{
		case 'planton':
		{
			plant = 1;
			clientMessage(ChatColor.GOLD + "[TreeChopperPlus]" + ChatColor.WHITE + ": Replant " + ChatColor.GREEN + " ON!");
			break;
		}
		case 'plantoff':
		{
			plant = 0;
			clientMessage(ChatColor.GOLD + "[TreeChopperPlus]" + ChatColor.WHITE + ": Replant " + ChatColor.RED + " OFF!");
			break;
		}

	}
}

function placeSapling(x,y,z)
{
	if(plant == 1){
		setTile(x, y, z, sapling);
	}
	
}

function destroyBlock(x, y, z, side) {
	var tile = getTile(x, y, z);
	if(tile == woodId) { //check if original block touched was wood
		Level.destroyBlock(x, y, z, true); //destroys and drops original wood block
		for(var i = y+1;i < 128;i++) { //loop to look for wood blocks above original block (y+1 as original block has been destroyed at this point)
			if(getTile(x, i, z) == woodId) { //if the block is a wood block
				Level.destroyBlock(x, i, z, true); //destroys and drops wood block
			} else {
				break;
			}
		}
	}
}

function leaveGame()
{
	ModPE.saveData("plant", plant);
}
