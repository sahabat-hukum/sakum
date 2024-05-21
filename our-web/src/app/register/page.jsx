import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import Link from "next/link";

const page = () => {
  const handleRegister = async (formData) => {
    "use server";
    try {
      const data = {
        nama: formData.get("nama"),
        reqInput: formData.get("reqInput"),
        password: formData.get("password"),
      };

      const response = await fetch("   ", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
    } catch (error) {
      console.log(error);
    }
    revalidatePath("/login");
    redirect("/login");
  };

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
            <form
              action={handleRegister}
              className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
            >
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Email/No.hp
                </label>
                <input
                  name="reqInput"
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  name="password"
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <button
                  type="button"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Register</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
             
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;