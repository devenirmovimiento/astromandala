export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
          }
          @media (max-width: 768px) {
            .chart-inputs-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
