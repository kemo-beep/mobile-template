import { Activity, Moon } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-[#111] rounded-[55px] sm:rounded-[65px] p-[8px] sm:p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] animate-float z-10">
      <div className="absolute inset-0 rounded-[55px] sm:rounded-[65px] border-[1px] border-white/10 pointer-events-none" />

      <div className="relative w-full h-full bg-[#fafafa] rounded-[48px] sm:rounded-[55px] overflow-hidden flex flex-col items-center">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[95px] h-[28px] bg-black rounded-full z-20 flex items-center justify-between px-2.5 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-[#333] relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[2px]" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border border-[#222]" />
        </div>

        <div className="absolute top-0 right-0 w-[150%] h-[30%] bg-gradient-to-b from-white/40 to-transparent -rotate-45 translate-x-1/4 -translate-y-1/2 z-10 pointer-events-none blur-md" />

        <div className="w-full h-full flex flex-col px-5 pt-16 pb-8 bg-neutral-50 relative z-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mb-1">Tue, 24 Mar</p>
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">Focus</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center border border-indigo-200/50 shadow-inner">
              <span className="text-indigo-600 font-bold text-sm">JD</span>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border border-neutral-100 mb-4 transition-transform hover:scale-[1.02] duration-300">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="85, 100" className="animate-[dash_1.5s_ease-out]" />
                </svg>
                <span className="absolute text-xs font-bold text-indigo-600">85%</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block text-sm">Daily Clarity</span>
                <span className="text-neutral-500 text-xs mt-0.5 block">You&apos;re on a 12-day streak.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[24px] p-4 aspect-square flex flex-col justify-between shadow-[0_8px_20px_-10px_rgba(0,0,0,0.05)] border border-orange-100/50">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Moon className="text-orange-500" size={16} />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-950 tracking-tight">
                  7<span className="text-lg">h</span> 20<span className="text-lg">m</span>
                </p>
                <p className="text-[10px] text-orange-600/80 font-bold uppercase tracking-wider mt-1">Sleep</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[24px] p-4 aspect-square flex flex-col justify-between shadow-[0_8px_20px_-10px_rgba(0,0,0,0.05)] border border-indigo-100/50">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Activity className="text-indigo-500" size={16} />
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-950 tracking-tight">12</p>
                <p className="text-[10px] text-indigo-600/80 font-bold uppercase tracking-wider mt-1">Habits</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border border-neutral-100 flex-1">
            <div className="w-20 h-3 bg-neutral-200 rounded-full mb-4" />
            <div className="space-y-3">
              <div className="w-full h-2 bg-neutral-100 rounded-full" />
              <div className="w-[85%] h-2 bg-neutral-100 rounded-full" />
              <div className="w-[60%] h-2 bg-neutral-100 rounded-full" />
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-neutral-900 rounded-full" />
        </div>
      </div>

      <div className="absolute top-[120px] -left-[2px] w-[3px] h-[26px] bg-[#333] rounded-l-md shadow-inner" />
      <div className="absolute top-[170px] -left-[2px] w-[3px] h-[55px] bg-[#333] rounded-l-md shadow-inner" />
      <div className="absolute top-[235px] -left-[2px] w-[3px] h-[55px] bg-[#333] rounded-l-md shadow-inner" />
      <div className="absolute top-[180px] -right-[2px] w-[3px] h-[75px] bg-[#333] rounded-r-md shadow-inner" />
    </div>
  );
}
