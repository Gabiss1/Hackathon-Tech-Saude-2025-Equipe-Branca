"use client"

import { useRouter } from "next/navigation";

export default function Roteiro() {



    const router = useRouter();
    return (
        <div>
            <h1></h1>
            <ul className="space-y-4">
                <li>
                    <button onClick={() => router.push("/painel-senhas")} className="border rounded-md px-4 py-2 shadow-md bg-black text-white">
                        Painel de Senhas
                    </button>
                </li>
                <li>
                    <button onClick={() => router.push("/senha-popup")} className="border rounded-md px-4 py-2 shadow-md bg-black text-white">
                        Chamado de Senha
                    </button>
                </li>
                <li>
                    <button onClick={() => router.push("/carrossel")} className="border rounded-md px-4 py-2 shadow-md bg-black text-white">
                        Status de Manchester
                    </button>
                </li>
                <li>
                    <button onClick={() => router.push("/consulta")} className="border rounded-md px-4 py-2 shadow-md bg-black text-white">
                        Chamado para Consulta
                    </button>
                </li>
            </ul>
        </div>
    )
}