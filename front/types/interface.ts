export interface FormErrors {
	username?: string;
	email?: string;
	password?: string;
	password_confirmation?: string;
	server?: string;
}
  
export interface FormValues {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
}

// CompanyRegister.tsxで使用
export interface CompanyResisterFormState {
	companyName: string | null;
	industry: string | null;
	address: string | null;
	telephoneNumber: string | null;
	companyWebsite: string | null;
	department: string | null;
	post: string | null;
	name: string | null;
	email: string | null;
}

// CompanyRegister.tsxで使用
export interface CompanyResisterFormErrors {
  [key: string]: string;
}

export interface AttackLogFormErrors {
  [key: string]: string;
}

export interface AttackLogFormState {
  companyId: string | null;
  companyName: string | null;
  address: string | null;
  telephoneNumber: string | null;
  companyWebsite: string | null;
  department: string | null;
  post: string | null;
  name: string | null;
  number: string | null;
  email: string | null;
  note: string | null;
  callingStart: string | null;
  callResult: string | null;
  nextCallDay: string | null;
  salesman: string | null;
  callContent: string | null;
}

export interface Company {
  id?: number;
  company_name: string;
  industry: string;
  address: string;
  telephone_number: string;
  company_website: string;
}

export interface KeyPerson {
  company_id?: bigint;
  department: string;
  post: string;
  name: string;
  email: string;
  telephone_number: string;
  note: string;
}

export interface AttackLog {
  company_id?: bigint;
  calling_day: string;
  calling_start: string;
  call_result: string;
  call_content: string;
  next_call_day: string;
  salesman: string;
  created_at: string;
  updated_at: string;
}

export interface ExtendedCompany extends Company {
  latestSalesman?: string; // 最新の営業担当者名
  latestCallResult?: string; // 最新の架電結果
  nextCallDay?: string; // 次回予定日
}

export interface ExtendedCompanyWithKeyPerson extends Company {
  latestSalesman?: string;
  latestCallResult?: string;
  nextCallDay?: string;
  keyPerson?: KeyPerson; // KeyPerson をネスト
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}
