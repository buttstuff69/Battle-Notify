module.exports = [
	// Triple Nemesis
	{
		type: 'MissingDuringCombat',
		target: 'MyBoss',
		abnormalities: [27160, 28090, 1004],
		message: "Missing Triple Nemesis",
		rewarn_timeout: 10
	},

	// Energy Stars
	{
		type: 'MissingDuringCombat',
		target: 'Self',
		abnormalities: [801500, 801501, 801502, 801503, 801510, 801550],
		message: "Missing {icon}",
		rewarn_timeout: 10
	},

	// Shakan
	{
		type: 'MissingDuringCombat',
		target: 'Self',
		abnormalities: [805102, 805101],
		message: "Missing Shakan {icon}",
		rewarn_timeout: 10
	},	
	
	// Divine charge up soon
	{
		type: 'Expiring',
		skills: 280200,
		message: '{icon} cd {duration}',
		time_remaining: 5
	},
		
	// Edict
	{
		type: 'Expiring',
		skills: 430100,
		message: '{icon} cd {duration}',
		time_remaining: 5
	},
	
	//Immersion Reset 
	{
		type: 'Reset',
		skills: 370100, 
		message: '{icon} Reset'
	},
]
