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

const DEFAULT_PRODUCTS: Product[] = [
  { id: "p1", name: "Laptop ASUS ROG Zephyrus", sku: "ROG-ZEPHYRUS-G14", category: "Điện tử", status: true, description: "Laptop gaming cao cấp" },
  { id: "p2", name: "Bàn di chuột LED RGB", sku: "RGB-MOUSEPAD-XL", category: "Điện tử", status: true, description: "Bàn di chuột kích thước lớn có đèn LED" },
  { id: "p3", name: "Bàn ăn thông minh", sku: "SMART-DINING-TABLE", category: "Nội thất", status: true, description: "Bàn ăn gỗ sồi gấp gọn tiện lợi" },
  { id: "p4", name: "Ghế Ergonomic công thái học", sku: "ERGO-CHAIR-V2", category: "Nội thất", status: false, description: "Ghế ngồi văn phòng tốt cho cột sống" },
  { id: "p5", name: "Áo sơ mi Oxford Unisex", sku: "OXFORD-SHIRT-M", category: "Thời trang", status: true, description: "Áo sơ mi chất liệu cotton thoáng mát" }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Toolbar states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");
  const [isFiltering, setIsFiltering] = useState(false);

  // Authentication check & data loading
  useEffect(() => {
    document.title = "Hệ thống Quản lý Sản phẩm - Dashboard";

    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.push("/");
      return;
    }
    setIsAuthorized(true);

    // Initial load of products
    const stored = localStorage.getItem("pdm_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      localStorage.setItem("pdm_products", JSON.stringify(DEFAULT_PRODUCTS));
      setProducts(DEFAULT_PRODUCTS);
    }
  }, [router]);

  // Real-time filtering with 0.5s simulated loading delay for Smart Wait demo
  useEffect(() => {
    if (!isAuthorized) return;

    setIsFiltering(true);
    const delayDebounce = setTimeout(() => {
      const filtered = products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory =
          categoryFilter === "Tất cả" || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(filtered);
      setIsFiltering(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, categoryFilter, products, isAuthorized]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem("pdm_products", JSON.stringify(updated));
      setProducts(updated);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="spinner animate-spin" />
      </div>
    );
  }

  // Count metrics for cards
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status).length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  return (
    <div className="flex-1 flex flex-col min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Hệ thống Quản lý Sản phẩm
            </h1>
          </div>
          <button
            id="btn-logout"
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all-custom cursor-pointer flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border-t-2 border-t-sky-500/40 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-sky-500/5 font-extrabold text-8xl pointer-events-none">ALL</div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tổng sản phẩm</p>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">{totalProducts}</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border-t-2 border-t-emerald-500/40 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-green-500/5 font-extrabold text-8xl pointer-events-none">ACT</div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Đang hoạt động</p>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">{activeProducts}</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border-t-2 border-t-purple-500/40 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-purple-500/5 font-extrabold text-8xl pointer-events-none">CAT</div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-medium">Danh mục hàng hóa</p>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">{categoriesCount}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 rounded-2xl glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Tìm kiếm theo tên hoặc SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl premium-input font-medium placeholder-slate-500"
              />
            </div>
            <div className="relative">
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-xl premium-input font-medium cursor-pointer"
              >
                <option value="Tất cả">Tất cả danh mục</option>
                <option value="Điện tử">Điện tử</option>
                <option value="Nội thất">Nội thất</option>
                <option value="Thời trang">Thời trang</option>
              </select>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              id="btn-create-product"
              onClick={() => router.push("/dashboard/products/new")}
              className="px-4 py-2.5 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 transition-all-custom cursor-pointer flex items-center gap-2 text-sm shadow-md shadow-sky-500/20"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Thêm mới
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl glass-panel overflow-hidden relative min-h-[250px]">
          {isFiltering && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-10">
              <div className="spinner animate-spin" />
              <span className="text-slate-400 text-sm font-medium">Đang tải và lọc dữ liệu...</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table id="product-table" className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-300">Tên sản phẩm</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-300">SKU</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-300">Danh mục</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-300">Trạng thái</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-300 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/40 hover:border-l-2 hover:border-l-sky-500 transition-all duration-150">
                      <td className="p-4">
                        <div className="font-bold text-slate-100">{product.name}</div>
                        <div className="text-xs text-slate-450 mt-0.5 line-clamp-1">{product.description || "Chưa có mô tả"}</div>
                      </td>
                      <td className="p-4 text-sm font-mono font-medium text-sky-400/90">{product.sku}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900/80 border border-slate-800 text-slate-300">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        {product.status ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-450">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-450">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            Ngừng hoạt động
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-400 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 hover:border-rose-900/50 transition-colors cursor-pointer"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                      {!isFiltering && "Không tìm thấy sản phẩm nào khớp với điều kiện lọc."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
