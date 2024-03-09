"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import LoadingDots from "@/components/loading";
import { cn } from "@/lib/utils";
import { updateService, getSignedURL, getService } from "@/actions/services";

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

interface ServiceProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
}

export default function EditServices() {
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id")!;

  const [services, setServices] = useState(getService(id));

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
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
      } else {
        url = formData.image_url;
      }

      const formDataObj: FormData = new FormData();

      formDataObj.append("id", formData.id);
      formDataObj.append("title", formData.title);
      formDataObj.append("subtitle", formData.subtitle);
      formDataObj.append("description", formData.description);
      formDataObj.append("image_url", url);

      updateService(formDataObj);

      toast.success("Service Updated Successfully");
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

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    services.then((data: any) => {
      if (data) {
        setFormData({
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          image_url: data.image_url,
        });
      } else {
        console.log("No data found");
      }
    });
  }, []);

  return (
    <div className="w-full">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="Home Cleaning"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Sub title</label>
          <input
            type="text"
            name="subtitle"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="Keep it short in 5-6 words"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col my-10">
          <label>Description</label>
          <textarea
            name="description"
            className="border border-gray-300 rounded-lg mt-2 p-2 h-96"
            placeholder="Write something here..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image_url"
            className="border border-gray-300 rounded-lg mt-2 p-2"
            placeholder="Image"
            accept="image/svg+xml"
            onChange={handleFileChange}
          />
          <div className="mt-5">
            {!file ? (
              <div>
                Current image preview:{" "}
                <img src={formData.image_url} alt="preview" />
              </div>
            ) : (
              <div>Image Uploaded.</div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <FormButton />
        </div>
      </form>
    </div>
  );
}
