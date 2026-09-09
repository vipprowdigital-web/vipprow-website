// app/features/case-study/components/form.tsx

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
import { ImageIcon, UploadIcon, XIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useGetCaseStudyByIdQuery,
} from "../data/caseStudyApi";
import { useGetCaseStudyCategoriesQuery } from "~/features/case-study-category/data/caseStudyCategoryApi";
import { RichTextEditor } from "~/components/crud/RichTextEditor";
import { Combobox } from "~/components/crud/Combobox";

type ApproachStep = { title: string; description: string };
type Metric = {
  label: string;
  value: string;
  prefix: string;
  suffix: string;
  description: string;
};

const emptyValues = {
  title: "",
  clientName: "",
  category: "",
  industry: "",
  shortDescription: "",
  background: "",
  challenge: "",
  solution: "",
  results: "",
  approach: [] as ApproachStep[],
  metrics: [] as Metric[],
  seo: { metaTitle: "", metaDescription: "", metaKeywords: "" },
  order: 0,
  isActive: true,
  isFeature: false,
  clientLogo: null as string | null,
  heroImage: null as string | null,
};

const validate = (values: typeof emptyValues) => {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) errors.title = "Title is required.";
  else if (values.title.trim().length < 3)
    errors.title = "Title must be at least 3 characters.";
  else if (values.title.length > 150)
    errors.title = "Title cannot exceed 150 characters.";

  if (!values.clientName.trim())
    errors.clientName = "Client name is required.";

  if (!values.category) errors.category = "Sector is required.";

  if (values.shortDescription && values.shortDescription.length > 300)
    errors.shortDescription = "Short description must be under 300 characters.";

  return errors;
};

