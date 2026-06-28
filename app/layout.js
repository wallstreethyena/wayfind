export const metadata = {
  title: "Wayfind",
  description: "Discover the best places, anywhere.",
  manifest: "/manifest.webmanifest",
  applicationName: "Wayfind",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Wayfind",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0D1117",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ margin: 0, background: "#0D1117", height: "100%" }}>{children}</body>
    </html>
  );
}
