import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Button,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginForm, ErrorResponse } from "@/types/interface";
import type { AxiosError, AxiosResponse } from "axios";

export const LoginInfo = () => {
	const [formErrors, setFormErrors] = useState({});
	const [serverErrorMessage, setServerErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const schema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("メールアドレスを入力してください"),
		password: Yup.string()
			.required("パスワードを入力してください")
			.min(3, "文字数が不足しています"),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: LoginForm) => {
		try {
			// 最初の {name: string} は送信するデータの型を示し、AxiosResponse<{name: string}> はレスポンスの型
			const response = await axios.post<
				{ name: string },
				AxiosResponse<{ name: string }>
			>(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
				email: data.email,
				password: data.password,
			});
			const { name } = response.data;
			// ローカルストレージにユーザー名を保存
			localStorage.setItem("userName", name);
			router.push("/dashboard");
		} catch (error: unknown) {
			// unknown型のエラーに対して、それが実際にはAxiosError型であり、
			// 更にそのエラーレスポンスがErrorResponse型であることをTypeScriptに教える
			// これにより、error.responseが存在することが保証される。
			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<ErrorResponse>;
				if (serverError.response?.data) {
					setServerErrorMessage("入力情報が間違っています");
				}
			} else {
				console.error("予期せぬエラーが発生", error);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel htmlFor="email"/>
				<Input id="email" placeholder="Email" {...register("email")} />
				<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel htmlFor="password"/>
				<InputGroup>
					<Input
						id="password"
						placeholder="Password"
						type={showPassword ? "text" : "password"}
						{...register("password")}
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
				<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
			</FormControl>
			<Text mt={2} color="red.500">{serverErrorMessage}</Text>
			<button
				type="submit"
				className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg
          hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700"
			>
				Login
			</button>
		</form>
	);
};
