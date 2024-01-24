import BreadCrumb from "@/components/breadcrumb";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Employee", link: "/dashboard/employee" },
    { title: "Create", link: "/dashboard/employee/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <CreateCategoryForm initialData={null} key={null} />
    </div>
  );
}
