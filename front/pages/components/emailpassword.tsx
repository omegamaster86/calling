// import React, { useState } from 'react';
// import {
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
//   VStack,
//   Button,
//   InputGroup,
//   InputRightElement,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { FormErrors, FormValues } from '../../types/interface';
// import * as Yup from 'yup'

// export const EmailPassword = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [show, setShow] = useState(false);
//   const router = useRouter();

//   // const validate = (values: FormValues):FormErrors => {
//   //   const errors = {};
//   //   if (!values.username) errors.username = 'Required';
//   //   if (!values.email) {
//   //     errors.email = 'Required';
//   //   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//   //     errors.email = 'Invalid email address';
//   //   }
//   //   if (!values.password) {
//   //     errors.password = 'Required';
//   //   } else if (values.password.length < 3) {
//   //     errors.password = 'Password must be at least 8 characters';
//   //   }
//   //   if (!values.confirmpassword) {
//   //     errors.confirmpassword = 'Required';
//   //   } else if (values.password !== values.confirmpassword) {
//   //     errors.confirmpassword = 'Passwords do not match';
//   //   }
//   //   return errors;
//   // };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e:React.FormEvent) => {
//     e.preventDefault();
//     // const newErrors = validate(formData);
//     // if (Object.keys(newErrors).length === 0) {
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//           user: formData,
//         });
//         router.push('/login');
//       } catch (error) {
//         setErrors({ server: error.response.data.message });
//       }
//     // } else {
//     //   setErrors(newErrors);
//     // }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <VStack spacing={4} align="flex-start">
//         {/* Username Field */}
//         <FormControl isInvalid={errors.name}>
//           <FormLabel htmlFor="name"></FormLabel>
//           <Input
//             id="name"
//             name="username"
//             type="text"
//             placeholder="name"
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <FormErrorMessage>{errors.name}</FormErrorMessage>
//         </FormControl>
//         {/* Email Field */}
//         <FormControl isInvalid={errors.email}>
//           <FormLabel htmlFor="email"></FormLabel>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="Email"
//             onChange={handleChange}
//             value={formData.email}
//           />
//           <FormErrorMessage>{errors.email}</FormErrorMessage>
//         </FormControl>
//         {/* Password Field */}
//         <FormControl isInvalid={errors.password}>
//           <FormLabel htmlFor="password"></FormLabel>
//           <InputGroup size="md">
//             <Input
//               id="password"
//               name="password"
//               type={show ? 'text' : 'password'}
//               placeholder="Password"
//               onChange={handleChange}
//               value={formData.password}
//             />
//             <InputRightElement width="4.5rem">
//               <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
//                 {show ? 'Hide' : 'Show'}
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//           <FormErrorMessage>{errors.password}</FormErrorMessage>
//         </FormControl>
//         {/* Confirm Password Field */}
//         <FormControl isInvalid={errors.password_confirmation}>
//           <FormLabel htmlFor="password_confirmation"></FormLabel>
//           <InputGroup size="md">
//             <Input
//               id="password_confirmation"
//               name="password_confirmation"
//               type={show ? 'text' : 'password'}
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               value={formData.password_confirmation}
//             />
//             <InputRightElement width="4.5rem">
//               <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
//                 {show ? 'Hide' : 'Show'}
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//           <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
//         </FormControl>
//         {/* Server-side Error Message */}
//         {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
//           <div className=" flex flex-col gap-5 w-72">
//             <div className="input-button">
//                 <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg
//                   hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700">
//                     Register
//                 </button>
//             </div>
//           </div>
//       </VStack>
//     </form>
//   );
// };
