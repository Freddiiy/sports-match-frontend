import {Box, Container, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {Link, NavLink} from "react-router-dom";

export default function Header() {
	return (
		<Box bg={"white"} borderBottom={"1px"} borderBottomColor={"gray"} px={4} top={0} zIndex={"banner"} w={"100%"} py={2}>
			<Container maxWidth={"container.lg"}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={2} alignItems={"center"}>
						<Text fontWeight={"extrabold"} fontSize={"2xl"}>Sports app</Text>
					</HStack>
					<HStack justifyContent={"center"} as={"nav"} spacing={5}>
						<NavLink to={"/"}>
							<Text>Home</Text>
						</NavLink>
						<NavLink to={"/matches"}>
							<Text>Matches</Text>
						</NavLink>
						<NavLink to={"/players"}>
							<Text>Players</Text>
						</NavLink>
					</HStack>
					<Flex alignItems={"center"}>
						<HStack spacing={5}>
							<Link to={"/logout"}>
								<Text>Logout</Text>
							</Link>
						</HStack>
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}