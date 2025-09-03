"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import React, { useState, useRef } from "react"
import { UploadCloud, Loader2 } from "lucide-react"

// ✅ Updated schema (simpler optional email)
const RenderFileSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.[0], "A .zip file is required.")
    .refine(
      (files) =>
        files?.[0]?.type === "application/zip" ||
        files?.[0]?.name.endsWith(".zip"),
      "Only .zip files are allowed."
    ),
})

interface RenderFileProps extends React.ComponentProps<"div"> {
  onUploadComplete: (fileUrl: string, fileName: string) => void
}

export function RenderFile({ className, onUploadComplete }: RenderFileProps) {
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof RenderFileSchema>>({
    resolver: zodResolver(RenderFileSchema),
    defaultValues: {
      file: undefined
    },
  })

  // --- Drag and Drop Handlers ---
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      form.setValue("file", files, { shouldValidate: true })
    }
  }

  // --- Submit handler ---
  const onSubmit = async (values: z.infer<typeof RenderFileSchema>) => {
    const file = values.file[0]
    setLoading(true)
    console.log("Uploading:", file);

    try {
      // --- Fake upload simulation ---
      await new Promise((res) => setTimeout(res, 4000))
      toast.success("File processed successfully!")

      // Call parent callback
      onUploadComplete("/path/to/your/rendered-file.zip", file.name)
    } catch (err) {
      toast.error("Something went wrong during rendering!")
    } finally {
      setLoading(false)
    }
  }

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg shadow-inner bg-card text-card-foreground">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        <h2 className="text-xl font-semibold">Rendering Your File...</h2>
        <p className="text-muted-foreground text-center">
          This might take a moment. We'll notify you
          <br />
          if you provided an email.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Render Your Project</h1>
        <p className="text-muted-foreground text-balance">
          Drag and drop your project's{" "}
          <span className="font-semibold text-orange-500">.zip</span> file below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* File Upload */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative flex flex-col items-center justify-center w-full h-56 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300",
                      isDragging
                        ? "border-orange-500 bg-orange-500/10 ring-4 ring-orange-500/20 ring-offset-2 ring-offset-background"
                        : "border-border hover:border-orange-400"
                    )}
                  >
                    <div className="text-center">
                      <UploadCloud className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="font-semibold">
                        {form.watch("file")?.[0]?.name ||
                          "Drag & drop file here or click to browse"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Maximum file size: 50MB
                      </p>
                    </div>
                    {/* Hidden input */}
                    <Input
                      type="file"
                      accept=".zip"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 text-lg py-6 font-bold"
            disabled={loading || !form.formState.isValid}
          >
            Render File
          </Button>
        </form>
      </Form>
    </div>
  )
}
