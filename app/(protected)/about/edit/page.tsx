"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { updateAbout } from "@/actions/about";
import LoadingDots from "@/components/loading";
import { cn } from "@/lib/utils";
import { getUniqueAboutus } from "@/actions/about";

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "bg-neutral-800 transition-all border border-transparent text-white rounded-xl p-2 px-8",
        pending
          ? "border-gray-300 bg-gray-200 cursor-not-allowed"
          : "hover:bg-blue-600 active:bg-blue-700"
      )}
    >
      {pending ? <LoadingDots /> : <p>Submit</p>}
    </button>
  );
};

export default function AboutEdit() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id")!;

  const [data, setData] = useState(getUniqueAboutus(id));
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      data.then((data: any) => {
        setFormData({
          id: data.id,
          title: data.title,
          description: data.description,
        });
      });
    } else {
      console.log("no data found");
    }
  }, []);

  return (
    <div>
      <form
        className="w-full h-full"
        ref={formRef}
        action={(data) =>
          updateAbout(formData.id, data).then(() => {
            toast.success("Post updated!");
            formRef.current?.reset();
            router.refresh();
          })
        }
      >
        <div className="flex flex-col my-10">
          <input defaultValue={formData.id} hidden />
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="About us"
            defaultValue={formData?.title}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Description</label>
          <textarea
            name="desc"
            className="border border-gray-300 rounded-lg mt-2 p-2 h-96"
            placeholder="Write something here."
            defaultValue={formData?.description}
          />
        </div>
        <div>
          <FormButton />
        </div>
      </form>
    </div>
  );
}
