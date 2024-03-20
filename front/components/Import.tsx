import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

export const ImportButton = () => {
	const [isPostSuccess, setIsPostSuccess] = useState(false);
	const [isPostError, setIsPostError] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name);
		} else {
			setFileName("");
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) {
			alert("ファイルを選択してください");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/spreadsheets/import`, {
			method: "POST",
			body: formData,
		}).then((response) => {
			if (response.ok) {
				setIsPostSuccess(true);
				setIsPostError(false);
			} else {
				setIsPostSuccess(false);
				setIsPostError(true);
			}
		});
		setShowAlert(true);
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
		<form className="mt-6" onSubmit={handleSubmit}>
			<input
				type="file"
				onChange={handleFileChange}
				style={{ display: "none" }}
				ref={fileInputRef}
			/>
			{/* カスタムスタイルのボタン */}
			<div className="flex">
				<button
					type="button"
					className="font-bold text-white bg-sky-600 py-2 px-2 mt-5 rounded-lg"
					onClick={() => fileInputRef.current?.click()}
				>
					ファイルを選択
				</button>
				<div className="font-bold text-sky-600 py-2 mt-5 ml-3 rounded-lg">
					{fileName}
				</div>
			</div>
			<div className="pt-3 w-48 rounded-lg">
				{isPostSuccess && showAlert && (
					<Stack spacing={3}>
						<Alert status="success">
							<AlertIcon />
							インポート完了!
						</Alert>
					</Stack>
				)}
				{isPostError && showAlert && (
					<Stack spacing={3}>
						<Alert status="error">
							<AlertIcon />
							インポート失敗。
						</Alert>
					</Stack>
				)}
			</div>
			<button
				type="submit"
				className="font-bold text-white bg-sky-600 py-2 px-2 mt-5 rounded-lg mb-4"
			>
				選択したfileからインポート
			</button>
		</form>
	);
};
