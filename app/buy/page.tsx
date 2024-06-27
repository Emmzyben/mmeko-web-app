"use client";

import React, { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID_BOOKINGS } from '@/libs/appwriteConfig';
import { Query } from 'appwrite';
import { useUser } from '../context/user';
import Link from 'next/link';
import '../components/style.css';

const Activity = () => {
    

    return (
        <div>
            <h1 className='font-bold text-center' style={{ fontSize: '17px',color:"grey" }}>Choose Gold Amount</h1>
           

                <div id='buy'>
                    <form action="">
                        <select name="card" id="">
                            <option value="">Select Payment Method</option>
                            <option value="credit/debit">Credit/Debit Card</option>
                            <option value="Visa/Mastercard">Visa/Mastercard</option>
                        </select><br />
                        <select name="pricelist" id="">
                        <option value="">Choose Gold amount</option>
                      <option value="79.99">1000 Gold for $79.99 (37% Bonus)</option>
                      <option value="62.99">750 Gold for $62.99 (32% Bonus)</option>
                      <option value="49.99">550 Gold for $49.99 (21% Bonus)</option>
                      <option value="39.99">400 Gold for $39.99 (10% Bonus)</option>
                      <option value="20.99">200 Gold for $20.99 (5% Bonus)</option>
                      <option value="10.99">100 Gold for $10.99</option>
                      <option value="6.99">50 Gold for $6.99</option>
                        </select><br />
                        <input type="submit" name="" id="subm" value={"Continue To Payment Page"} /><br/><br />
                        <p style={{color:'grey',fontSize:'13px'}}>In order to serve you better, Please take a minute to give us your <Link href="/support" style={{color:'orange'}}>feedback</Link> </p>
                    </form>
                </div>
        </div>
    );
};

export default Activity;
