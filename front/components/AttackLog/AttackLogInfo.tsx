import * as yup from "yup";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Button, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import type { AttackLogFormState } from "@/types/interface";
import { AttackLogCompany } from "./AttackLogCompany";
import { AttackLogKeyPerson } from "./AttackLogKeyPerson";
import { AttackLogCallResult } from "./AttackLogCallResult";

interface AttackLogProps {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AttackLogInfo: FC<AttackLogProps> = () => {
	const router = useRouter();
	const companyId = router.query.company;
	const [isPostSuccess, setIsPostSuccess] = useState(false);
	const [isPostError, setIsPostError] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	const formSchema = yup.object().shape({
		companyName: yup
			.string()
			.required("記入漏れです")
			.min(1, "内容は1文字以上50文字以下で入力してください")
			.max(50, "内容は1文字以上50文字以下で入力してください"),
		address: yup
			.string()
			.required("記入漏れです")
			.min(1, "内容は1文字以上50文字以下で入力してください")
			.max(50, "内容は1文字以上50文字以下で入力してください"),
		telephoneNumber: yup
			.string()
			.required("記入漏れです")
			.matches(
				/^(\d{10,11}|\d{2,4}-\d{2,4}-\d{4})$/,
				"有効な形式で入力してください",
			), // 電話番号の形式を検証
		callingStart: yup.string().required("記入漏れです"),
		callResult: yup.string().required("記入漏れです"),
		salesman: yup.string().required("記入漏れです"),
		callContent: yup.string().required("記入漏れです"),
	});

	const [formState, setFormState] = useState<AttackLogFormState>({
		companyId: companyId as string,
		companyName: "",
		address: "",
		telephoneNumber: "",
		companyWebsite: "",
		department: "",
		post: "",
		name: "",
		number: "",
		email: "",
		note: "",
		callingStart: "",
		callResult: "",
		nextCallDay: "",
		salesman: "",
		callContent: "",
	});

	const handleInputChange = useCallback((field: string, value: string) => {
		// setFormState を使用して、formState ステートの該当するフィールドを更新
		setFormState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const companyId = router.query.company;

		try {
			await formSchema.validate(formState, { abortEarly: false });
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`,
				{
					company_id: companyId, // ここで `company_id` としてクエリパラメータの値を使用
					company: {
						company_name: formState.companyName,
						address: formState.address,
						telephone_number: formState.telephoneNumber,
						website: formState.companyWebsite,
					},
					key_person: {
						department: formState.department,
						post: formState.post,
						name: formState.name,
						email: formState.email,
						telephone_number: formState.number,
						note: formState.note,
					},
					attack_log: {
						calling_start: formState.callingStart,
						call_result: formState.callResult,
						next_call_day: formState.nextCallDay,
						salesman: formState.salesman,
						call_content: formState.callContent,
					},
				},
			);

			if (response.status === 201) {
				setIsPostSuccess(true);
				setIsPostError(false);
				router.reload();
			} else {
				setIsPostError(true);
				setIsPostSuccess(false);
			}
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				// reduce()関数を使用して、inner配列を走査し、
				// 各エラーオブジェクト（curr）からフィールド名（path）とエラーメッセージ（message）を抽出
				const errors = error.inner.reduce(
					(acc, curr) => {
						const key = curr.path || "unknown";
						acc[key] = curr.message; // `acc` オブジェクトの該当するキーにエラーメッセージを割り当てる。
						return acc; // 更新された `acc` を次の反復のために返す。
					},
					{} as Record<string, string>,
				); // 初期値として空のオブジェクトを渡す。
				setFormErrors(errors);
			} else {
				console.error("Validation failed", error);
			}
		}
	};

	useEffect(() => {
		if (isPostSuccess || isPostError) {
			setShowAlert(true);
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isPostSuccess, isPostError]);

	return (
		<div className="mt-5 mx-auto">
			<form onSubmit={handleSubmit}>
				<AttackLogCompany
					onInputChange={handleInputChange}
					errors={formErrors}
				/>
				<AttackLogKeyPerson
					onInputChange={handleInputChange}
					errors={formErrors}
				/>
				<AttackLogCallResult
					onInputChange={handleInputChange}
					errors={formErrors}
				/>
				<div className=" pl-24 w-64 pb-4">
					{isPostSuccess && showAlert && (
						<Stack spacing={3}>
							<Alert status="success">
								<AlertIcon />
								登録完了!
							</Alert>
						</Stack>
					)}
					{isPostError && showAlert && (
						<Stack spacing={3}>
							<Alert status="error">
								<AlertIcon />
								登録失敗。
							</Alert>
						</Stack>
					)}
				</div>
				<Button colorScheme="blue" type="submit" size="lg" ml="32">
					登録
				</Button>
			</form>
		</div>
	);
};
