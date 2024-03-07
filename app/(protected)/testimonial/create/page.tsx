"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading";
import { cn } from "@/lib/utils";
import { createTestimonial, getSignedURL } from "@/actions/testimonial";
import Select from 'react-select';

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

export default function CreateTestimonials() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    testimony: "",
    image_url: "",
    stars: 1,
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleFileUpload = async (file: File) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
    });
    if (signedURLResult?.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }
    const { url } = signedURLResult?.success;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const fileUrl = url.split("?")[0];
    return fileUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url: string = "";

      if (file) {
        url = await handleFileUpload(file);

      }

      const formDataObj: FormData = new FormData();

      formDataObj.append("full_name", formData.full_name);
      formDataObj.append("title", formData.title);
      formDataObj.append("testimony", formData.testimony);
      formDataObj.append("image_url", url);
      formDataObj.append("stars", formData.stars.toString());

      createTestimonial(formDataObj);

      toast.success("Service created!");
    } catch (error) {
      console.error(error);
      toast.error("Service creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // const [selectedValue, setSelectedValue] = useState(formData.stars); 

  
  const handleChange = (event: any) => {
    // console.log("eeee", event.target.value)
    setFormData({ ...formData, [event.target.name]: event.target.value });
    
  };
  
  // const options = [
  //   { value: 1, label: "1" },
  //   { value: 2, label: "2" },
  //   { value: 3, label: "3" },
  // ];

  // const handleSelectChange = (e: any) => {
  //   console.log(e.value)
  //   const val = e.value
  //   // setSelectedValue(e.value)
  //   setFormData({ ...formData, stars: e});
  // }

  // const id = Date.now().toString();
	// const [isMounted, setIsMounted] = useState(false);

	// // Must be deleted once
	// // https://github.com/JedWatson/react-select/issues/5459 is fixed.
	// useEffect(() => setIsMounted(true), []);

  return (
    <div className="w-full">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex flex-col my-10">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="Tim Doe"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="CEO, Apple Inc"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Testimony</label>
          <textarea
            name="testimony"
            className="border border-gray-300 rounded-lg mt-2 p-2 h-52"
            placeholder="Write something here..."
            value={formData.testimony}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Image</label>
          <input
            type="file"
            name="image_url"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="Upload jpg, jpeg, png files only."
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Review Stars</label>
          <select 
            onChange={handleChange}
            name="stars"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            value={formData.stars}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
         
        </div>
        <div className="mt-10">
          <FormButton />
        </div>
      </form>
    </div>
  );
}
