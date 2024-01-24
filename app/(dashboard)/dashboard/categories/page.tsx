"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/category-tables/columns";
import { CategoryTable } from "@/components/tables/category-tables/category-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import type { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const breadcrumbItems = [
  { title: "Cateogries", link: "/dashboard/Categories" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const supabase = createClientComponentClient<Database>();

      let { count } = await supabase
        .from("categories")
        .select("id", { count: "exact" });

      let { data: newCategories, error } = await supabase
        .from("categories")
        .select("*")
        .range(offset, offset + pageLimit - 1);

      if (error) {
        console.log(error);
      } else {
        setCategories(newCategories);
        setRowCount(count);
      }
      setLoading(false);
    }

    fetchCategories();
  }, [page, pageLimit]);

  const pageCount = Math.ceil(rowCount / pageLimit);
  // const employee: Employee[] = categories.users;

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Categories (${rowCount})`}
            description="Manage categories (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/categories/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <CategoryTable
          searchKey="CategoryName"
          pageNo={page}
          columns={columns}
          totalUsers={rowCount}
          data={categories}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
