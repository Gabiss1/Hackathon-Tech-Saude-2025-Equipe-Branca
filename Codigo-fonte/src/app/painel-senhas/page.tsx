'use client'
import React from "react";
import { useState, useEffect } from "react";

export default function PainelSenhas() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(now.toLocaleDateString("pt-BR"));
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chamadas = [
    { senha: "AP002", guiche: 2 },
    { senha: "PF002", guiche: 1 },
    { senha: "AD002", guiche: 1 },
    { senha: "AD001", guiche: 2 },
    { senha: "PF001", guiche: 1 }
  ];

  return (
    <div className="h-screen w-screen bg-[#0a0a0a48] text-white flex flex-col overflow-hidden">

      <div className="flex border-b-2 border-white justify-between items-center bg-[#111] px-6 h-24 text-xl">
        <div className="flex items-center gap-3 h-full">
          <img
            className="h-full object-contain"
            src="/logocentenario.png"
            alt=""
            width={200}
          />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-2">
            <span>📅</span>
            <span>{date}</span>
          </div>
          <div className="flex gap-2">
            <span>🕒</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-2/3 bg-blue-950 shadow-2xl flex flex-col items-center justify-center text-center p-10">
          <div className="flex-1  relative">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>

        </div>

        <div className="w-1/3 bg-blue-950 p-4 flex flex-col border-l-4 border-white">
          <div className="grid grid-cols-2 text-center text-lg font-bold border-b border-white pb-2 mb-2">
            <span>Senha</span>
            <span>Guichê</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chamadas.map((c, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 text-center py-4 font-semibold border-b border-white/30 ${i === 0 ? "text-7xl pl-3" : "text-2xl"
                  } ${c.senha === "PF001" ? 'text-red-500' : ''} ${c.senha === "PF002" ? 'text-red-500' : ''}`}
              >
                <span>{c.senha}</span>
                <span>{c.guiche}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
