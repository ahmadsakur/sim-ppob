import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";
import { Formik, Form } from "formik";
import { BiAt, BiLock, BiUser } from "react-icons/bi";
import * as Yup from "yup";
import TextInput from "@/components/input/TextInput";
import PasswordInput from "@/components/input/PasswordInput";
import { AuthService } from "@/services/api-service";

const AccountPage = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
  });

  const imageValidationSchema = Yup.object({
    file: Yup.mixed()
      .required("File is required")
      .test("fileSize", "File size is too large", (value: any) => {
        return !value || value.size <= 100 * 1024;
      })
      .test("fileType", "Invalid file type", (value: any) => {
        return !value || ["image/jpeg", "image/png"].includes(value.type);
      }),
  });

  const handleEditProfile = async (
    values: any,
    { setErrors, setSubmitting }: any
  ) => {
    try {
      setSubmitting(true);
      const response = await AuthService.updateProfile(values);
      console.log(response);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrors({ passwordConfirmation: errorMessage });
      } else {
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }

    const form = formRef.current;
    if (form) {
      form.submit();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleEditImage = async (
    values: any,
    { setErrors, setSubmitting }: any
  ) => {
    console.log(values);
  };

  return (
    <DashboardLayout>
      <div className="w-full md:w-1/2 py-8 mx-auto">
        <div className="flex flex-col items-center">
          <div className="py-4 mx-auto flex flex-col items-center justify-center gap-4">
            <Formik
              initialValues={{
                file: null,
              }}
              validationSchema={imageValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleEditImage(values, { setSubmitting });
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className="flex flex-col gap-8"
                  encType="multipart/form-data"
                  ref={formRef}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                  <div className="relative w-24 h-24 rounded-full">
                    <Image
                      fill={true}
                      src="/assets/images/profile.png"
                      alt="Profile Picture"
                      className="object-cover"
                    />
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 cursor-pointer"
                      onClick={handleButtonClick}
                    >
                      <MdEdit />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <h2 className="text-2xl font-bold text-center">Ahmad Sakur</h2>
          </div>
          <div className="w-full">
            <Formik
              initialValues={{
                email: "",
                first_name: "",
                last_name: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                handleEditProfile(values, { setSubmitting, setErrors });
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-8">
                  <TextInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="masukkan email anda"
                    icon={<BiAt />}
                  />
                  <TextInput
                    label="Nama Depan"
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="nama depan"
                    icon={<BiUser />}
                  />
                  <TextInput
                    label="Nama Belakang"
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="nama belakang"
                    icon={<BiUser />}
                  />

                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      type="submit"
                      className={`text-[#ff4d00] bg-white border-[#ff4d00] border rounded-sm py-2 text-sm font-medium ${
                        isSubmitting ? "cursor-wait opacity-50" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Edit Profil"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="w-full bg-[#ff4d00] text-white text-sm font-bold rounded-sm text-center mt-4 py-2">
            Logout
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;
