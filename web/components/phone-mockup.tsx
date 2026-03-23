"use client"

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[min(280px,85vw)] animate-float">
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[12px] border-zinc-900 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-4 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-zinc-900" />
        {/* Screen content - banking app UI */}
        <div className="relative aspect-[9/19] bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="flex flex-col gap-4 p-6 pt-12">
            {/* Balance */}
            <div className="text-center">
              <p className="text-sm text-slate-500">Total Balance</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                $3,442.60
              </p>
            </div>
            {/* Currency flags row */}
            <div className="flex justify-center gap-2">
              {["USA", "EU", "UK"].map((c) => (
                <div
                  key={c}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-medium shadow-sm"
                >
                  {c}
                </div>
              ))}
            </div>
            {/* Quick actions */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white"
              >
                Receive
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700"
              >
                Add Money
              </button>
            </div>
            {/* Transactions list */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Transactions</p>
              {[
                { name: "Payoneer", amount: "+$420.00", positive: true },
                { name: "Netflix", amount: "-$15.99", positive: false },
                { name: "Convert USD→EUR", amount: "+$1,200", positive: true },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {t.name}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      t.positive ? "text-emerald-600" : "text-slate-600"
                    }`}
                  >
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
            {/* Bottom CTA */}
            <button
              type="button"
              className="mt-auto w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
