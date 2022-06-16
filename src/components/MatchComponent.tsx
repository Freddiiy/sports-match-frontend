import {IMatches, Team} from "../utils/types";
import {Box, Button, Center, HStack, Table, TableContainer, Text, VStack} from "@chakra-ui/react";

export default function MatchComponent({match}: { match: IMatches }) {
	return (
		<>
			<Box borderWidth={"1px"} borderColor={"black"} p={10} m={3} rounded={"2xl"} shadow={"xl"}>
				<Center pb={5}>
					<Text fontSize={"2xl"} fontWeight={"hairline"}>{match.matchName}</Text>
				</Center>
				<HStack justifyContent={"space-between"} spacing={20}>
					<VStack>
						{match.homeTeam?.map((team) => (
							<TeamBox team={team} />
						))}
						<Button size={"sm"}>Join team</Button>
					</VStack>
					<Text fontSize={"4xl"} fontWeight={"extrabold"}>VS</Text>
					<VStack>
						{match.awayTeam?.map((team) => (
							<TeamBox team={team} />
						))}
						<Button size={"sm"}>Join team</Button>
					</VStack>
				</HStack>
				<Center pt={5}>
					<Text fontSize={"xl"} fontWeight={"hairline"}>{match.location.address}, {match.location.city}</Text>
				</Center>
			</Box>
		</>
	)
}

function TeamBox({team}: { team: Team }) {
	return (
		<>
			<Text>{team.username}</Text>
		</>
	)
}