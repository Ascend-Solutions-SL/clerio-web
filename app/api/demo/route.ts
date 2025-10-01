import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const company = String(formData.get("company") || "");
  const companySize = String(formData.get("company_size") || "");
  const selectedFeatures = String(formData.get("selected_features") || "");

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Faltan campos obligatorios" }, { status: 400 });
  }

  // Aquí podrías enviar a un CRM, email o BD.
  console.log("Nueva solicitud de demo", { 
    name, 
    email, 
    company, 
    companySize,
    selectedFeatures: selectedFeatures.split(",").filter(Boolean)
  });

  return NextResponse.redirect(new URL("/gracias", request.url), 303);
}

