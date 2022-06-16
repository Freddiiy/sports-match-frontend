import {IMatches, Team} from "../utils/types";
import {Box, Button, Center, HStack, Table, TableContainer, Text, VStack} from "@chakra-ui/react";
import auth from "../auth/jwt";
import {useNavigate} from "react-router";

export default function MatchComponent({match}: { match: IMatches }) {

	const navigate = useNavigate()

	function handleAddToHome() {
		auth.addPlayerToHomeTeam(auth.getName(), match.id)
	}

	function handleAddToAway() {
		auth.addPlayerToAwayTeam(auth.getName(), match.id)
	}
	return (
		<>
			<Box borderWidth={"1px"} borderColor={"black"} p={10} m={3} rounded={"2xl"} shadow={"xl"}>
				<Center pb={5}>
					<Text fontSize={"2xl"} fontWeight={"hairline"}>{match.matchName}</Text>
				</Center>
				<HStack justifyContent={"space-between"} spacing={20}>
					<VStack>
						<Text>Hjemmehold</Text>
						{match.homeTeam?.map((team) => (
							<TeamBox team={team} />
						))}
						<Button size={"sm"} onClick={handleAddToHome}>Join home</Button>
					</VStack>
					<Text fontSize={"4xl"} fontWeight={"extrabold"}>VS</Text>
					<VStack>
						<Text>Udehold</Text>
						{match.awayTeam?.map((team) => (
							<TeamBox team={team} />
						))}
						<Button size={"sm"} onClick={handleAddToAway}>Join team</Button>
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