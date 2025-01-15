// app/layout.tsx (Server Component)
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider"; // Adjust the path as necessary
import { ServerProvider } from "../context/server_context"; // Adjust the path as necessary

export const metadata = { 
  title: "Devise CRUD", 
  description: "A dynamic CRUD gem for Devise-managed models in Rails." 
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