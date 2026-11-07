// app/features/faq/components/form.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useGetFaqByIdQuery,
  useGetFaqPagesQuery,
} from "../data/faqApi";

const emptyValues = {
  page: "",
  question: "",
  answer: "",
  order: 0,
  isActive: true,
};

const validate = (values: typeof emptyValues) => {
  const errors: Record<string, string> = {};
  if (!values.page) errors.page = "Choose the page this FAQ belongs to.";
  if (!values.question.trim()) errors.question = "Question is required.";
  else if (values.question.length > 300)
    errors.question = "Question cannot exceed 300 characters.";
  if (!values.answer.trim()) errors.answer = "Answer is required.";
  else if (values.answer.length > 2000)
    errors.answer = "Answer cannot exceed 2000 characters.";
  return errors;
};

export default function FaqForm({
  mode = "create",
}: {
  mode?: "create" | "edit";
}) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEdit = mode === "edit" || !!id;

  const { data: pagesData } = useGetFaqPagesQuery();
  const pageOptions = pagesData?.data ?? [];

  const { data: faqData, isLoading: loadingFaq } = useGetFaqByIdQuery(
    id ?? "",
    { skip: !isEdit },
  );
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  // The list page can pre-select a page via ?page=... when adding from a filtered view
  const [values, setValues] = useState({
    ...emptyValues,
    page: searchParams.get("page") || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (faqData?.data) {
      const f = faqData.data;
      setValues({
        page: f.page || "",
        question: f.question || "",
        answer: f.answer || "",
        order: f.order ?? 0,
        isActive: f.isActive ?? true,
      });
    }
  }, [faqData]);

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
      page: values.page,
      question: values.question.trim(),
      answer: values.answer.trim(),
      order: Number(values.order) || 0,
      isActive: values.isActive,
    };

    try {
      if (isEdit) {
        if (!id) {
          toast.error("Missing FAQ ID for update.");
          setIsSubmitting(false);
          return;
        }
        await updateFaq({ id, data: payload }).unwrap();
        toast.success("FAQ updated successfully!");
      } else {
        await createFaq(payload).unwrap();
        toast.success("FAQ created successfully!");
        if (actionType === "create_another") {
          // keep the page so several FAQs can be added to it in a row
          setValues({ ...emptyValues, page: values.page });
          setErrors({});
          setIsSubmitting(false);
          return;
        }
      }
      navigate("/admin/faq");
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingFaq && isEdit) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading FAQ details...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">
          {isEdit ? "Edit FAQ" : "Create FAQ"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Each FAQ is shown only in the FAQ section of the page you choose. A
          page with no FAQs here keeps its default questions.
        </p>
      </header>

      <form onSubmit={(e) => handleSubmit(e, "create")} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question &amp; Answer</CardTitle>
                <CardDescription>What visitors will read</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2">Page</Label>
                  <Select
                    value={values.page}
                    onValueChange={(v) => handleChange("page", v)}
                  >
                    <SelectTrigger
                      className={`w-full ${errors.page ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select the page for this FAQ" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.page && (
                    <p className="text-xs text-red-500 mt-1">{errors.page}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2">Question</Label>
                  <Input
                    value={values.question}
                    placeholder="e.g. What does the trial cost?"
                    maxLength={300}
                    onChange={(e) => handleChange("question", e.target.value)}
                    className={errors.question ? "border-red-500" : ""}
                    required
                  />
                  {errors.question && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.question}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2">Answer</Label>
                  <Textarea
                    value={values.answer}
                    rows={6}
                    maxLength={2000}
                    placeholder="Write a clear, short answer"
                    onChange={(e) => handleChange("answer", e.target.value)}
                    className={errors.answer ? "border-red-500" : ""}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {values.answer.length}/2000
                  </p>
                  {errors.answer && (
                    <p className="text-xs text-red-500 mt-1">{errors.answer}</p>
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
                    Lower numbers appear first on that page.
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
                Create &amp; Add Another
              </Button>
            </>
          )}
          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => navigate("/admin/faq")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
