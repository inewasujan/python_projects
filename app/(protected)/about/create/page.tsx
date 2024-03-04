"use client";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { addAbout } from "@/actions/about";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading";
import { cn } from "@/lib/utils";

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

export default function AdminAbout() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { pending } = useFormStatus();

  return (
    <div className="w-full">
      <form
        ref={formRef}
        action={(data) =>
          addAbout(data).then(() => {
            toast.success("About created!");
            formRef.current?.reset();
            router.refresh();
          })
        }
      >
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="About us"
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Description</label>
          <textarea
            name="desc"
            className="border border-gray-300 rounded-lg mt-2 p-2 h-96"
            placeholder="Write something here."
            style={{
              whiteSpace: "preWrap",
            }}
          />
        </div>
        <div>
          <FormButton />
        </div>
      </form>
    </div>
  );
}
