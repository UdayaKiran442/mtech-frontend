import { Upload, FileText, Calendar, HardDrive } from "lucide-react";
import { H3 } from "./ui/Typography";

export function KnowledgeBaseComponent() {
  const documents = [
    "Project Requirements.pdf",
    "System Design Notes.docx",
    "API Documentation.pdf",
  ];

  return (
    <div className="min-h-[80vh]  -gradient-to-br from-slate-50 to-gray-100 p-6 rounded-3xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <H3 className="text-2xl font-bold text-gray-800">
            Knowledge Base
          </H3>
          <p className="text-sm text-gray-500 mt-1">
            Manage, preview, and organize your documents
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl shadow-md hover:scale-[1.02] transition-all duration-200">
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents List */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
          <H3 className="text-lg font-semibold text-gray-800 mb-4">
            Documents
          </H3>

          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <FileText className="text-gray-600" size={18} />
                <p className="text-sm font-medium text-gray-700 truncate">
                  {doc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
          <H3 className="text-lg font-semibold text-gray-800 mb-4">
            Preview
          </H3>

          <div className="h-[400px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            Document Preview Area
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
          <H3 className="text-lg font-semibold text-gray-800 mb-4">
            Metadata
          </H3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
              <HardDrive size={18} className="text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-sm font-medium text-gray-800">1024 KB</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
              <FileText size={18} className="text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium text-gray-800">PDF</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
              <Calendar size={18} className="text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-800">01/01/2024</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
              <Calendar size={18} className="text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Last Modified</p>
                <p className="text-sm font-medium text-gray-800">01/02/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
