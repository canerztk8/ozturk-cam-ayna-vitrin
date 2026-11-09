import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Service } from "./types";
import { cn } from "./utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
  showUseCases?: boolean;
  /** İlk ekranda görünen kartlar için: lazy yerine hemen yükle */
  eagerImage?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  className,
  showUseCases = false,
  eagerImage = false,
}) => {
  return (
    <Link
      href={`/hizmetler/${service.slug}`}
      className={cn(
        "group relative flex flex-col h-full overflow-hidden bg-white border border-zinc-200/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-bronze block cursor-pointer text-left",
        className
      )}
      aria-label={`${service.title} hizmet detaylarını inceleyin`}
    >
      {/* Hizmet Fotoğrafı - ProjectCard ile Birebir Aynı Oran (16/10) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 flex-shrink-0">
        {service.image && (
          <Image
            src={service.image}
            alt={service.title}
            fill
            loading={eagerImage ? "eager" : "lazy"}
            /* fetchPriority="high" bilerek yok: Next.js bunu <link rel=preload>'a çevirip hero görseliyle yarıştırıyor */
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-30 group-hover:opacity-70 transition-opacity" />
      </div>

      {/* Bilgiler */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] sm:text-xs text-brand-bronze-text font-bold uppercase tracking-wider mb-1">
            {service.shortLabel || "ÖZEL İMALAT"}
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-brand-dark group-hover:text-brand-bronze transition-colors leading-snug">
            {service.title}
          </h3>

          {/* Hizmetlerimiz Sekmesinde Başlığın Altında Kullanım Alanları */}
          {showUseCases && service.useCases && service.useCases.length > 0 && (
            // Mobilde gizli (kart sadece fotoğraf + başlık); kullanım alanları hizmet sayfasında zaten var
            <div className="hidden md:block mt-2.5 pt-2 border-t border-zinc-100 space-y-1">
              <span className="text-[10.5px] font-bold text-brand-bronze uppercase tracking-wider block mb-1">
                Kullanım Alanları:
              </span>
              <ul className="space-y-1">
                {service.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-sm text-zinc-600 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-bronze flex-shrink-0 mt-1.5" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

