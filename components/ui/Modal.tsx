"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, Button } from "@/components/ui";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "outline";
  }[];
}

export const Modal = ({ title, description, isOpen, onClose, children, actions }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        {description && (
          <DialogDescription className="text-sm text-gray-500 mb-4">
            {description}
          </DialogDescription>
        )}
        {children}
        <DialogFooter className="flex justify-end mt-4">
          {actions?.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "primary"}
              onClick={action.onClick}
              className="ml-2"
            >
              {action.label}
            </Button>
          ))}
          <Button variant="outline" onClick={onClose} className="ml-2">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};