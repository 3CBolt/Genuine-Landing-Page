import { useEffect, useRef } from "react";

export function WaitlistWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script is already loaded
    if (!document.getElementById("getwaitlist-script")) {
      const script = document.createElement("script");
      script.id = "getwaitlist-script";
      script.src = "https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.getwaitlist) {
          // @ts-ignore
          window.getwaitlist();
        }
      };
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (window.getwaitlist) {
        // @ts-ignore
        window.getwaitlist();
      }
    }
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"
      />
      <div
        id="getWaitlistContainer"
        data-waitlist_id="30228"
        data-widget_type="WIDGET_2"
        ref={containerRef}
      ></div>
    </>
  );
} 