"use server";

import { getAboutus } from "@/actions/about";
import Link from "next/link";

export default async function AboutList() {
  const data = await getAboutus();

  const desc = data?.description.split("\n");

  return (
    <div className="pb-40">
      <div className="flex flex-col w-full border border-gray-300 p-3 rounded-xl">
        <div>
          <div>
            <p className="italic text-xs mb-2">Title:</p>
            <p>{data?.title}</p>
          </div>
          <div className="pt-5">
            <p className="italic text-xs mb-2">Description: </p>
            {/* https://stackoverflow.com/questions/36260013/react-display-line-breaks-from-saved-textarea */}
            <span>
              {desc?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </span>
          </div>
        </div>
        {}
        <div className="pt-5 italic hover:text-blue-600 underline">
          <Link
            href={{
              pathname: `/about/edit`,
              query: { id: data?.id },
            }}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
