module.exports = [
	// Missing stance
	{
		type: 'MissingDuringCombat',
		target: 'Self',
		abnormalities: [100100, 100101, 100102, 100103, 100200, 100201, 100202, 100203],
		message: 'Missing Stance',
		rewarn_timeout: 10
	},


	// Blade Draw Reset
	{
		type: 'Reset',
		skills: [290100, 370100], // normal & deadly gamble version of blade draw
		message: '{icon} Reset'
	},
	
		//Traverse buff expiring
	{
        type: 'Expiring',
		target: 'Self',
        abnormalities: [101300,101301], 
        message: '{icon}T-cut {duration} ',
		time_remaining: [2, 5, 8]
    },
	
/*		//dg expiring
	{
        type: 'Expiring',
		skills: 200100
        abnormalities: [100800,100801], 
        message: '{icon} up in {duration} ',
		time_remaining: [16, 5]
    },

/*
	// Vergos Aggro Debuff
   {
		type: 'AddedOrRefreshed',
		target: 'PartyIncludingSelf',
		abnormalities: 950023,
		message: '{name} has {stacks} stack(s)',
		required_stacks: 1
	},

	// Vergos Aggro Debuff Expire
   {
		type: 'Removed',
		target: 'PartyIncludingSelf',
		abnormalities: 950023,
		message: '{name}\'s stacks expired'
	},
*/

		// endurance debuff
	{
		type: 'MissingDuringCombat',
		target: 'MyBoss',
		abnormalities: [200302, 101200, 101210, 10153140, 10153142],
		message: 'COMBATIVE RETARD',
		rewarn_timeout: 3
	},

]
