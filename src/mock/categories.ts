// src/mock/categories.ts

import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Thiết bị điện tử",
  },
  {
    id: 2,
    name: "Thời trang nam",
    children: [
      { id: 201, name: "Quần áo nam" },
      { id: 202, name: "Giày dép nam" },
      { id: 203, name: "Mũ và phụ kiện" },
      { id: 204, name: "Ví da nam" },
      { id: 205, name: "Giày cao cấp" },
    ],
  },
  {
    id: 3,
    name: "Thời trang nữ",
    children: [
      { id: 301, name: "Quần áo nữ" },
      { id: 302, name: "Giày dép nữ" },
      { id: 303, name: "Túi xách & Trang sức" },
    ],
  },
];