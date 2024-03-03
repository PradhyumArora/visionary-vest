"use client";
import React, {useState} from "react";

export default function CreatorGallery({ links }: { links: string[] }):any {
  const [showAll, setShowAll] = useState(false);
  return (
      <div className="lg:w-4/5  my-5 mx-auto py-3">
        <h1 className="text-2xl font-semibold w-full text-gray-900 text-white font-degular mb-3">
          Creator Gallery
        </h1>
        <div
            className={`grid grid-cols-2 md:grid-cols-3  relative ${
                showAll ? "" : "overflow-hidden h-[calc(100vh-64px)]"
            } gap-2`}
        >
          {!showAll && (
              <div
                  className="absolute bottom-0 left-0 w-full h-24 bg-transparent backdrop-blur-md flex items-center justify-center">
                <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    onClick={() => {
                      setShowAll(true);
                    }}
                >
                <span
                    className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Show More
                </span>
                </button>
              </div>
          )}
          {
            links.map((link, index) => (
                <div key={index}>
                  <img
                      className="h-auto max-w-full rounded-lg aspect-video object-cover object-left-top"
                      src={link}
                      alt=""
                  />
                </div>
            ))
          }
        </div>
      </div>
);
}