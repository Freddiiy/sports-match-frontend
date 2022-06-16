import {ChangeEvent, SyntheticEvent, useContext, useState} from "react";
import {Input, InputGroup} from "@chakra-ui/input";
import {Button} from "@chakra-ui/react";
import auth from "../auth/jwt";
import {useNavigate} from "react-router";

export default function Login() {
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
			return
		}

		auth.login(form.username, form.password)
			.then(() => {
				auth.getToken();
			})

	}

	return (
		<>
			<InputGroup size={"sm"} onSubmit={handleSubmit}>
				<Input placeholder={"Username"} name={"username"} onChange={handleChange} value={form.username}/>
				<Input placeholder={"Password"} name={"password"} onChange={handleChange} value={form.password}/>
				<Button type={"submit"} color={"blue"} onClick={handleSubmit}>Submit</Button>
			</InputGroup>
			<h1>{errorMsg}</h1>
		</>
	)
}