"use client";

import React, { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID_BOOKINGS } from '@/libs/appwriteConfig';
import { Query } from 'appwrite';
import { useUser } from '../context/user';
import '../components/style.css';

const Activity = () => {
    

    return (
        <div>
            <h1 className='font-bold text-light-orange text-center' style={{ fontSize: '17px' }}>Buy Gold</h1>
            <p className='font-bold text-light-orange text-center' >Fund your account with gold, Here is the value of gold converted to dollars</p>
                <table className="min-w-full bg-white">    
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Gold</th>
                            <th className="py-2 px-4 border-b">Value($)</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr>
                                <td className="py-2 px-4 border-b">50 gold</td>
                                <td className="py-2 px-4 border-b">$6.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">100 gold</td>
                                <td className="py-2 px-4 border-b">$10.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">200 gold</td>
                                <td className="py-2 px-4 border-b">$20.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">400 gold</td>
                                <td className="py-2 px-4 border-b">$39.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">550 gold</td>
                                <td className="py-2 px-4 border-b">$49.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">750 gold</td>
                                <td className="py-2 px-4 border-b">$69.99</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">1000 gold</td>
                                <td className="py-2 px-4 border-b">$79.99</td>
                            </tr>
                    </tbody>
                </table>

                <div id='buy'>
                    <h3>Fund your wallet</h3>
                    <p>Select amount of gold to fund</p>
                    <form action="">
                        <select name="pricelist" id="">
                      <option value="6.99">50 gold</option>
                      <option value="10.99">100 gold</option>
                      <option value="20.99">200 gold</option>
                      <option value="39.99">400 gold</option>
                      <option value="49.99">550 gold</option>
                      <option value="69.99">750 gold</option>
                      <option value="79.99">1000 gold</option>
                        </select>
                        <input type="submit" name="" id="subm" value={"Fund"} />
                    </form>
                </div>
        </div>
    );
};

export default Activity;
