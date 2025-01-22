// app/layout.tsx (Server Component)
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider"; // Adjust the path as necessary
import { ServerProvider } from "../context/server_context"; // Adjust the path as necessary

export const metadata = { 
  title: "Next.js with Crudify", 
  description: "RailsAdmin like interface built with next.js and CRUDify" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ServerProvider>
            <div className="flex flex-col h-screen">{children}</div>
          </ServerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}