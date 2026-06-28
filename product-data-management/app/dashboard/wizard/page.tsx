"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WizardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Cấu hình hệ thống (Wizard) - PDM Dashboard";

    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  const handleNextStep1 = () => {
    if (!selectedPlan) return;
    setIsLoading(true);
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 500);
  };

  const handleBackStep2 = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(1);
      setIsLoading(false);
    }, 500);
  };

  const handleNextStep2 = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 500);
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="spinner animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen text-white py-12 px-4 sm:px-6">
      <div className="max-w-2xl w-full mx-auto p-8 rounded-2xl glass-panel relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Step Indicator Headers */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Cấu hình hệ thống</h1>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs transition-colors ${step >= 1 ? "bg-sky-500 text-zinc-950" : "bg-slate-800 text-slate-500"}`}>1</span>
            <div className={`h-0.5 w-8 ${step >= 2 ? "bg-sky-500" : "bg-slate-800"}`} />
            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs transition-colors ${step >= 2 ? "bg-sky-500 text-zinc-950" : "bg-slate-800 text-slate-500"}`}>2</span>
            <div className={`h-0.5 w-8 ${step >= 3 ? "bg-sky-500" : "bg-slate-800"}`} />
            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs transition-colors ${step >= 3 ? "bg-sky-500 text-zinc-950" : "bg-slate-800 text-slate-500"}`}>3</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-20">
            <div className="spinner animate-spin" />
            <span className="text-slate-400 text-sm font-medium">Đang chuyển bước...</span>
          </div>
        )}

        {/* Step 1: Select Plan */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Bước 1: Chọn gói cấu hình</h2>
              <p className="text-sm text-slate-450">Vui lòng chọn một trong hai tùy chọn cấu hình bên dưới để tiếp tục.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Basic Plan Card */}
              <div
                id="plan-basic"
                onClick={() => setSelectedPlan("basic")}
                className={`p-6 rounded-2xl border transition-all-custom cursor-pointer relative overflow-hidden group ${
                  selectedPlan === "basic"
                    ? "bg-sky-500/10 border-sky-400 shadow-md shadow-sky-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                {selectedPlan === "basic" && (
                  <div className="absolute top-3 right-3 bg-sky-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-sky-400 font-bold text-sm tracking-wider uppercase">Basic</div>
                <h3 className="text-lg font-bold mt-2 text-white">Gói Cơ Bản</h3>
                <p className="text-sm text-slate-400 mt-2">Phù hợp cho cửa hàng quy mô nhỏ, nhu cầu lưu trữ cơ bản.</p>
              </div>

              {/* Pro Plan Card */}
              <div
                id="plan-pro"
                onClick={() => setSelectedPlan("pro")}
                className={`p-6 rounded-2xl border transition-all-custom cursor-pointer relative overflow-hidden group ${
                  selectedPlan === "pro"
                    ? "bg-indigo-500/15 border-indigo-400 shadow-md shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                {selectedPlan === "pro" && (
                  <div className="absolute top-3 right-3 bg-indigo-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-indigo-400 font-bold text-sm tracking-wider uppercase">Pro</div>
                <h3 className="text-lg font-bold mt-2 text-white">Gói Nâng Cao</h3>
                <p className="text-sm text-slate-400 mt-2">Phù hợp cho doanh nghiệp lớn, đồng bộ thời gian thực và không giới hạn lưu trữ.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-900">
              <button
                id="btn-wizard-next-1"
                disabled={!selectedPlan}
                onClick={handleNextStep1}
                className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 shadow-lg shadow-sky-500/20 transition-all-custom cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation Notes */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Bước 2: Điền thông tin xác nhận</h2>
              <p className="text-sm text-slate-450">Bạn đã chọn <strong className="text-sky-450">{selectedPlan === "basic" ? "Gói Cơ Bản" : "Gói Nâng Cao"}</strong>. Hãy viết ghi chú cấu hình bên dưới.</p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Ghi chú cấu hình</label>
              <textarea
                id="wizard-note"
                rows={4}
                placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt của cấu hình..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl premium-input font-medium placeholder-slate-500"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-900">
              <button
                id="btn-wizard-back-2"
                onClick={handleBackStep2}
                className="px-5 py-3 rounded-xl font-bold bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 transition-all-custom cursor-pointer"
              >
                Quay lại
              </button>
              <button
                id="btn-wizard-next-2"
                onClick={handleNextStep2}
                className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 shadow-lg shadow-sky-500/20 transition-all-custom cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="space-y-6 text-center py-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/35 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h2 id="wizard-success-msg" className="text-2xl font-bold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Cấu hình hệ thống thành công!
              </h2>
              <p className="text-slate-450 text-sm max-w-sm mx-auto">
                Gói <strong className="text-sky-400">{selectedPlan === "basic" ? "Gói Cơ Bản" : "Gói Nâng Cao"}</strong> đã được áp dụng và cấu hình hoàn tất.
              </p>
            </div>

            {note && (
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm font-medium italic text-left">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-450 not-italic mb-1">Ghi chú của bạn:</span>
                "{note}"
              </div>
            )}

            <div className="pt-6 border-t border-slate-900 max-w-sm mx-auto">
              <button
                id="btn-wizard-home"
                onClick={() => router.push("/dashboard")}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 shadow-lg shadow-sky-500/20 transition-all-custom cursor-pointer"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
