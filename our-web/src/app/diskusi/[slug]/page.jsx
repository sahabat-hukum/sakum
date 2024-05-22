"use client";
import Coment from "@/components/coment";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + `/api/post/` + params.slug,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="pt-20">
        <Navbar />
      </div>

      <div style={{ marginLeft: 250 }} className="h-screen mt-3 flex-col">
        <div>
          <div
            style={{ width: 1000 }}
            className="  bg-slate-100 border-b-4 border-slate-600 h-64 mt-20 px-5 pt-3 rounded-md sticky top-24   "
          >
            <p className="bg-blue-50 inline-block px-2 py-1 rounded-sm font-bold text-slate-700">
              {data.title}
            </p>
            <p className="mt-5 font-bold">{data.answers?.length} Comment</p>
            <button className="bg-blue-100 px-2 py-1 rounded-md hover:bg-blue-200">
              <p className="font-light">{data.vote} ❤</p>
            </button>

            <span className=""> {data.content}</span>

            <span className="font-light">
              <u>{data.user?.name}</u> <u> {data.createdAt}</u>{" "}
            </span>
          </div>
          <Coment id={data._id} />

          <div style={{ width: 1000 }} className="">
            <a href="#up">
              <div className="mt-16 text-blue-950 text-xl font-bold">
                Semua Komen
              </div>
            </a>

            {data.answers?.map((item, index) => {
              return (
                <>
                  <div className="px-2 py-4 mt-5 rounded-sm bg-slate-200">
                    <p className="font-bold bg-blue-200 text-slate-800 px-3 py-2 inline-block rounded-sm">
                      {data?.answersUser[index]?.name}
                      {/* {JSON.stringify(item)} */}
                    </p>
                    <p className="mt-5" style={{ whiteSpace: "pre-line" }}>
                      {item.content}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;