"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: boolean;
  description: string;
}

export default function FormContent() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Điện tử");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  
  // Validation / feedback
  const [validationError, setValidationError] = useState("");
  const [nameError, setNameError] = useState("");
  const [skuError, setSkuError] = useState("");

  useEffect(() => {
    document.title = "Thêm sản phẩm mới - PDM Dashboard";

    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setNameError("");
    setSkuError("");

    let hasError = false;
    if (!name.trim()) {
      setNameError("Vui lòng điền tên sản phẩm!");
      hasError = true;
    }
    if (!sku.trim()) {
      setSkuError("Vui lòng điền mã SKU!");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    // Mock loading delay of 0.5s for Smart Wait demo
    setTimeout(() => {
      try {
        const stored = localStorage.getItem("pdm_products");
        let productsList: Product[] = [];
        if (stored) {
          productsList = JSON.parse(stored);
        }

        // Check for duplicate SKU
        const duplicate = productsList.find((p) => p.sku.toLowerCase() === sku.trim().toLowerCase());
        if (duplicate) {
          setSkuError("Mã SKU này đã tồn tại trong hệ thống!");
          setIsLoading(false);
          return;
        }

        const newProduct: Product = {
          id: "p_" + Date.now(),
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          category,
          status,
          description: description.trim()
        };

        productsList.unshift(newProduct); // Add to the top
        localStorage.setItem("pdm_products", JSON.stringify(productsList));
        
        alert("Thêm sản phẩm thành công!");
        router.push("/dashboard");
      } catch (err) {
        setValidationError("Đã xảy ra lỗi khi lưu sản phẩm.");
        setIsLoading(false);
      }
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
        {/* Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Thêm sản phẩm mới</h1>
            <p className="text-sm text-slate-400">Điền thông tin chi tiết của sản phẩm để nhập kho</p>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="space-y-6 mt-8">
          
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              id="prod-name"
              type="text"
              placeholder="Ví dụ: Laptop ASUS ROG Zephyrus"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              className={`w-full px-4 py-3 rounded-xl premium-input font-medium placeholder-slate-500 ${
                nameError ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15" : ""
              }`}
            />
            {nameError && (
              <p id="prod-name-error" className="text-red-400 text-xs mt-1.5 font-bold animate-pulse">
                {nameError}
              </p>
            )}
          </div>

          {/* SKU & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Mã SKU <span className="text-red-500">*</span>
              </label>
              <input
                id="prod-sku"
                type="text"
                placeholder="Ví dụ: ROG-ZEPHYRUS-G14"
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value);
                  if (skuError) setSkuError("");
                }}
                className={`w-full px-4 py-3 rounded-xl premium-input font-medium placeholder-slate-500 font-mono uppercase ${
                  skuError ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15" : ""
                }`}
              />
              {skuError && (
                <p id="prod-sku-error" className="text-red-400 text-xs mt-1.5 font-bold animate-pulse">
                  {skuError}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="prod-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl premium-input font-medium cursor-pointer"
                >
                  <option value="Điện tử">Điện tử</option>
                  <option value="Nội thất">Nội thất</option>
                  <option value="Thời trang">Thời trang</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trạng thái hoạt động */}
          <div className="flex items-center gap-3 py-2">
            <input
              id="prod-status"
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="h-5 w-5 rounded bg-slate-900 border-slate-750 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950 accent-sky-500 cursor-pointer"
            />
            <label htmlFor="prod-status" className="text-sm font-semibold text-slate-300 cursor-pointer select-none">
              Kích hoạt hoạt động
            </label>
          </div>

          {/* Mô tả chi tiết */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Mô tả chi tiết
            </label>
            <textarea
              id="prod-description"
              rows={4}
              placeholder="Nhập thông tin mô tả về sản phẩm (tùy chọn)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl premium-input font-medium placeholder-slate-500"
            />
          </div>

          {/* Feedback error display */}
          {validationError && (
            <div className="p-3 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl text-center">
              {validationError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-900">
            <button
              id="btn-cancel"
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-5 py-3 rounded-xl font-bold bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 transition-all-custom cursor-pointer"
            >
              Hủy
            </button>
            <button
              id="btn-save"
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 shadow-lg shadow-sky-500/20 transition-all-custom flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="spinner border-zinc-950 border-left-zinc-900 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <span>Lưu sản phẩm</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
