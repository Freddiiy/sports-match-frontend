import {ChangeEvent, useContext, useEffect, useState} from "react";
import axios from "axios";
import auth, {URL} from "../auth/jwt";
import {ICreateMatch, IMatches} from "../utils/types";
import {
	Box,
	Button,
	Center, Checkbox,
	Flex,
	HStack,
	IconButton,
	Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
	Tooltip,
	useDisclosure,
	UseDisclosureProps,
	VStack,
	Text, SimpleGrid,
} from "@chakra-ui/react";
import MatchComponent from "../components/MatchComponent";
import {AddIcon} from "@chakra-ui/icons";
import {Input, InputGroup} from "@chakra-ui/input";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useNavigate} from "react-router";

export default function Matches() {
	const [matches, setMatches] = useState<IMatches[]>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate()
	const [modalError, setModalError] = useState("");
	const [form, setForm] = useState({
		matchName: "",
		sportsType: "",
		inDoors: false,
		address: "",
		city: "",
	});

	useEffect(() => {
		async function fetchMatches() {
			const response = await axios.get<IMatches[]>(URL + "/api/matches")
			const data = await response.data;
			setMatches(data);
		}

		fetchMatches()
	})

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setForm({
			...form,
			[event.target.name]: value,
		})
	}

	function handleCheck(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.checked;
		setForm({
			...form,
			[event.target.name]: value,
		})
	}

	function handleSubmit() {
		const data: ICreateMatch = {
			matchName: form.matchName,
			sportsType: form.sportsType,
			inDoors: form.inDoors,
			location: {
				address: form.address,
				city: form.city
			}
		}
		auth.createMatch(data)
			.then(() => navigate("/matches"));
	}

	return (
		<>
			<Center>
				<Box mt={2}>
					<HStack>
						<HStack>
							<Input borderWidth={"1px"} borderColor={"black"} variant={"filled"} colorScheme={"gray"}/>
						</HStack>
						<Tooltip label={"Create match"} rounded={"xl"}>
							<IconButton color={"white"} colorScheme={"green"} rounded={"full"} aria-label={"Add match"}
										icon={<AddIcon/>} onClick={onOpen}/>
						</Tooltip>
					</HStack>
				</Box>
			</Center>
			<Center>
				<SimpleGrid>
					{matches?.map((match, key) => (
						<MatchComponent key={key} match={match}/>
					))}
				</SimpleGrid>
			</Center>

			<Center>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent borderWidth={"1px"} borderColor={"black"}>
						<ModalHeader>Create match</ModalHeader>
						<ModalCloseButton />
						<ModalBody>

							<InputGroup>
							<VStack py={5} alignItems={"flex-start"}>
								<Input placeholder={"Kampnavn"} name={"matchName"} onChange={handleChange}
									   value={form.matchName} required/>
								<Input placeholder={"Sportsgr??n"} name={"sportsType"} onChange={handleChange}
									   value={form.sportsType} required/>
								<HStack>
									<Input placeholder={"Adresse"} name={"address"} onChange={handleChange}
										   value={form.address} required/>
									<Input placeholder={"By"} name={"city"} onChange={handleChange}
										   value={form.city} required/>
								</HStack>
								<HStack>
									<Checkbox size={"lg"} colorScheme={"gray"} name={"inDoors"}
											  isChecked={form.inDoors} onChange={handleCheck}/>
									<Text>Udend??rs</Text>
								</HStack>
							</VStack>
							</InputGroup>
							<Button my={5} width={"full"} colorScheme={"green"} onClick={handleSubmit}>Tilf??j</Button>
							<Text color={"red"} fontSize={"2xl"}>{modalError}</Text>
						</ModalBody>
					</ModalContent>

				</Modal>
			</Center>
		</>
	)
}


