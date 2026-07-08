"use client";

import { useCallback, useRef, useState } from "react";
import { cn, formatFileSize } from "@/lib/utils";
import {
  ACCEPTED_AUDIO_TYPES,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_LABEL,
} from "@/lib/constants";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, disabled }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File too large (${formatFileSize(file.size)}). Maximum: ${MAX_FILE_SIZE_LABEL}`;
    }
    const isAccepted =
      ACCEPTED_AUDIO_TYPES.some((t) => file.type === t) ||
      /\.(wav|mp3|m4a|webm|ogg|flac|mpeg)$/i.test(file.name);
    if (!isAccepted) {
      return `Unsupported format. Accepted: ${ACCEPTED_EXTENSIONS}`;
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setSelectedFile(null);
        return;
      }
      setError(null);
      setSelectedFile(file);
      onFileSelect(file);
    },
    [validateFile, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all cursor-pointer",
          isDragOver
            ? "border-violet-500 bg-violet-500/5"
            : "border-border/50 hover:border-violet-500/50 hover:bg-card/50",
          disabled && "pointer-events-none opacity-50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload audio file"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_AUDIO_TYPES.join(",")}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="mb-4 rounded-xl bg-violet-500/10 p-4 text-violet-400">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <p className="text-sm font-medium">
          {selectedFile ? selectedFile.name : "Drop your audio file here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {selectedFile
            ? formatFileSize(selectedFile.size)
            : `${ACCEPTED_EXTENSIONS} · Max ${MAX_FILE_SIZE_LABEL}`}
        </p>

        {!selectedFile && (
          <button
            type="button"
            className="mt-4 rounded-lg border border-border/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Browse files
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-400">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
