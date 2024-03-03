"use client";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import links from "@/lib/videos";
import PriceChart from "@/components/PriceChart";
import StockHolding from "@/components/StockHolding";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import {useUser} from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from 'sonner';
import CreatorGallery from "@/components/CreatorGallery";
import {fetchCreatorById} from "@/app/actions/creators";

const Profile =  ({ params }: { params: { cid: Int } }) => {
  // const router = useRouter()
  // const { cid } = router.query;
  // const creatorData = await fetchCreatorById(params.cid);
  // console.log(creatorData);
  const [toggleTab, setToggleTab] = useState(1);
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const router = useRouter()
  const [creatorData, setCreatorData] = useState(null as any)
  const toggleTabs = (index: any) => {
    setToggleTab(index);
  };
  const [showAll, setShowAll] = useState(false);
  const chartData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
    ],
    volume: [10, 20, 15, 25, 30, 10, 20, 15, 25, 30], // Sample prices
    price: [15, 18, 20, 22, 28, 15, 18, 20, 22, 28], // Sample trend
  };

  useEffect( () => {
   const fetchData = async () => {
     try {
             const res = await axios({
                url: "/api/creator",
                method: "POST",
                data: {
                  id: params.cid
                }
             })
            // console.log(res.data)
            setCreatorData(res.data)
         }
         catch (err) {
            console.log(err)
         }

   }
         fetchData().then(data => {
           // console.log(data)
         })

}, []);

 const { user } = useUser();
  const handleBuy = async () => {
    if(!user) router.push("/login")
    try {
       const res = await axios({
      url: "/api/buy",
      method: "POST",
      data: {
        userId: user?.id,
        quantity: quantity,
        price: price,
        influencer: creatorData
      }
    })
      toast.success("Order placed successfully!")
      router.push("/dashboard/orders")
    } catch (err) {
      console.log(err)
    }
  }

    const handleSell = async () => {
    if(!user) router.push("/login")
    try {
       const res = await axios({
      url: "/api/sell",
      method: "POST",
      data: {
        userId: user?.id,
        quantity: quantity,
        price: price,
        influencer: creatorData
      }
    })
      toast.success("Order placed successfully!")
      router.push("/dashboard/orders")
    } catch (err) {
      console.log(err)
    }
  }

  if(!creatorData) return <p>Loading...</p>

  return (
      <div className="section-container w-full min-h-screen border-5 m-0 px-3 lg:px-0">
        <div className="wrapper lg:w-4/5 mx-auto my-2">
          <button
              className="flex items-center gap-0 hover:gap-1 ps-1 hover:ps-0 transition-all linear max-w-fit cursor-pointer"
              onClick={() => {
                Router.back();
              }}
          >
            <h1 className="text-lg inline-block">🡨&nbsp;</h1>
            <p className="inline-block">Back</p>
          </button>
        </div>
        <div
            className="wrapper lg:w-4/5 border-2 rounded-xl mx-auto my-3 p-2 flex flex-col lg:flex-row md:gap-4 divide-2 overflow-auto">
          <div className="rounded p-3 flex flex-col sm:flex-row items-center gap-4">
            <div
                className="border-2 min-w-[200px] max-w-[250px] w-full rounded overflow-hidden self-start aspect-square">
              <img
                  className="w-full h-full p-2 rounded-lg aspect-square"
                  src={creatorData.data.image}
              />
            </div>
            <div className="w-full h-full flex flex-col items-start justify-between self-start gap-3">
              <h1 className="text-2xl font-semibold w-full text-gray-900 text-white dark:text-white font-degular">
                {creatorData.data.name}
              </h1>
              <p className="w-full font-acumin ">
                <span>120K</span> Followers
                <span className="text-green-500 mx-1">(+1%)</span>
              </p>
              <div className="w-full flex items-center gap-1 ">
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="bg-[#c13584] inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className=" bg-[#ff0000] inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </button>
              </div>
              <div className="block">
                  <StockHolding influencerId={params.cid} />
              </div>
              <div className="w-full self-end">
                <div className="w-80 flex">
                  {/*<button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Buy
                </button>*/}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline"
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Buy</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-black">
                      <DialogHeader>
                        <DialogTitle>Invest in {creatorData.data.name}</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Quantity
                          </Label>
                          <Input id="quantity" placeholder={"Enter quantity"} onChange={(e) => setQuantity(parseInt(e.target.value))} className="col-span-3 text-gray-700" type={"number"}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Price
                          </Label>
                          <Input id="price" placeholder="Enter Price" onChange={(e) => setPrice(parseInt(e.target.value))} className="col-span-3 text-gray-700" type={"number"}/>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleBuy} type="submit">Buy</Button>
                        <Button variant={"outline"} className="bg-dark">Cancel</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/*<button
                  type="button"
                  className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Sell
                </button>*/}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline"
                              className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sell</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-black">
                      <DialogHeader>
                        <DialogTitle>Sell Investment in Logan Paul</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Quantity
                          </Label>
                          <Input onChange={(e) => setQuantity(parseInt(e.target.value))} id="quantity" placeholder={"Enter quantity"} className="col-span-3 text-gray-700" type={"number"}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Price
                          </Label>
                          <Input onChange={(e) => setPrice(parseInt(e.target.value))} id="price" placeholder="Enter Price" className="col-span-3 text-gray-700" type={"number"}/>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSell}>Sell</Button>
                        <Button variant={"outline"} className="bg-dark">Cancel</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="creator-details rounded-xl border-2 my-3 lg:w-4/5 mx-auto">
          <div className="h-full p-2 px-4">
            <div className="font-acumin flex gap-1 my-2">
              <span className="text-lg">₹</span>
              <span className="font-bold text-3xl ">{creatorData.data.currentPrice}</span>
              <span className="text-green-500 text-xl mx-1 self-center">
              (+1%)
            </span>
            </div>
            <div className="text-sm font-medium text-center text-gray-500 border-gray-200 rounded-xl">
              <ul className="flex flex-nowrap overflow-y-hidden overflow-x-auto -mb-px border-">
                <li className="mr-2">
                  <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                          toggleTab === 1
                              ? "text-blue-600 border-blue-600"
                              : "border-transparent hover:text-gray-600 hover:border-gray-300"
                      } `}
                      onClick={() => toggleTabs(1)}
                  >
                    Chart
                  </button>
                </li>
                <li className="mr-2">
                  <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg  ${
                          toggleTab === 2
                              ? "text-blue-600 border-blue-600"
                              : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                      } `}
                      aria-current="page"
                      onClick={() => toggleTabs(2)}
                  >
                    Stock Details
                  </button>
                </li>
                <li>
                  <button className="inline-block p-4 text-gray-600 rounded-t-lg cursor-not-allowed">
                    Disabled
                  </button>
                </li>
              </ul>
              {/* Section 1 for Tab 1 */}
              <section className={toggleTab === 1 ? "py-6" : "hidden"}>
                <PriceChart data={chartData}/>
              </section>

              {/* Section 2 for Tab 2 */}
              <section className={toggleTab === 2 ? "py-6" : "hidden"}>
                <div className="creator-stock-details w-full font-acumin grid xs:grid-cols-2 md:grid-cols-3 gap-3 ">
                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Current Price
                    </p>
                    <p className="parameter-value text-gray-500">
                      ₹<span className="text-foreground mx-1">500</span>
                    </p>
                  </div>
                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Volume
                    </p>
                    <p className="parameter-value text-gray-500">
                      <span className="text-foreground mx-1">1000</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Your Holding
                    </p>
                    <p className="parameter-value text-gray-500">
                      ₹<span className="text-foreground mx-1">200</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Profit / Loss
                    </p>
                    <p className="parameter-value text-gray-500">
                      ₹<span className="text-foreground mx-1">100</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Profit / Loss (%)
                    </p>
                    <p className="parameter-value text-gray-500">
                      <span className="text-foreground mx-1">50%</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Invested Value
                    </p>
                    <p className="parameter-value text-gray-500">
                      ₹<span className="text-foreground mx-1">200</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Units
                    </p>
                    <p className="parameter-value text-gray-500">
                      <span className="text-foreground mx-1">10</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      High / Low
                    </p>
                    <p className="parameter-value text-gray-500">
                      ₹<span className="text-foreground mx-1">500 / 400</span>
                    </p>
                  </div>

                  <div
                      className="creator-stock-details-parameter flex justify-between rounded-sm border p-2 py-3 w-full min-w-[175px] ">
                    <p className="parameter-name text-gray-500 text-nowrap">
                      Duration
                    </p>
                    <p className="parameter-value text-gray-500">
                      <span className="text-foreground mx-1">3 months</span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <CreatorGallery links={links}/>
      </div>
  );
};

export default Profile;
