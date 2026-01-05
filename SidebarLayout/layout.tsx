import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
