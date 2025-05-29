export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[url('/images/fundoFarmacia.png')]
 bg-cover bg-center bg-no-repeat"
    >
      <div className="bg-white/50 min-h-screen w-full">{children}</div>
    </div>
  );
}