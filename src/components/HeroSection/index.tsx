export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-full pt-14 pb-14 bg-[#a0d2db] gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl text-white">Farmácia Inclusiva</h1>

        <span className="text-2xl text-white">
          Cuidando da sua saúde com acessibilidade, qualidade e segurança.
        </span>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
            💊
          </div>
          <span className="text-md text-white mt-2">Medicamentos</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
            🦻
          </div>
          <span className="text-md text-white mt-2">Acessibilidade</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
            ❤️
          </div>
          <span className="text-md text-white mt-2">Cuidado Humano</span>
        </div>
      </div>
    </div>
  );
}
