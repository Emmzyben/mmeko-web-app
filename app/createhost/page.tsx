"use client"

import { categoryList } from "@/constants/categories";
import { useEffect, useState } from "react";
import useCreateHost from "../hooks/useCreateHost";
import { useUser } from "../context/user";
import { useRouter } from "next/navigation";
import { UploadError } from "../types";
import ImageUpload from "../components/ImageUpload.";

export default function CreateHost() {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";


    const [data, setData] = useState({
      title: "",
      category: "",
      description: "",
      time: 0,
      revisions: 0,
      feature: "",
      price: 0,
      shortDesc: "",
    });
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
  const contextUser = useUser()
    const router = useRouter()

    let [fileDisplay, setFileDisplay] = useState<string>('');
    let [title, setTitle] = useState<string>('');
    let [categories, setCategories] = useState<string>('');
    let [description, setDescription] = useState<string>('');
    let [revisions, setRevisions] = useState<string>('');
    let [shortDesc, setShortDesc] = useState<string>('');
    let [location, setLocation] = useState<string>('');
    let [price, setPrice] = useState<string>('');
    let [name, setName] = useState<string>('');
    const [files, setFile] = useState<any>([]);
    let [error, setError] = useState<UploadError | null>(null);
    let [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if (!contextUser?.user) router.push('/models')
    }, [contextUser])



    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;


        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
        }
    }
    

    const validate = () => {
        setError(null)
        let isError = false

        if (!files) {
            setError({ type: 'File', message: 'A video is required'})
            isError = true
        } else if (!title) {
            setError({ type: 'caption', message: 'A caption is required'})
            isError = true
        }
        else if (!categories) {
          setError({ type: 'categories', message: 'A caption is required'})
          isError = true
        }
      else if (!description) {
        setError({ type: 'description', message: 'A caption is required'})
        isError = true
        }
      else if (!name) {
        setError({ type: 'name', message: 'A caption is required'})
        isError = true
        }
        else if (!location) {
          setError({ type: 'location', message: 'A caption is required'})
          isError = true
        }
        else if (!revisions) {
          setError({ type: 'revisions', message: 'A caption is required'})
          isError = true
        }
        else if (!shortDesc) {
          setError({ type: 'shortDesc', message: 'A caption is required'})
          isError = true
        }
        else if (!price) {
          setError({ type: 'price', message: 'A caption is required'})
          isError = true
        }


        return isError
    }

    const createNewHost = async () => {
        let isError = validate()
        if (isError) return
        if (!files || !contextUser?.user) return
        setIsUploading(true)

        try {
            await useCreateHost(files, contextUser?.user?.id, title, categories, description, name, revisions, location, shortDesc, price)
            router.push(`/models/${contextUser?.user?.id}`)
            setIsUploading(false)
        } catch (error) {
            console.log(error)
            setIsUploading(false)
            alert(error)
        }
    }

  
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-gray-900 mb-5">Create a new Gig</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Enter the details to create the gig
      </h3>
      <form action="" className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
               Title
            </label>
            <input
              name="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
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
              name="categories"
              onChange={event => setCategories(event.target.value)}
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
            value={description}
            onChange={event => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={inputClassName}
              id="name"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="name"
            />
          </div>
          <div>
            <label htmlFor="revisions" className={labelClassName}>
              Revisions
            </label>
            <input
              type="number"
              id="revisions"
              className={inputClassName}
              placeholder="Max Number of Revisions"
              name="revisions"
              value={revisions}
              onChange={event => setRevisions(event.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="location" className={labelClassName}>
              Location
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="location"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                name="location"
                value={location}
                onChange={event => setLocation(event.target.value)}
              />
              </div>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Gig Images
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Short Description
            </label>
            <input
              type="text"
              className={`${inputClassName} w-1/5`}
              id="shortDesc"
              placeholder="Enter a short description."
              name="shortDesc"
              value={shortDesc}
              onChange={event => setShortDesc(event.target.value)}
            />
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
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={() => createNewHost()}
          >
            Create
          </button>
        </div>
        
        {error ? (
             <div className="text-red-1 mt-4">
                  {error.message}
                  </div>
                   ) : null}

      </form>
    </div>
  );
}

