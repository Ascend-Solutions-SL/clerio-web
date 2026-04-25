"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type TabId = "inicio" | "facturas" | "validacion" | "cleria";

const tabs: Array<{ id: TabId; label: string; tone: string; inset: string }> = [
  { id: "inicio", label: "Inicio", tone: "#69a8ff", inset: "inset 0 0 0 1px rgba(105,168,255,0.45), 0 22px 40px rgba(105,168,255,0.16)" },
  { id: "facturas", label: "Facturas", tone: "#4f8dff", inset: "inset 0 0 0 1px rgba(79,141,255,0.48), 0 22px 40px rgba(79,141,255,0.18)" },
  { id: "validacion", label: "Validación", tone: "#7d7cff", inset: "inset 0 0 0 1px rgba(125,124,255,0.46), 0 22px 40px rgba(125,124,255,0.18)" },
  { id: "cleria", label: "ClerIA", tone: "#5f8dff", inset: "inset 0 0 0 1px rgba(95,141,255,0.5), 0 22px 40px rgba(95,141,255,0.2)" },
];

function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5">
        <Image src="/logos/cleria_color_logo.png" alt="Cler IA" width={20} height={20} className="h-full w-full object-contain" />
      </div>
      <p className="max-w-[95%] text-[12px] leading-[1.42] text-[#3c4657] sm:text-[12.5px]">{children}</p>
    </div>
  );
}

function UserMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="ml-auto w-fit max-w-[88%] rounded-[16px] bg-gradient-to-r from-[#2e62eb] to-[#2f78ff] px-3.5 py-1.5 text-right text-[11.5px] leading-[1.35] text-white shadow-[0_8px_18px_rgba(47,120,255,0.28)] sm:text-[12px]">
        {children}
      </div>
    </div>
  );
}

