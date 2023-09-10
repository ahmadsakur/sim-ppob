import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";
import { Formik, Form } from "formik";
import { BiAt, BiLock, BiUser } from "react-icons/bi";
import * as Yup from "yup";
import TextInput from "@/components/input/TextInput";
import { AuthService } from "@/services/api-service";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import { User } from "@/store/auth/authSlice";
import { fetchUser, updateUser } from "@/store/auth/authThunks";
import { updateProfileType } from "@/types/api/auth";

const AccountPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [profileData, setProfileData] = useState<User>();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
  });

  const handleEditProfile = async (
    updatePayload: any,
    { setErrors, setSubmitting }: any
  ) => {
    const token = sessionStorage.getItem("token");

    try {
      setSubmitting(true);
      const response = await dispatch(updateUser({updatePayload, token}));
      setProfileData(response.payload);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrors({ passwordConfirmation: errorMessage });
      } else {
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getProfile = async () => {
      const res = await dispatch(fetchUser(token));
      if (res.payload) {
        setProfileData(res.payload);
      }
    };
    getProfile();
  }, []);

  return (
    <DashboardLayout>
      {isModalOpen && (
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      <div className="w-full md:w-1/2 py-8 mx-auto">
        <div className="flex flex-col items-center">
          <div className="py-4 mx-auto flex flex-col items-center justify-center gap-4">
            <div className="relative w-24 h-24 rounded-full">
              <Image
                fill={true}
                src="/assets/images/profile.png"
                alt="Profile Picture"
                className="object-cover"
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 cursor-pointer"
                onClick={() => {
                  alert("sorry, this feature is not implemented yet :(");
                }}
              >
                <MdEdit />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">{`${profileData?.first_name} ${profileData?.last_name}`}</h2>
          </div>
          <div className="w-full">
            {profileData && (
              <Formik
                initialValues={{
                  email: profileData.email,
                  first_name: profileData.first_name,
                  last_name: profileData.last_name,
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
            )}
          </div>
          <div
            className="w-full bg-[#ff4d00] text-white text-sm font-bold rounded-sm text-center mt-4 py-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;
