import Script from "next/script";

const validMeasurementId = /^G-[A-Z0-9]+$/;

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  if (!measurementId || !validMeasurementId.test(measurementId)) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
