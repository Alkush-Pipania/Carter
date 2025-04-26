"use client";
import { useState } from "react";

export default function ManageKey() {
  const keys = [
    { name: "YouTube", key: "sk-abc123" },
    { name: "Facebook", key: "sk-def456" },
    { name: "Steam", key: "sk-ghi789" },
    { name: "Twitch", key: "sk-jkl012" },
  ];

  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = async (text, name) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(name);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2500); // Show "Copied" for 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Secret Keys</h1>

      <div className="bg-[#1f1e2e] rounded-2xl  p-6 space-y-8 border w-[50%] border-[#2c2b3d] shadow-xl shadow-purpleShadow">
        <div className="space-y-4">
          {keys.map(({ name, key }) => (
            <div key={name} className="space-y-2">
              <p className="text-white font-medium">{name}</p>
              <div className="flex items-center shadow-md">
                <input
                  type="text"
                  readOnly
                  value={key}
                  className="flex-1 px-4 py-2 bg-[#2d2c3b] text-white rounded-l-lg focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(key, name)}
                  className="px-4 py-2 bg-white text-black font-medium rounded-r-lg hover:bg-gray-200 transition-colors"
                >
                  {copiedKey === name ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
