'use client';

import React from 'react';

interface DataTableProps {
  children: React.ReactNode;
}

export default function DataTable({ children }: DataTableProps) {
  return (
    <div className="my-6 overflow-x-auto glass-card">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}
