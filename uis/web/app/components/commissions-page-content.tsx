"use client";

import { useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { PageIntro } from "../../src/ui/page-intro";
import type { CommissionPageDictionary } from "../../src/types/content";

type CommissionsPageContentProps = {
  dict: CommissionPageDictionary;
};

type Brief = {
  projectTitle: string;
  projectType: string;
  details: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  agreement: boolean;
};

const initialBrief: Brief = {
  projectTitle: "",
  projectType: "",
  details: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  agreement: false,
};

const inputClassName =
  "mt-2 w-full rounded-sm border border-white/15 bg-black/20 px-3 py-3 font-body text-sm text-white placeholder:text-text-dim/60 transition-colors focus:border-primary focus:outline-none";
const labelClassName =
  "font-label text-[11px] uppercase tracking-[0.12em] text-text-dim";

export function CommissionsPageContent({ dict }: CommissionsPageContentProps) {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(initialBrief);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  function updateBrief<K extends keyof Brief>(key: K, value: Brief[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validateStep(currentStep: number) {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!brief.projectTitle.trim()) nextErrors.projectTitle = dict.validation.projectTitle;
      if (!brief.projectType) nextErrors.projectType = dict.validation.projectType;
      if (!brief.details.trim()) nextErrors.details = dict.validation.details;
    }

    if (currentStep === 2) {
      if (!brief.name.trim()) nextErrors.name = dict.validation.name;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) {
        nextErrors.email = dict.validation.email;
      }
      if (!brief.agreement) nextErrors.agreement = dict.validation.agreement;
    }

    return nextErrors;
  }

  function continueToNextStep() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep((current) => current + 1);
  }

  function addFiles(addedFiles: File[]) {
    const nextFiles = [...files, ...addedFiles];
    const error = nextFiles.length > 5
      ? dict.validation.fileCount
      : nextFiles.some((file) => !["image/jpeg", "image/png", "application/pdf"].includes(file.type))
        ? dict.validation.fileType
        : nextFiles.reduce((total, file) => total + file.size, 0) > 10 * 1024 * 1024
          ? dict.validation.fileSize
          : "";

    setErrors((current) => ({ ...current, references: error }));
    if (!error) setFiles(nextFiles);
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.currentTarget.files ?? []));
    event.currentTarget.value = "";
  }

  function handleFileDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
    setErrors((current) => ({ ...current, references: "" }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStep(2);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setIsComplete(true);
  }

  const stepIndex = step as 0 | 1 | 2;

  return (
    <main id="top">
      <PageIntro
        content={{
          tag: dict.heroTag,
          title: dict.heroTitle,
          body: dict.heroBody,
          ctaPrimary: dict.ctaPrimary,
          ctaSecondary: dict.ctaSecondary,
        }}
        showCta={false}
        compact
      />

      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.9fr)] lg:gap-8">
          <section className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] p-5 md:p-8" aria-labelledby="brief-title">
            <div className="absolute left-0 top-0 h-1 w-1/3 bg-primary" aria-hidden="true" />
            <div className="mb-6 border-b border-white/10 pb-5">
              <p className="mb-2 font-label text-[10px] uppercase tracking-[0.18em] text-primary">{dict.formSteps[stepIndex]}</p>
              <h2 id="brief-title" className="font-display text-2xl text-primary md:text-3xl">{dict.formTitle}</h2>
              <p className="mt-2 font-body text-sm leading-6 text-text-dim">{dict.formStepDescriptions[stepIndex]}</p>
            </div>

            <ol className="mb-7 grid grid-cols-3 gap-2" aria-label={dict.formTitle}>
              {dict.formSteps.map((label, index) => (
                <li key={label} aria-current={step === index ? "step" : undefined}>
                  <div className={`mb-2 h-1 rounded-full ${index <= step ? "bg-primary" : "bg-white/10"}`} />
                  <span className={`font-label text-[9px] uppercase leading-4 tracking-[0.08em] sm:text-[10px] ${index === step ? "text-primary" : "text-text-dim/70"}`}>
                    <span className="mr-1">0{index + 1}</span>{label}
                  </span>
                </li>
              ))}
            </ol>

            {isComplete ? (
              <div className="border-l-2 border-primary bg-primary/[0.06] px-5 py-6" role="status" aria-live="polite">
                <h3 className="font-display text-xl text-white">{dict.successTitle}</h3>
                <p className="mt-3 font-body text-sm leading-6 text-text-dim">{dict.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClassName} htmlFor="project-title">{dict.labels.projectTitle}</label>
                      <input
                        className={inputClassName}
                        id="project-title"
                        name="projectTitle"
                        autoComplete="off"
                        placeholder={dict.hints.projectTitle}
                        value={brief.projectTitle}
                        onChange={(event) => updateBrief("projectTitle", event.target.value)}
                        aria-invalid={Boolean(errors.projectTitle)}
                        aria-describedby={errors.projectTitle ? "project-title-error" : undefined}
                      />
                      {errors.projectTitle && <p id="project-title-error" className="mt-2 text-sm text-red-300" role="alert">{errors.projectTitle}</p>}
                    </div>

                    <fieldset>
                      <legend className={labelClassName}>{dict.labels.projectType}</legend>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {dict.projectTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            aria-pressed={brief.projectType === type.value}
                            onClick={() => updateBrief("projectType", type.value)}
                            className={`min-h-11 border px-3 py-2 text-left font-body text-sm transition-colors ${brief.projectType === type.value ? "border-primary text-primary" : "border-white/15 text-text-dim hover:border-primary/60 hover:text-white"}`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                      {errors.projectType && <p className="mt-2 text-sm text-red-300" role="alert">{errors.projectType}</p>}
                    </fieldset>

                    <div>
                      <label className={labelClassName} htmlFor="project-details">{dict.labels.details}</label>
                      <textarea
                        className={`${inputClassName} min-h-36 resize-y`}
                        id="project-details"
                        name="details"
                        placeholder={dict.hints.details}
                        value={brief.details}
                        onChange={(event) => updateBrief("details", event.target.value)}
                        aria-invalid={Boolean(errors.details)}
                        aria-describedby={errors.details ? "project-details-error" : undefined}
                      />
                      {errors.details && <p id="project-details-error" className="mt-2 text-sm text-red-300" role="alert">{errors.details}</p>}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClassName} htmlFor="project-budget">{dict.labels.budget}</label>
                        <select className={inputClassName} id="project-budget" value={brief.budget} onChange={(event) => updateBrief("budget", event.target.value)}>
                          <option value="">—</option>
                          {dict.budgetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClassName} htmlFor="project-timeline">{dict.labels.timeline}</label>
                        <select className={inputClassName} id="project-timeline" value={brief.timeline} onChange={(event) => updateBrief("timeline", event.target.value)}>
                          <option value="">—</option>
                          {dict.timelineOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className={labelClassName}>{dict.labels.references}</span>
                      <label
                        htmlFor="reference-files"
                        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleFileDrop}
                        className={`mt-3 flex min-h-40 cursor-pointer flex-col items-center justify-center border border-dashed px-5 py-7 text-center transition-colors ${isDragging ? "border-primary bg-primary/[0.06]" : "border-white/20 hover:border-primary/70 hover:bg-white/[0.02]"}`}
                      >
                        <svg className="mb-3 h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
                        </svg>
                        <span className="font-body text-sm text-text-dim">{dict.hints.references}</span>
                        <span className="mt-2 font-label text-[10px] text-text-dim/65">{dict.hints.referencesHelp}</span>
                        <input id="reference-files" className="sr-only" type="file" accept="image/jpeg,image/png,application/pdf" multiple onChange={handleFilesChange} />
                      </label>
                      {errors.references && <p className="mt-2 text-sm text-red-300" role="alert">{errors.references}</p>}
                      {files.length > 0 && (
                        <ul className="mt-3 space-y-2" aria-label={dict.labels.references}>
                          {files.map((file, index) => (
                            <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3 border-b border-white/10 py-2 font-body text-xs text-text-dim">
                              <span className="truncate">{file.name}</span>
                              <button type="button" className="shrink-0 text-primary hover:text-white" onClick={() => removeFile(index)} aria-label={`${dict.actions.removeFile} ${file.name}`}>
                                {dict.actions.removeFile}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="border-l-2 border-primary/70 bg-black/20 px-4 py-3 font-body text-sm leading-6 text-text-dim">{dict.hints.payment}</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClassName} htmlFor="contact-name">{dict.labels.name}</label>
                      <input className={inputClassName} id="contact-name" name="name" autoComplete="name" value={brief.name} onChange={(event) => updateBrief("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                      {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-300" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClassName} htmlFor="contact-email">{dict.labels.email}</label>
                      <input className={inputClassName} id="contact-email" name="email" type="email" autoComplete="email" value={brief.email} onChange={(event) => updateBrief("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                      {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-300" role="alert">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="flex items-start gap-3 font-body text-sm leading-6 text-text-dim">
                        <input className="mt-1 h-4 w-4 shrink-0 accent-primary" type="checkbox" checked={brief.agreement} onChange={(event) => updateBrief("agreement", event.target.checked)} />
                        <span>{dict.labels.agreement}</span>
                      </label>
                      {errors.agreement && <p className="mt-2 text-sm text-red-300" role="alert">{errors.agreement}</p>}
                    </div>
                    <p className="border-l-2 border-primary/70 bg-black/20 px-4 py-3 font-body text-sm leading-6 text-text-dim">{dict.hints.payment}</p>
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={() => { setErrors({}); setStep((current) => current - 1); }} className="min-h-12 border border-white/20 px-5 font-label text-xs uppercase tracking-[0.12em] text-text-dim transition-colors hover:border-primary hover:text-primary">
                      {dict.actions.back}
                    </button>
                  ) : <span aria-hidden="true" />}
                  {step < 2 ? (
                    <button type="button" onClick={continueToNextStep} className="min-h-12 bg-primary px-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-white">
                      {dict.actions.next} <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <button type="submit" className="min-h-12 bg-primary px-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-white">
                      {dict.actions.submit} <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5 md:p-7" aria-labelledby="process-title">
              <h2 id="process-title" className="mb-6 flex items-center gap-3 font-display text-xl text-white">
                <span className="font-label text-primary" aria-hidden="true">01</span>{dict.processTitle}
              </h2>
              <ol className="space-y-6">
                {dict.processSteps.map((item, index) => (
                  <li key={item.title} className="relative flex gap-4">
                    {index < dict.processSteps.length - 1 && <span className="absolute left-[13px] top-8 h-[calc(100%+0.5rem)] w-px bg-white/10" aria-hidden="true" />}
                    <span className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-label text-[10px] ${index === 0 ? "border-primary text-primary" : "border-white/20 text-text-dim"}`} aria-hidden="true">{index + 1}</span>
                    <div>
                      <h3 className="font-body text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 font-body text-sm leading-5 text-text-dim">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-t border-white/10 pt-5">
                <h3 className="font-label text-[10px] uppercase tracking-[0.14em] text-primary">{dict.paymentTitle}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-text-dim">{dict.paymentBody}</p>
              </div>
            </section>

            <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 md:p-7" aria-labelledby="faq-title">
              <h2 id="faq-title" className="mb-4 flex items-center gap-3 font-display text-xl text-white">
                <span className="font-label text-primary" aria-hidden="true">02</span>{dict.faqTitle}
              </h2>
              <div className="divide-y divide-white/10">
                {dict.faqs.map((faq, index) => (
                  <details key={faq.question} open={index === 0} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-body text-sm font-semibold text-white marker:hidden focus-visible:outline-primary">
                      {faq.question}
                      <span className="mt-0.5 text-primary transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                    </summary>
                    <p className="pt-3 font-body text-sm leading-6 text-text-dim">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}