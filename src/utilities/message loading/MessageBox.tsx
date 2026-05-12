// src/components/common/MessageBox.tsx
import React from "react";
import { X, AlertCircle, Info, CheckCircle } from "lucide-react";

export type MessageBoxType = "info" | "error" | "success" | "warning";

interface MessageBoxProps {
  type: MessageBoxType;
  title?: string;
  message: string;
  onRetry?: () => void;
  onAction?: () => void;
  actionText?: string;
  centered?: boolean;
  className?: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  type,
  title,
  message,
  onRetry,
  onAction,
  actionText,
  centered = true,
  className = "",
}) => {
  const styles = {
    info: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-600",
      titleText: "text-gray-700",
      icon: <Info className="w-12 h-12 text-gray-400" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      titleText: "text-red-700",
      icon: <X className="w-12 h-12 text-red-400" />,
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      titleText: "text-green-700",
      icon: <CheckCircle className="w-12 h-12 text-green-400" />,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-600",
      titleText: "text-yellow-700",
      icon: <AlertCircle className="w-12 h-12 text-yellow-400" />,
    },
  };

  const currentStyle = styles[type];

  return (
    <div className="flex justify-center w-full">
      <div
        className={`
          ${currentStyle.bg} 
          rounded-2xl 
          border 
          ${currentStyle.border} 
          p-8 
          max-w-md 
          w-full
          ${centered ? "text-center" : ""} 
          ${className}
        `}
      >
        <div
          className={`flex justify-center mb-4 ${!centered ? "justify-start" : ""}`}
        >
          {currentStyle.icon}
        </div>
        {title && (
          <h3
            className={`text-lg font-semibold ${currentStyle.titleText} mb-2`}
          >
            {title}
          </h3>
        )}
        <p
          className={`${currentStyle.text} ${onRetry || onAction ? "mb-4" : ""}`}
        >
          {message}
        </p>
        <div
          className={`flex gap-3 ${centered ? "justify-center" : "justify-start"}`}
        >
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          )}
          {onAction && actionText && (
            <button
              onClick={onAction}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
