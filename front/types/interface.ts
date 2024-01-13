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
    companyName: string;
    address: string;
    telephoneNumber: string;
    companyWebsite: string;
  }

// CompanyRegister.tsxで使用
export interface CompanyResisterFormErrors {
    [key: string]: string;
  }

// keyperson.tsxで使用
export interface KeyPersonFormState {
  department: string;
  post: string;
  name: string;
  email: string;
}