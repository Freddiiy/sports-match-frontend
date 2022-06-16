import {Box, Center, Text} from "@chakra-ui/react";
import auth from "../auth/jwt";

export default function Home() {
	return (
		<>
			<Box >
				<Center>
					<Text fontSize={"4xl"} fontWeight={"hairline"}>Welcome {auth.getName()} as {auth.getRoles()}</Text>
				</Center>
			</Box>
		</>
	)
}