/**
 * Google Analytics 4 (GA4) ve Microsoft Clarity etkinlik takip yardımcısı.
 * Sunucu tarafında çalıştırıldığında tarayıcı API'lerine erişmez.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    // 1. Google Analytics 4 (gtag) kuyruğunu daima hazır tut (script gecikmeli yüklense bile kuyruk kaybolmaz)
    win.dataLayer = win.dataLayer || [];
    if (typeof win.gtag !== "function") {
      win.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        win.dataLayer.push(arguments);
      };
    }

    // Google Analytics'e etkinliği beacon taşıma tercihiyle gönder.
    win.gtag("event", eventName, {
      ...params,
      transport_type: "beacon",
    });

    // 2. Microsoft Clarity özel etkinlik kaydı
    if (typeof win.clarity === "function") {
      win.clarity("event", eventName);
    }
  } catch {
    // Hata durumunda kullanıcı deneyimini asla engelleme
  }
}

