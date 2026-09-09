// app/features/case-study-category/components/form.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  useGetCaseStudyCategoryByIdQuery,
} from "../data/caseStudyCategoryApi";

const validate = (values: any) => {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  else if (values.name.length > 100)
    errors.name = "Name cannot exceed 100 characters.";
  if (values.heading && values.heading.length > 150)
    errors.heading = "Heading cannot exceed 150 characters.";
  if (values.description && values.description.length > 500)
    errors.description = "Description cannot exceed 500 characters.";
  return errors;
};

export default function CaseStudyCategoryForm({
  mode = "create",
}: {
  mode?: "create" | "edit";
}) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = mode === "edit" || !!id;

  const { data: categoryData, isLoading: loadingCategory } =
    useGetCaseStudyCategoryByIdQuery(id ?? "", { skip: !isEdit });
  const [createCategory] = useCreateCaseStudyCategoryMutation();
  const [updateCategory] = useUpdateCaseStudyCategoryMutation();

  const [values, setValues] = useState({
    name: "",
    heading: "",
    description: "",
    order: 0,
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (categoryData?.data) {
      const c = categoryData.data;
      setValues({
        name: c.name || "",
        heading: c.heading || "",
        description: c.description || "",
        order: c.order ?? 0,
        isActive: c.isActive ?? true,
      });
    }
  }, [categoryData]);

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent, actionType = "save") => {
    e.preventDefault();

    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: values.name.trim(),
      heading: values.heading.trim(),
      description: values.description.trim(),
      order: Number(values.order) || 0,
      isActive: values.isActive,
    };

    try {
      if (isEdit) {
        if (!id) {
          toast.error("Missing sector ID for update.");
          setIsSubmitting(false);
          return;
        }
        await updateCategory({ id, data: payload }).unwrap();
        toast.success("✅ Sector updated successfully!");
      } else {
        await createCategory(payload).unwrap();
        toast.success("✅ Sector created successfully!");
        if (actionType === "create_another") {
          setValues({
            name: "",
            heading: "",
            description: "",
            order: 0,
            isActive: true,
          });
          setErrors({});
          setIsSubmitting(false);
          return;
        }
      }
      navigate("/admin/case-study-category");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Operation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingCategory && isEdit) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading sector details...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">
          {isEdit ? "Edit Sector" : "Create Sector"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Sectors group client case studies (Education, Healthcare, Solar…) and
          drive the section heading shown on the website.
        </p>
      </header>

      <form onSubmit={(e) => handleSubmit(e, "create")} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Information</CardTitle>
                <CardDescription>Enter the sector details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    value={values.name}
                    placeholder="e.g. Education"
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    required
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2">Section Heading</Label>
                  <Input
                    value={values.heading}
                    placeholder="e.g. Education Sector (falls back to Name)"
                    onChange={(e) => handleChange("heading", e.target.value)}
                    className={errors.heading ? "border-red-500" : ""}
                  />
                  {errors.heading && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.heading}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2">Description</Label>
                  <Textarea
                    value={values.description}
                    rows={3}
                    placeholder="Supporting line shown under the heading on the website"
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2">Order</Label>
                  <Input
                    type="number"
                    value={values.order}
                    onChange={(e) => handleChange("order", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Lower numbers appear first.
                  </p>
                </div>
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    checked={values.isActive}
                    onCheckedChange={(v) => handleChange("isActive", v)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          {isEdit ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, "create")}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, "create_another")}
              >
                Create &amp; Create Another
              </Button>
            </>
          )}
          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => navigate("/admin/case-study-category")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
