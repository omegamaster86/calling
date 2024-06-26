import { useEffect, useState, useMemo } from "react";
import type { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import type { Company, KeyPerson } from "@/types/interface";
import useSWR from "swr";

interface AttackLogCompanyProps {
	onInputChange: (field: string, value: string) => void;
	errors: Record<string, string>;
}

interface InputFieldProps {
	label: string;
	name: string;
	id: string;
	type?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
}

const InputField: FC<InputFieldProps> = ({
	label,
	name,
	id,
	type = "text",
	value = "",
	onChange,
	errorMessage,
}) => {
	return (
		<div>
			<label className="text-sm font-semibold leading-6 text-sky-400">
				{label}
			</label>
			<div className="w-64 border-b-2">
				<input
					type={type}
					name={name}
					id={id}
					value={value}
					onChange={onChange}
					className="outline-none block rounded-md px-3.5 pt-2 text-gray-900 sm:text-sm sm:leading-6"
				/>
				{errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
			</div>
		</div>
	);
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const AttackLogCompany: FC<AttackLogCompanyProps> = ({
	onInputChange,
	errors,
}) => {
	const router = useRouter();
	const company = router.query.company as string | string[] | undefined;
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");

	const { data: companiesData, error: companiesError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/companies`,
		fetcher,
	);
	const { data: keyPersonsData, error: keyPersonsError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/key_persons`,
		fetcher,
	);

	if (companiesError || keyPersonsError)
		return <div>データの読み込みに失敗しました。</div>;

	const selectedCompany = useMemo(() => {
		if (!companiesData || !keyPersonsData) return null;

		const mergedData = companiesData.map((company: Company) => ({
			...company,
			keyPerson: keyPersonsData.find(
				(kp: KeyPerson) => kp.company_id?.toString() === company.id.toString(),
			),
		}));

		return mergedData.find((comp: Company) => comp.id.toString() === company);
	}, [companiesData, keyPersonsData, company]);

	useEffect(() => {
		if (!selectedCompany) return;

		setCompanyName(selectedCompany.company_name || "");
		setAddress(selectedCompany.address || "");
		setWebsite(selectedCompany.website || "");
		setTelephoneNumber(selectedCompany.telephone_number || "");

		// onInputChangeコールバックを利用して親コンポーネントに変更を伝える
		onInputChange("companyName", selectedCompany.company_name || "");
		onInputChange("address", selectedCompany.address || "");
		onInputChange("companyWebsite", selectedCompany.website || "");
		onInputChange("telephoneNumber", selectedCompany.telephone_number || "");
	}, [selectedCompany, onInputChange]);

	// 会社名、住所、会社サイト、登記電話番号の入力値を更新する関数
	const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCompanyName(e.target.value);
		onInputChange("companyName", e.target.value);
	};
	const handleAddressInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
		onInputChange("address", e.target.value);
	};
	const handleWebsiteInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setWebsite(e.target.value);
		onInputChange("companyWebsite", e.target.value);
	};
	const handleTelephoneNumberInputChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setTelephoneNumber(e.target.value);
		onInputChange("telephoneNumber", e.target.value);
	};

	return (
		<div>
			<h2 className="mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2">
				法人情報
			</h2>
			<div className="w-1/2 mx-9 mt-5 ">
				<div className="flex mx-auto">
					<InputField
						label="会社名"
						name="company-name"
						id="company-name"
						errorMessage={errors.companyName}
						value={companyName}
						onChange={handleNameInputChange}
					/>
					<div className="ml-12">
						<InputField
							label="住所"
							name="address"
							id="address"
							errorMessage={errors.address}
							value={address}
							onChange={handleAddressInputChange}
						/>
					</div>
				</div>
				<div className="flex mx-auto mt-8">
					<div>
						<InputField
							label="会社サイト"
							name="company-site"
							id="company-site"
							value={website}
							onChange={handleWebsiteInputChange}
						/>
					</div>
					<div className="ml-12">
						<InputField
							label="登記電話番号"
							name="telephone_number"
							id="telephone_number"
							errorMessage={errors.telephoneNumber}
							value={telephoneNumber}
							onChange={handleTelephoneNumberInputChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