export default function CaseStudyForm({
  mode = "create",
}: {
  mode?: "create" | "edit";
}) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = mode === "edit" || !!id;

  const { data: categoryData } = useGetCaseStudyCategoriesQuery({
    page: 1,
    limit: 100,
  });
  const categoryOptions =
    categoryData?.data?.map((c: any) => ({ value: c._id, label: c.name })) ||
    [];

  const { data: caseStudyData, isLoading: loadingCaseStudy } =
    useGetCaseStudyByIdQuery(id ?? "", { skip: !isEdit });
  const [createCaseStudy] = useCreateCaseStudyMutation();
  const [updateCaseStudy] = useUpdateCaseStudyMutation();

  const [values, setValues] = useState({ ...emptyValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (caseStudyData?.data) {
      const s = caseStudyData.data;
      setValues({
        title: s.title || "",
        clientName: s.clientName || "",
        category: s.category?._id || s.category || "",
        industry: s.industry || "",
        shortDescription: s.shortDescription || "",
        background: s.background || "",
        challenge: s.challenge || "",
        solution: s.solution || "",
        results: s.results || "",
        approach: (s.approach || []).map((a: any) => ({
          title: a.title || "",
          description: a.description || "",
        })),
        metrics: (s.metrics || []).map((m: any) => ({
          label: m.label || "",
          value: m.value || "",
          prefix: m.prefix || "",
          suffix: m.suffix || "",
          description: m.description || "",
        })),
        seo: {
          metaTitle: s.seo?.metaTitle || "",
          metaDescription: s.seo?.metaDescription || "",
          metaKeywords: (s.seo?.metaKeywords || []).join(", "),
        },
        order: s.order ?? 0,
        isActive: s.isActive ?? true,
        isFeature: s.isFeature ?? false,
        clientLogo: s.clientLogo || null,
        heroImage: s.heroImage || null,
      });
    }
  }, [caseStudyData]);

  const [
    { files: logoFiles, isDragging: logoDrag, errors: logoErrors },
    logoHandlers,
  ] = useFileUpload({ accept: "image/*", maxSize: 2 * 1024 * 1024 });

  const [
    { files: heroFiles, isDragging: heroDrag, errors: heroErrors },
    heroHandlers,
  ] = useFileUpload({ accept: "image/*", maxSize: 4 * 1024 * 1024 });

  const logoPreview = logoFiles?.[0]?.preview || values.clientLogo || null;
  const heroPreview = heroFiles?.[0]?.preview || values.heroImage || null;

  const handleChange = (name: string, value: any) => {
    if (name.startsWith("seo.")) {
      const key = name.split(".")[1];
      setValues((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ---------- Approach helpers ---------- */
  const addApproach = () =>
    setValues((p) => ({
      ...p,
      approach: [...p.approach, { title: "", description: "" }],
    }));
  const updateApproach = (i: number, key: keyof ApproachStep, val: string) =>
    setValues((p) => ({
      ...p,
      approach: p.approach.map((a, idx) =>
        idx === i ? { ...a, [key]: val } : a,
      ),
    }));
  const removeApproach = (i: number) =>
    setValues((p) => ({
      ...p,
      approach: p.approach.filter((_, idx) => idx !== i),
    }));

  /* ---------- Metric helpers ---------- */
  const addMetric = () =>
    setValues((p) => ({
      ...p,
      metrics: [
        ...p.metrics,
        { label: "", value: "", prefix: "", suffix: "", description: "" },
      ],
    }));
  const updateMetric = (i: number, key: keyof Metric, val: string) =>
    setValues((p) => ({
      ...p,
      metrics: p.metrics.map((m, idx) =>
        idx === i ? { ...m, [key]: val } : m,
      ),
    }));
  const removeMetric = (i: number) =>
    setValues((p) => ({
      ...p,
      metrics: p.metrics.filter((_, idx) => idx !== i),
    }));

  const handleSubmit = async (e: React.FormEvent, actionType = "save") => {
    e.preventDefault();

    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", values.title.trim());
      fd.append("clientName", values.clientName.trim());
      fd.append("category", values.category);
      fd.append("industry", values.industry.trim());
      fd.append("shortDescription", values.shortDescription.trim());
      fd.append("background", values.background);
      fd.append("challenge", values.challenge);
      fd.append("solution", values.solution);
      fd.append("results", values.results);
      fd.append("order", String(Number(values.order) || 0));
      fd.append("isActive", String(values.isActive));
      fd.append("isFeature", String(values.isFeature));

      fd.append(
        "approach",
        JSON.stringify(
          values.approach
            .map((a) => ({
              title: a.title.trim(),
              description: a.description.trim(),
            }))
            .filter((a) => a.title),
        ),
      );

      fd.append(
        "metrics",
        JSON.stringify(
          values.metrics
            .map((m) => ({
              label: m.label.trim(),
              value: m.value.trim(),
              prefix: m.prefix.trim(),
              suffix: m.suffix.trim(),
              description: m.description.trim(),
            }))
            .filter((m) => m.label && m.value),
        ),
      );

      fd.append(
        "seo",
        JSON.stringify({
          metaTitle: values.seo.metaTitle.trim(),
          metaDescription: values.seo.metaDescription.trim(),
          metaKeywords: values.seo.metaKeywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      );

      if (logoFiles.length > 0)
        fd.append("clientLogo", logoFiles[0].file as Blob);
      else if (isEdit && !values.clientLogo)
        fd.append("removeClientLogo", "true");

      if (heroFiles.length > 0)
        fd.append("heroImage", heroFiles[0].file as Blob);
      else if (isEdit && !values.heroImage)
        fd.append("removeHeroImage", "true");

      if (isEdit) {
        if (!id) {
          toast.error("Missing case study ID for update.");
          setIsSubmitting(false);
          return;
        }
        await updateCaseStudy({ id, formData: fd }).unwrap();
        toast.success("✅ Case study updated successfully!");
      } else {
        await createCaseStudy(fd).unwrap();
        toast.success("✅ Case study created successfully!");
        if (actionType === "create_another") {
          setValues({ ...emptyValues });
          setErrors({});
          setIsSubmitting(false);
          return;
        }
      }

      navigate("/admin/case-study");
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          err?.data?.errors?.[Object.keys(err?.data?.errors || {})[0]] ||
          "❌ Operation failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingCaseStudy && isEdit) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading case study details...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">
          {isEdit ? "Edit Case Study" : "Create Case Study"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isEdit
            ? "Update the client case study below."
            : "Fill out the form to publish a new client case study."}
        </p>
      </header>

      <form onSubmit={(e) => handleSubmit(e, "create")} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Information</CardTitle>
                <CardDescription>Client and headline details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2">Title</Label>
                  <Input
                    value={values.title}
                    placeholder="e.g. How Lakme Academy tripled qualified admissions"
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                    required
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2">Client Name</Label>
                    <Input
                      value={values.clientName}
                      placeholder="e.g. Lakme Academy"
                      onChange={(e) =>
                        handleChange("clientName", e.target.value)
                      }
                      className={errors.clientName ? "border-red-500" : ""}
                      required
                    />
                    {errors.clientName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.clientName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2">Industry</Label>
                    <Input
                      value={values.industry}
                      placeholder="e.g. Beauty & Wellness Education"
                      onChange={(e) =>
                        handleChange("industry", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2">Sector</Label>
                  <Combobox
                    options={categoryOptions}
                    value={values.category}
                    onChange={(v) => handleChange("category", v)}
                    placeholder="Select a sector..."
                  />
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                  {categoryOptions.length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      No sectors yet — create one under “Manage Sectors” first.
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2">Short Description</Label>
                  <Textarea
                    value={values.shortDescription}
                    rows={3}
                    placeholder="One or two lines used on the card and detail hero (max 300 chars)"
                    onChange={(e) =>
                      handleChange("shortDescription", e.target.value)
                    }
                    className={errors.shortDescription ? "border-red-500" : ""}
                  />
                  {errors.shortDescription && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.shortDescription}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* STORY */}
            <Card>
              <CardHeader>
                <CardTitle>The Story</CardTitle>
                <CardDescription>
                  Background, challenge, solution and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RichTextEditor
                  label="Background"
                  value={values.background}
                  onChange={(val) => handleChange("background", val)}
                />
                <RichTextEditor
                  label="The Challenge"
                  value={values.challenge}
                  onChange={(val) => handleChange("challenge", val)}
                />
                <RichTextEditor
                  label="Our Solution"
                  value={values.solution}
                  onChange={(val) => handleChange("solution", val)}
                />
                <RichTextEditor
                  label="The Results"
                  value={values.results}
                  onChange={(val) => handleChange("results", val)}
                />
              </CardContent>
            </Card>

            {/* APPROACH */}
            <Card>
              <CardHeader>
                <CardTitle>Our Approach</CardTitle>
                <CardDescription>
                  Optional step-by-step breakdown of the solution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {values.approach.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {i + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500"
                        onClick={() => removeApproach(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={step.title}
                      placeholder="Step title"
                      onChange={(e) =>
                        updateApproach(i, "title", e.target.value)
                      }
                    />
                    <Textarea
                      value={step.description}
                      rows={2}
                      placeholder="Step description"
                      onChange={(e) =>
                        updateApproach(i, "description", e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addApproach}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Step
                </Button>
              </CardContent>
            </Card>

            {/* METRICS */}
            <Card>
              <CardHeader>
                <CardTitle>Result Metrics</CardTitle>
                <CardDescription>
                  Headline numbers shown near the top of the detail page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {values.metrics.map((metric, i) => (
                  <div key={i} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Metric {i + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500"
                        onClick={() => removeMetric(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Input
                        value={metric.prefix}
                        placeholder="Prefix (+)"
                        onChange={(e) =>
                          updateMetric(i, "prefix", e.target.value)
                        }
                      />
                      <Input
                        value={metric.value}
                        placeholder="Value (312)"
                        onChange={(e) =>
                          updateMetric(i, "value", e.target.value)
                        }
                      />
                      <Input
                        value={metric.suffix}
                        placeholder="Suffix (%)"
                        onChange={(e) =>
                          updateMetric(i, "suffix", e.target.value)
                        }
                      />
                      <Input
                        value={metric.label}
                        placeholder="Label"
                        onChange={(e) =>
                          updateMetric(i, "label", e.target.value)
                        }
                      />
                    </div>
                    <Input
                      value={metric.description}
                      placeholder="Sub-text (e.g. increase in 6 months)"
                      onChange={(e) =>
                        updateMetric(i, "description", e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMetric}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Metric
                </Button>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Meta information for search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2">Meta Title</Label>
                  <Input
                    value={values.seo.metaTitle}
                    onChange={(e) =>
                      handleChange("seo.metaTitle", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="mb-2">Meta Description</Label>
                  <Textarea
                    value={values.seo.metaDescription}
                    rows={3}
                    onChange={(e) =>
                      handleChange("seo.metaDescription", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="mb-2">
                    Meta Keywords (comma separated)
                  </Label>
                  <Input
                    value={values.seo.metaKeywords}
                    placeholder="keyword1, keyword2"
                    onChange={(e) =>
                      handleChange("seo.metaKeywords", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    checked={values.isActive}
                    onCheckedChange={(v) => handleChange("isActive", v)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <Label htmlFor="isFeature">Featured</Label>
                  <Switch
                    id="isFeature"
                    checked={values.isFeature}
                    onCheckedChange={(v) => handleChange("isFeature", v)}
                  />
                </div>
                <div>
                  <Label className="mb-2">Order</Label>
                  <Input
                    type="number"
                    value={values.order}
                    onChange={(e) => handleChange("order", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Lower numbers appear first within the sector.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CLIENT LOGO */}
            <Card>
              <CardHeader>
                <CardTitle>Client Logo</CardTitle>
                <CardDescription>Shown on the grid card</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragEnter={logoHandlers.handleDragEnter}
                  onDragLeave={logoHandlers.handleDragLeave}
                  onDragOver={logoHandlers.handleDragOver}
                  onDrop={logoHandlers.handleDrop}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all ${
                    logoDrag ? "bg-accent border-primary" : "border-border"
                  }`}
                >
                  <input {...logoHandlers.getInputProps()} className="sr-only" />
                  {logoPreview ? (
                    <div className="relative w-full h-40">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="object-contain h-full w-full rounded-lg bg-white p-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (logoFiles.length > 0)
                            logoHandlers.removeFile(logoFiles[0]?.id);
                          setValues((p) => ({ ...p, clientLogo: null }));
                        }}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <ImageIcon className="h-6 w-6 opacity-70 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop or select a logo
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={logoHandlers.openFileDialog}
                      >
                        <UploadIcon className="h-4 w-4 mr-2" /> Select Image
                      </Button>
                    </div>
                  )}
                </div>
                {logoErrors[0] && (
                  <p className="text-xs text-red-500 mt-1">{logoErrors[0]}</p>
                )}
              </CardContent>
            </Card>

            {/* HERO IMAGE */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Image</CardTitle>
                <CardDescription>
                  Background of the detail page hero
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragEnter={heroHandlers.handleDragEnter}
                  onDragLeave={heroHandlers.handleDragLeave}
                  onDragOver={heroHandlers.handleDragOver}
                  onDrop={heroHandlers.handleDrop}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all ${
                    heroDrag ? "bg-accent border-primary" : "border-border"
                  }`}
                >
                  <input {...heroHandlers.getInputProps()} className="sr-only" />
                  {heroPreview ? (
                    <div className="relative w-full h-40">
                      <img
                        src={heroPreview}
                        alt="Hero preview"
                        className="object-cover h-full w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (heroFiles.length > 0)
                            heroHandlers.removeFile(heroFiles[0]?.id);
                          setValues((p) => ({ ...p, heroImage: null }));
                        }}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <ImageIcon className="h-6 w-6 opacity-70 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop or select an image
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={heroHandlers.openFileDialog}
                      >
                        <UploadIcon className="h-4 w-4 mr-2" /> Select Image
                      </Button>
                    </div>
                  )}
                </div>
                {heroErrors[0] && (
                  <p className="text-xs text-red-500 mt-1">{heroErrors[0]}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FOOTER */}
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
            onClick={() => navigate("/admin/case-study")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
