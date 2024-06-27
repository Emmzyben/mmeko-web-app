"use client";
import Link from 'next/link';
import { categoryList } from "@/constants/categories";
import { useEffect, useState } from "react";
import useCreateHost from "../hooks/useCreateHost";
import { useUser } from "../context/user";
import { useRouter } from "next/navigation";
import { UploadError } from "../types";
import { Client, Storage } from "appwrite";
import "../components/style.css";
import { duration } from 'moment';

export default function CreateHost() {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 dark:text-white";


  const client = new Client();
  client
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
  .setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));

  const storage = new Storage(client);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    name: "",
    age: 0,
    bodyType: "",
    smoke: "",
    drink: "",
    interestedIn: "",
    height: "",
    weight: "",
    location: "",
    Duration:"",
  });

  const handleChange = (e) => {
    const value = e.target.name === "price" || e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };
  
  

  const contextUser = useUser();
  const router = useRouter();

  const [fileDisplays, setFileDisplays] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!contextUser?.user) router.push("/models");
  }, [contextUser, router]);

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const newUrls: string[] = [];
    const newFileDisplays: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const response = await storage.createFile(
          String(process.env.NEXT_PUBLIC_BUCKET_ID_HOST),
          'unique()', // Replace 'unique()' with a unique identifier if necessary
          file
        );
        const fileId = response.$id;
        const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_URL}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID_HOST}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_ENDPOINT}`;
        newUrls.push(fileUrl);
        newFileDisplays.push(fileUrl);
      } catch (error) {
        console.error("Error uploading file to Appwrite:", error);
        alert("File upload failed. Please try again.");
      }
    }

    setUrls((prevUrls) => [...prevUrls, ...newUrls]);
    setFileDisplays((prevFileDisplays) => [...prevFileDisplays, ...newFileDisplays]);
  };

  const validate = () => {
    setError(null);
    let isError = false;

    if (!urls) {
      setError({ type: "File", message: "A picture is required" });
      isError = true;
    } else if (!data.title) {
      setError({ type: "caption", message: "A title is required" });
      isError = true;
    } else if (!data.category) {
      setError({ type: "categories", message: "A category is required" });
      isError = true;
    } else if (!data.description) {
      setError({ type: "description", message: "A description is required" });
      isError = true;
    } else if (!data.name) {
      setError({ type: "name", message: "A name is required" });
      isError = true;
    } else if (!data.location) {
      setError({ type: "location", message: "A location is required" });
      isError = true;
    } else if (!data.age) {
      setError({ type: "age", message: "An age is required" });
      isError = true;
    } else if (!data.bodyType) {
      setError({ type: "bodyType", message: "A body type is required" });
      isError = true;
    } else if (!data.smoke) {
      setError({ type: "smoke", message: "A smoke preference is required" });
      isError = true;
    } else if (!data.drink) {
      setError({ type: "drink", message: "A drink preference is required" });
      isError = true;
    } else if (!data.interestedIn) {
      setError({ type: "interestedIn", message: "An interest preference is required" });
      isError = true;
    } else if (!data.height) {
      setError({ type: "height", message: "A height is required" });
      isError = true;
    } else if (!data.weight) {
      setError({ type: "weight", message: "A weight is required" });
      isError = true;
    } else if (!data.price) {
      setError({ type: "price", message: "A price is required" });
      isError = true;
    }else if (!data.Duration) {
      setError({ type: " Duration", message: "A  Duration is required" });
      isError = true;
    }

    return isError;
  };

  const createNewHost = async () => {
    let isError = validate();
    if (isError) return;
    if (!urls || !contextUser?.user) return;
    setIsUploading(true);

    try {
      await useCreateHost(
        urls,
        contextUser?.user?.id,
        data.title,
        data.description,
        data.category,
        data.price,
        data.name,
        data.location,
        data.age,
        data.bodyType,
        data.smoke,
        data.drink,
        data.interestedIn,
        data.height,
        data.weight,
        data.Duration,
      );
      alert("Posting successful!");
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      alert(error);
    }
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0" style={{ padding: "30px" }}>
      <h1 className="text-gray-900 mb-5" id="top1">
        Create a new Gig
      </h1>
      <h3 className="text-gray-900 mb-5" id="top2">
        Enter the details to create the gig
      </h3>
      <form className="flex flex-col gap-5 mt-10">
        <div id="host">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Title
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              id="title"
              className={inputClassName}
              placeholder="e.g. I will do something I'm really good at"
              required
            />
          </div>
          <div>
            <label htmlFor="categories" className={labelClassName}>
              Select a Category
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              defaultValue="Choose a Category"
            >
              {categoryList.map(({ label }) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClassName}>
            Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div id="host">
          <div>
            <label htmlFor="name" className={labelClassName}>
              Name
            </label>
            <input
              type="text"
              className={inputClassName}
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="name"
            />
          </div>
          <div>
            <label htmlFor="age" className={labelClassName}>
              Age
            </label>
            <input
              type="number"
              id="age"
              className={inputClassName}
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location" className={labelClassName}>
              Location
            </label>
            <input
              type="text"
              id="location"
              className={inputClassName}
              placeholder="Enter your Location"
              name="location"
              value={data.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bodyType" className={labelClassName}>
              Body Type
            </label>
            <select
              className={`${inputClassName} w-1/5`}
              id="bodyType"
              name="bodyType"
              value={data.bodyType}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="slim">Slim</option>
              <option value="plump">Plump</option>
              <option value="Plus size">Plus size</option>
              <option value="petite">Petite</option>
            </select>
          </div>
          <div>
            <label htmlFor="smoke" className={labelClassName}>
              Do you Smoke?
            </label>
            <select
              className={`${inputClassName} w-1/5`}
              id="smoke"
              name="smoke"
              value={data.smoke}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="drink" className={labelClassName}>
              Do you Drink?
            </label>
            <select
              className={`${inputClassName} w-1/5`}
              id="drink"
              name="drink"
              value={data.drink}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="interestedIn" className={labelClassName}>
              Interested In
            </label>
            <select
              className={`${inputClassName} w-1/5`}
              id="interestedIn"
              name="interestedIn"
              value={data.interestedIn}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="Men">Men</option>
              <option value="women">Women</option>
              <option value="Men and Women">Men and Women</option>
              <option value="Couples">Couples</option>
              <option value="Trans">Trans</option>
              <option value="Men,Women,Couples and Trans">All</option>
            </select>
          </div>

          <div>
            <label htmlFor="height" className={labelClassName}>
              Height
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="height"
                className={inputClassName}
                placeholder="height"
                name="height"
                value={data.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="weight" className={labelClassName}>
              Weight
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="weight"
                className={inputClassName}
                placeholder="weight"
                name="weight"
                value={data.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className={labelClassName}>
              Price ( $ )
            </label>
            <input
              type="number"
              className={`${inputClassName} w-1/5`}
              id="price"
              placeholder="Enter a price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Duration" className={labelClassName}>
               Duration
            </label>
            <select
              className={`${inputClassName} w-1/5`}
              id="Duration"
              name="Duration"
              value={data.Duration}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="10mins">10mins</option>
              <option value="30mins">30mins</option>
              <option value="1hour">1hour</option>
              <option value="3hours">3hours</option>
              <option value="12hours">12hours</option>
              <option value="24hours">24hours</option>
            </select>
          </div>
          <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
      <label className="labelClassName" htmlFor="fileUpload">
        Upload Images
      </label>
      <br />
      <input type="file" id="fileUpload" name="fileUpload" multiple onChange={handleSubmit} />
      <br />
      <br />
      {fileDisplays.length > 0 && (
        <div>
          {fileDisplays.map((fileDisplay, index) => (
            <img key={index} src={fileDisplay} alt={`Uploaded file ${index + 1}`} height="150px" width="150px" />
          ))}
        </div>
      )}
    </div>
          <div>
        
          </div>
        </div>

        <div>
          <button
            className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={() => createNewHost()}
          >
            Create
          </button>
        </div>

        {error ? <div className="text-red-1 mt-4">{error.message}</div> : null}
      </form>
    </div>
  );
}
