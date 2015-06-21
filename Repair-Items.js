/*
// Repair Tools mod by neo091
//https://github.com/neo091/ModPE-Script
// version 0.2
*/
Block.defineBlock(254,"Repair Table", [["mob_spawner",0],["crafting_table",0],["mob_spawner",0],["mob_spawner",0],["mob_spawner",0],["mob_spawner",0]],0,false);
Block.setDestroyTime(254,0.10);
Item.addShapedRecipe(254, 1, 0, ["sss", "s s", "sss"], ["s", 3, 0]);
Player.addItemCreativeInv(254, 1);

ModPE.setItem(459, "shovel", 4, "Get Repair Table");
Item.setCategory(459, 1);
Item.addShapedRecipe(459, 1, 0, ["sss", " f ", " f "], ["s", 3, 0, "f", 280, 0]);

var Tools = [256, 257, 258, 267, 292, 272, 273, 274, 275, 291, 268, 269, 270, 271, 290, 306, 307, 308, 309];
var RepairTable = 254;
var craftingtable = 58;
var IronBlock = 42,itemName,ironIngot = 265, woodId = 5, CobblestoneId = 4;
var repairIngots = 0, minDesgaste=0,repairWood = 0,repairCobblestone = 0;

var textview;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var simpleGUI;

function getIngots(ingots, repairWood, repairCobblestone) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
			try{
				if(textview != null) {
					textview.setText("Wood:" + repairWood +
						"\nCobblestone:" + repairCobblestone +
						"\nIron:" + ingots);
				}
			}catch(err){
				//print("Error: "+err); //will cause spam of dialogue boxes because of modTick
			}
		}}));
}
function newLevel(){
	clientMessage(ChatColor.GOLD + "[repair-tools]:" + ChatColor.GREEN + " Mod by Neo091 - ON");
	var getIngot = ModPE.readData("ingots");
	var getWoodN = ModPE.readData("woodCount");
	var getCobblestone = ModPE.readData("CobblestoneCount");

	if(getIngot != null || getWoodN != null || getCobblestone != null)
	{
		repairWood        = getWoodN;
		repairIngots      = getIngot;
		repairCobblestone = getCobblestone;
	}else{
		repairWood        = 0;
		repairCobblestone = 0;
		repairIngots      = 0;
	}

	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try{
			simpleGUI = new android.widget.PopupWindow();
			var layout = new android.widget.RelativeLayout(ctx);

			textview = new android.widget.TextView(ctx);
			textview.setTextColor(android.graphics.Color.WHITE);
			textview.setWidth(310);
			//textview.setBackgroundColor(android.graphics.Color.GREEN);


			getIngots(repairIngots, repairWood, repairCobblestone);

			layout.addView(textview);
			
			simpleGUI.setContentView(layout);
			simpleGUI.setWidth(310);
			simpleGUI.setHeight(100);
			simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 100, 0);
		
		}catch(err){
			print("Error: " + err);
		}
	} }));
}

function useItem(x,y,z,itemId,blockId,side){
	if(itemId == Tools[0] || itemId == Tools[1] 
		|| itemId == Tools[2] || itemId == Tools[3] || itemId == Tools[4] || itemId == Tools[5] || 
		itemId == Tools[6] || itemId == Tools[7] 
		|| itemId == Tools[8] || itemId == Tools[9] || itemId == Tools[10] || 
		itemId == Tools[11] || 
		itemId == Tools[12] || itemId == Tools[13] 
		|| itemId == Tools[14] || itemId == Tools[15] || itemId == Tools[16] || 
		itemId == Tools[17] || itemId == Tools[18]){
		if(blockId == RepairTable)
		{
			var pcid = Player.getCarriedItemData();
			var myItem = Player.getCarriedItem();

			if(pcid > 50)
			{
				if(removeIngot(myItem)){
					repairItem(myItem, pcid);
					clientMessage(getItemName(itemId) + " repair");
				}else{
					clientMessage("no tienes suficiente material");
				}
			}else{
				ModPE.showTipMessage("Aún no se puede reparar: " + getItemName(itemId));
			}
		}
	}

	if(itemId == ironIngot || itemId == CobblestoneId || itemId == woodId){
		if(blockId == RepairTable)
		{
			//clientMessage(itemId);
			addIngots(itemId);
			var maxDesgaste = Player.getCarriedItemCount();
			desgasteIngotSlot(maxDesgaste, itemId);
			preventDefault();
		}
	}

	if(blockId == craftingtable)
	{
		if(itemId == 459)
		{
			preventDefault();
			var maxDesgaste = Player.getCarriedItemCount();
			desgasteIngotSlot(maxDesgaste, itemId);
			Level.dropItem(x, y+1, z, 0, RepairTable, 1);
			Level.playSound(Player.getX(),Player.getY(),Player.getZ(),"random.burp", 30, 25);
		}
	}
}

