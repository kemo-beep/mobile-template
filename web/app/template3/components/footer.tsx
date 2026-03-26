export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 pt-20 pb-10 bg-[#fafafa] dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black dark:bg-[#ccff00] flex items-center justify-center shadow-md dark:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
            <div className="w-3 h-3 bg-white dark:bg-black rounded-full" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white">AURA</span>
        </div>
        <div className="flex gap-6 text-sm font-bold text-black/50 dark:text-white/50">
          <a href="#" className="hover:text-black dark:hover:text-[#ccff00] transition-colors">Privacy</a>
          <a href="#" className="hover:text-black dark:hover:text-[#ccff00] transition-colors">Terms</a>
          <a href="#" className="hover:text-black dark:hover:text-[#ccff00] transition-colors">Twitter</a>
          <a href="#" className="hover:text-black dark:hover:text-[#ccff00] transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
