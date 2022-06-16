export interface IMatches {
	id:         number;
	matchName:  string;
	homeTeam:   Team[];
	awayTeam:   Team[];
	sportsType: string;
	inDoors:    boolean;
	location:   Location;
}

export interface ICreateMatch {
	matchName: string,
	sportsType: string,
	inDoors: boolean,
	location: {
		address: string,
		city: string,
	},
}

export interface Team {
	id:          number;
	username:    string;
	password:    string;
	roleList:    any[];
	homeMatches: any[];
	awayMatches: any[];
}

export interface Location {
	id:      number;
	address: string;
	city:    string;
}
