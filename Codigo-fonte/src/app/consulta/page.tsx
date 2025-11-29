'use client'
import { useState, useEffect } from "react";

export default function SenhaPopup() {
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

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] shadow-2xl overflow-hidden text-white flex flex-col">
      
      <div className="flex border-b-4 border-white justify-between items-center bg-[#111] px-6 h-24 text-xl">
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

      <div className="flex flex-col flex-1">
        <div className="flex-1 bg-blue-700 flex flex-col items-center justify-center p-10 gap-6">
          <h2 className="text-2xl font-semibold">Senha</h2>
          <p className="text-7xl font-bold tracking-wider">AD004</p>
        </div>

        <div className="flex-1 bg-blue-900 p-4 flex flex-col items-center justify-center gap-4 text-xl overflow-y-auto">
          <h2 className="text-2xl font-semibold">Paciente</h2>
          <p className="text-6xl font-bold tracking-wider">B. L. M. R.</p>
        </div>
      </div>

    </div>
  );
}
