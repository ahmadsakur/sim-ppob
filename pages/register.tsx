import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { BiAt, BiLock, BiUser } from "react-icons/bi";
import TextInput from "@/components/input/TextInput";
import PasswordInput from "@/components/input/PasswordInput";
import { AuthService } from "@/services/api-service";
import { useRouter } from "next/router";
import Head from "next/head";

const RegisterPage = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string().required("Name is required"),
    last_name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required").min(8),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleRegister = async (
    values: any,
    { setErrors, setSubmitting }: any
  ) => {
    try {
      setSubmitting(true);
      const response = await AuthService.register(values);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrors({ password_confirmation: errorMessage });
      } else {
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>SIM PPOB - Ahmad Sakur</title>
      </Head>
      <div className="max-w-7xl mx-auto min-h-screen h-full bg-white text-black">
        <div className="flex items-center h-full w-full">
          <div className="bg-white w-full md:w-1/2 h-full mx-auto flex flex-col justify-center items-center min-h-screen px-4 md:px-6 lg:px-8 py-8">
            {isSuccess && (
              <div>
                <div className="bg-emerald-400 rounded-md text-sm text-white px-4 py-2 mx-auto my-4">
                  <h1>Registrasi Berhasil</h1>
                </div>
                <p>anda akan diredirect untuk login</p>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <div className="aspect-square">
                <Image
                  src="/assets/icons/main-logo.png"
                  width={30}
                  height={30}
                  alt="SIM-PPOB Logo"
                />
              </div>
              <h1 className="text-2xl font-bold">SIMS PPOB</h1>
            </div>
            <div className="max-w-xl md:max-w-xs text-2xl font-bold text-gray-800 text-center py-8">
              Lengkapi data untuk membuat akun
            </div>
            <div className="w-full lg:w-2/3 mx-auto">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  first_name: "",
                  last_name: "",
                  password_confirmation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  handleRegister(values, { setSubmitting, setErrors });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-8">
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="masukkan email anda"
                      icon={<BiAt />}
                    />
                    <TextInput
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="nama depan"
                      icon={<BiUser />}
                    />
                    <TextInput
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="nama belakang"
                      icon={<BiUser />}
                    />
                    <PasswordInput
                      id="password"
                      name="password"
                      placeholder="buat password"
                      icon={<BiLock />}
                    />
                    <PasswordInput
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="konfirmasi password"
                      icon={<BiLock />}
                    />
                    <div className="flex flex-col gap-2 mt-4">
                      <button
                        type="submit"
                        className={`bg-[#ff4d00] text-white rounded-sm py-3 text-sm font-medium ${
                          isSubmitting ? "cursor-wait opacity-50" : ""
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Loading..." : "Registrasi"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <p className="text-gray-500 text-sm py-4 text-center mx-auto">
                sudah punya akun ? login{" "}
                <Link href={"/login"} className="text-[#ff4d00] font-medium">
                  di sini.
                </Link>
              </p>
            </div>
          </div>
          <div
            className="bg-[#fff1f0] hidden md:w-1/2 md:block min-h-screen relative bg-top bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/images/login-illustration.png')",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
