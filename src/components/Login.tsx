import {ChangeEvent, SyntheticEvent, useContext, useState} from "react";
import {Input, InputGroup} from "@chakra-ui/input";
import {Box, Button, Center, HStack, Text, VStack} from "@chakra-ui/react";
import auth from "../auth/jwt";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export default function Login() {
	let navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("")
	const [form, setForm] = useState({
		username: "",
		password: "",
	})

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setForm({
			...form,
			[event.target.name]: value,
		});
	}


	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault()
		if (form.username === "" || form.password === "") {
			setErrorMsg("Error with form")
		}

		auth.login(form.username, form.password)
			.then(() => {
				auth.getToken();
				navigate("/", {replace: true})
			})

	}

	return (
		<>
			<Center>
				<Box borderWidth={"1px"} borderColor={"black"} p={10} m={3} rounded={"2xl"} shadow={"xl"}>
					<Text fontSize={"2xl"} mb={4}>Log ind</Text>
					<InputGroup size={"sm"} onSubmit={handleSubmit}>
						<VStack>
							<Input placeholder={"Username"} name={"username"} onChange={handleChange}
								   value={form.username}/>
							<Input placeholder={"Password"} name={"password"} onChange={handleChange}
								   value={form.password}/>
							<HStack>

								<Text>Ingen konto?</Text><Link to={"/register"}><Text>Registrer her!</Text></Link>
							</HStack>
							<Button width={"full"} type={"submit"} color={"black"}
									onClick={handleSubmit}>Submit</Button>
						</VStack>
					</InputGroup>
					<h1>{errorMsg}</h1>
				</Box>
			</Center>
		</>
	)
}