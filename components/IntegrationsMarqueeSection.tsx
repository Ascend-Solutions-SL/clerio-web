import Image from "next/image";

const logos = [
  { src: "/logos/logos_banner/gmail_logo.png", alt: "Gmail", width: 110, height: 34 },
  { src: "/logos/logos_banner/outlook_logo.png", alt: "Outlook", width: 118, height: 34 },
  { src: "/logos/logos_banner/drive_logo.png", alt: "Google Drive", width: 124, height: 34 },
  { src: "/logos/logos_banner/onedrive_logo.png", alt: "OneDrive", width: 126, height: 34 },
  { src: "/logos/logos_banner/dropbox_logo.png", alt: "Dropbox", width: 124, height: 34 },
  { src: "/logos/logos_banner/holded_logo.png", alt: "Holded", width: 112, height: 34 },
  { src: "/logos/logos_banner/sage_logo.png", alt: "Sage", width: 98, height: 34 },
  { src: "/logos/logos_banner/wolters_logo.png", alt: "Wolters Kluwer", width: 152, height: 34 },
  { src: "/logos/logos_banner/whatsapp_logo.png", alt: "WhatsApp", width: 128, height: 34 },
];

export default function IntegrationsMarqueeSection() {
  const loop = [...logos, ...logos];

  return (
    <section className="px-4 pt-8 pb-6 sm:px-6 sm:pt-12 sm:pb-8">
      <div className="container-page">
        <p className="text-center text-[26px] font-semibold tracking-[-0.025em] text-[#192131] sm:text-[34px]">
          Softwares integrados con Clerio
        </p>

        <div className="logo-runway relative mt-6 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_100%)] py-4 shadow-[0_10px_26px_rgba(15,23,42,0.05)] sm:mt-7 sm:py-5">
          <div className="logo-fade-left" />
          <div className="logo-fade-right" />

          <div className="logo-marquee-track">
            {loop.map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className="mx-4 flex min-w-[154px] items-center justify-center sm:mx-5 sm:min-w-[170px]">
                <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto max-h-[42px] w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
