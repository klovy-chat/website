"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";
import { X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentsModal({ isOpen, onClose }: DocumentsModalProps) {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const documents = [
    {
      id: "privacy",
      label: t("documents.privacy"),
      href: t("documents.privacyUrl"),
      updatedText: t("documents.privacyUpdated"),
    },
    {
      id: "terms",
      label: t("documents.terms"),
      href: t("documents.termsUrl"),
      updatedText: t("documents.updated"),
    },
    {
      id: "guidelines",
      label: t("documents.guidelines"),
      href: t("documents.guidelinesUrl"),
      updatedText: t("documents.guidelinesUpdated"),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-light_bg/80 dark:bg-dark_bg/80 backdrop-blur rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-light_border dark:border-dark_border pointer-events-auto"
            >
          <div className="flex items-center justify-between p-6 border-b border-light_border dark:border-dark_border">
            <h2 className="text-2xl font-bold text-light_text dark:text-dark_text">
              {t("documents.title")}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-light_border dark:hover:bg-dark_border rounded-lg transition-colors text-light_text dark:text-dark_text"
              aria-label={t("documents.close")}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-sm text-light_text/80 dark:text-dark_text/80 mb-6">
              {t("documents.description")}
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {documents.map((document) => (
                <a
                  key={document.id}
                  href={document.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-light_border dark:border-dark_border bg-light_bg/70 dark:bg-dark_bg/70 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <div>
                    <h3 className="font-semibold text-light_text dark:text-dark_text mb-2">
                      {document.label}
                    </h3>
                    <p className="text-sm text-light_text/70 dark:text-dark_text/70">
                      {document.updatedText}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    PDF
                  </span>
                </a>
              ))}
            </div>
          </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