export default function FeatureShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="px-4 pt-4 pb-8 sm:px-6 sm:pt-5 sm:pb-12">
      <div className="mx-auto grid w-full max-w-[1260px] gap-14 sm:gap-9 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-7 lg:items-stretch xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="mx-auto flex min-h-[360px] min-w-0 w-full flex-col rounded-[34px] bg-[linear-gradient(140deg,#7bb8ff_0%,#9ac7f0_46%,#b7b8ea_100%)] px-4 py-6 sm:min-h-[400px] sm:px-7 sm:py-7">
          <div className="mx-auto flex w-fit flex-nowrap items-center justify-center gap-1.5 rounded-xl bg-white/8 p-1 backdrop-blur-[2px]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-[10px] px-3 py-2 text-[11px] font-medium transition-all duration-300 sm:px-4 sm:text-[12px] ${
                    isActive
                      ? "bg-white text-[#2d3850] shadow-[0_8px_20px_rgba(17,44,86,0.16)]"
                      : "text-white/88 hover:bg-white/16"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-1 items-center justify-center sm:mt-7">
            <div className="mx-auto flex w-full max-w-[540px] items-center justify-center rounded-[18px] border border-[#31579c]/35 bg-[#112f68]/75 p-3 shadow-[0_18px_30px_rgba(12,35,82,0.22)] sm:min-h-[190px] sm:p-4">
              <div className="relative flex h-[132px] w-full items-center justify-center overflow-hidden rounded-[14px] border border-dashed border-white/24 bg-[#0e2757]/46 sm:h-[144px]">
                <div
                  className="absolute left-1/2 top-1/2 h-[70%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-[#1d3564]/70 bg-[linear-gradient(180deg,#173568_0%,#122f61_100%)] transition-all duration-300"
                  style={{ boxShadow: active.inset }}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="mx-auto min-w-0 w-full rounded-[30px] border-2 border-[#d8deec] bg-[linear-gradient(180deg,#ffffff_0%,#f5f6fa_100%)] px-4 pb-6 pt-5 shadow-[0_22px_44px_rgba(15,24,40,0.11)] ring-1 ring-white/90 sm:px-5 sm:pb-7 sm:pt-6">
          <div className="mx-auto w-fit">
            <div className="relative rounded-full px-4 py-2.5">
              <div className="absolute inset-0 rounded-full bg-[#86acff]/24 blur-[20px]" />
              <div className="absolute -left-3 top-1/2 h-10 w-20 -translate-y-1/2 rounded-full bg-[#7fa8ff]/26 blur-[22px]" />
              <div className="absolute -right-3 top-1/2 h-9 w-16 -translate-y-1/2 rounded-full bg-[#93c0ff]/24 blur-[20px]" />
              <div className="relative flex items-center gap-2.5 rounded-full border border-white/70 bg-white/84 px-4 py-1.5 backdrop-blur-md">
                <Image
                  src="/logos/cleria_color_logo.png"
                  alt="Cler IA"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <div className="text-left leading-tight">
                  <p className="text-[19px] font-semibold tracking-[-0.02em] text-[#111827]">Cler IA</p>
                  <p className="text-[11px] text-[#6b7280]">Asistente financiero</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4.5 sm:space-y-5">
            <AssistantMessage>Hola, soy Cler IA, tu agente financiero. ¿En qué te puedo ayudar?</AssistantMessage>

            <UserMessage>Necesito saber los ingresos totales del mes anterior</UserMessage>

            <AssistantMessage>Los ingresos totales del mes anterior suman un total de 46.300 €.</AssistantMessage>

            <UserMessage>
              ¿Me puedes pasar las 3 facturas con el importe
              <br />
              más alto del mes anterior?
            </UserMessage>

            <AssistantMessage>Aquí tienes las 3 facturas con mayor importe del mes anterior.</AssistantMessage>

            <div className="ml-7 overflow-hidden rounded-[12px] border border-[#d7dde8] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.06)]">
              <table className="w-full table-fixed border-collapse text-[9.5px] text-[#3e4758] sm:text-[10.5px]">
                <thead className="bg-[#f5f7fa] text-[#5a6475]">
                  <tr>
                    <th className="hidden px-2 py-1.5 text-left font-semibold sm:table-cell">Número</th>
                    <th className="w-[24%] px-1.5 py-1.5 text-left font-semibold sm:w-[20%] sm:px-2">Fecha</th>
                    <th className="w-[24%] px-1.5 py-1.5 text-left font-semibold sm:w-[20%] sm:px-2">Tipo</th>
                    <th className="w-[30%] px-1.5 py-1.5 text-left font-semibold sm:w-[34%] sm:px-2">Contraparte</th>
                    <th className="w-[22%] px-1.5 py-1.5 text-right font-semibold sm:w-[18%] sm:px-2">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#edf1f6]">
                    <td className="hidden px-2 py-1.5 sm:table-cell">F6026</td>
                    <td className="px-1.5 py-1.5 whitespace-nowrap sm:px-2">27/03/26</td>
                    <td className="px-1.5 py-1.5 sm:px-2">
                      <span className="rounded-full bg-[#def7ea] px-1.5 py-0.5 text-[10px] text-[#18794e]">Ingresos</span>
                    </td>
                    <td className="px-1.5 py-1.5 truncate sm:px-2">Refri SL</td>
                    <td className="px-1.5 py-1.5 text-right sm:px-2">748,84 €</td>
                  </tr>
                  <tr className="border-t border-[#edf1f6]">
                    <td className="hidden px-2 py-1.5 sm:table-cell">F6025</td>
                    <td className="px-1.5 py-1.5 whitespace-nowrap sm:px-2">24/03/26</td>
                    <td className="px-1.5 py-1.5 sm:px-2">
                      <span className="rounded-full bg-[#def7ea] px-1.5 py-0.5 text-[10px] text-[#18794e]">Ingresos</span>
                    </td>
                    <td className="px-1.5 py-1.5 truncate sm:px-2">Sevifer SA</td>
                    <td className="px-1.5 py-1.5 text-right sm:px-2">593,72 €</td>
                  </tr>
                  <tr className="border-t border-[#edf1f6]">
                    <td className="hidden px-2 py-1.5 sm:table-cell">F6023</td>
                    <td className="px-1.5 py-1.5 whitespace-nowrap sm:px-2">21/03/26</td>
                    <td className="px-1.5 py-1.5 sm:px-2">
                      <span className="rounded-full bg-[#def7ea] px-1.5 py-0.5 text-[10px] text-[#18794e]">Ingresos</span>
                    </td>
                    <td className="px-1.5 py-1.5 truncate sm:px-2">Moviserca</td>
                    <td className="px-1.5 py-1.5 text-right sm:px-2">512,48 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
