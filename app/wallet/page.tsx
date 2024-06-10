"use client"

import { categoryList } from "@/constants/categories";
import { useEffect, useState } from "react";
import useCreateHost from "../hooks/useCreateHost";
import { useUser } from "../context/user";
import { useRouter } from "next/navigation";
import { UploadError } from "../types";
import ImageUpload from "../components/ImageUpload.";
import "../components/style.css"

export default function wallet() {
 
  
  return (
    <div>
      <div id="display">
    <h2>Balance</h2>
    <h1>0.00</h1><br />
     <div id="in">
       <div>
   <p>Total account</p>
   <p>0.00</p>
       </div>
       <div>
<p>Total revenue</p>
<p>0.00</p>
       </div>
      </div>
      </div>
     
<div id="buttons">
  <button>Deposit</button>
<button style={{backgroundColor:"red"}}>Withdraw</button>
</div>
  
<div id="funds">
<h2 style={{color:'#fff'}}>Fund records</h2>
<hr />
</div>
    </div>
  );
}