function addIngots(iditem){
	if(iditem == ironIngot)
	{
		repairIngots++;
		getIngots(repairIngots, repairWood, repairCobblestone);
		ModPE.showTipMessage("AddIngot: " + repairIngots);

	}else if(iditem == woodId){
		repairWood++;
		getIngots(repairIngots, repairWood, repairCobblestone);
		ModPE.showTipMessage("AddWood: " + repairWood);
	}else if(iditem == CobblestoneId){

		repairCobblestone++;
		getIngots(repairIngots, repairWood, repairCobblestone);
		ModPE.showTipMessage("AddCobblestone: " + repairCobblestone);
	}
	//clientMessage(iditem);
}

function removeIngot(myItem){
	
	if(myItem == 256 || myItem == 257 || myItem == 258 || myItem == 267 || myItem == 292 || myItem == 306 || myItem == 307 || myItem == 308 || myItem == 309)
	{
		//Iron
		if(repairIngots == 0){
			repairIngots=0;
			return false;
		}else{
			repairIngots--;
			return true;
		}
	}else if(myItem == 272 || myItem == 273 || myItem == 274 || myItem == 275 || myItem == 291){
		//Stone
		if(repairCobblestone == 0){
			repairCobblestone=0;
			return false;
		}else{
			repairCobblestone--;
			return true;
		}
	}else if(myItem == 268 || myItem == 269 || myItem == 270 || myItem == 271 || myItem == 290){
		//Wood
		if(repairWood == 0){
			repairWood=0;
			return false;
		}else{
			repairWood--;
			return true;
		}
	}else{
		return false;
	}
	getIngots(repairIngots, repairWood, repairCobblestone);
	
}

function desgasteIngotSlot(maxDesgaste, id){
	var pcid = 0;
	if(maxDesgaste == 0){
		Level.playSound(Player.getX(),Player.getY(),Player.getZ(),"random.break", 3);
	}
	if(pcid != maxDesgaste){
		maxDesgaste--;
		Entity.setCarriedItem(getPlayerEnt(), id, maxDesgaste, 1);
		//clientMessage("Descaste: " + maxDesgaste + " count: " + pcid);
	}
}
function getItemName(itemId){
	var myItem = itemId.toString();
	var myItemName = {'256':'Iron Shovel','257':'Iron Pickaxe','258':'Iron Axe','267':'Iron Sword','292':'Iron Hoe',
	'272':'Stone Sword','273':'Stone Shovel','274':'Stone Pickaxe','275':'Stone Axe','291':'Stone Hoe',
	'268':'Wooden Sword', '269':'Wooden Shovel','270':'Wooden Pickaxe','271':'Wooden Axe','290':'Wooden Hoe',
	'306':'Iron Helmet','307':'Iron Chestplate','308':'Iron Leggings','309':'Iron Boots'};

	var itemName = myItemName[myItem];
	//clientMessage(itemName + " ITEM: " + myItem);
	if(itemName != null)
	{
		return itemName;
	}
}

function repairItem(id, minDesgaste){
	var item = Player.getCarriedItem();

	if(item == id){
		if(minDesgaste > 50)
		{

			Entity.setCarriedItem(getPlayerEnt(), id, 0, 0);
			Player.addItemInventory(item, 1, 0);
		}
	}
	//clientMessage("Item: " + item + " myItem: " + id);
}

function leaveGame(){
	if(ctx!=null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
			try{
				if(simpleGUI != null) {
					simpleGUI.dismiss();
					simpleGUI = null;
				}
			}catch(err){
				print("Error: "+err);
			}
		}}));
	}

	ModPE.saveData("woodCount", repairWood);
	ModPE.saveData("CobblestoneCount", repairCobblestone);
	ModPE.saveData("ingots", repairIngots);
	repairCobblestone = 0;
	repairIngots      = 0;
	repairWood        = 0;
}

function destroyBlock(x, y, z, side){
	if(Level.getTile(x, y, z) == RepairTable){
		Level.destroyBlock(x, y, z, false);
		Level.dropItem(x, y, z, 0, RepairTable, 1);
	}
}
