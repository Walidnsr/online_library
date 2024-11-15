// src/app/layout.tsx

import '../styles/globals.css'; // Import your Tailwind CSS

export const metadata = {
  title: 'Online Library',
  description: 'A library management system',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;