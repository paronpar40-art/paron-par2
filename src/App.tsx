import React, { useState } from 'react';
import { Header } from './components/Header';
import { SRSView } from './components/SRSView';
import { PrototypeView } from './components/PrototypeView';
import { SoldierMobileApp } from './components/SoldierMobileApp';
import { AttendanceManagementModule } from './components/AttendanceManagementModule';
import { DailyServiceManagementModule } from './components/DailyServiceManagementModule';
import { DesignSystemSection } from './components/DesignSystemSection';
import { PrintModal } from './components/PrintModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { UserRole } from './types/srs';

export default function App() {
  const [activeView, setActiveView] = useState<'SRS' | 'PROTOTYPE' | 'ATTENDANCE_MODULE' | 'DAILY_SERVICE_MODULE' | 'SOLDIER_APP' | 'DESIGN_SYSTEM'>('DAILY_SERVICE_MODULE');
  const [currentRole, setCurrentRole] = useState<UserRole>('COMMANDER');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Modals state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printModalTitle, setPrintModalTitle] = useState('');
  const [printModalContent, setPrintModalContent] = useState('');

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleOpenPrintModal = (title: string, content: string) => {
    setPrintModalTitle(title);
    setPrintModalContent(content);
    setIsPrintModalOpen(true);
  };

  return (
    <div dir="rtl" className={`min-h-screen font-sans transition-colors ${
      isDarkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        openAiModal={() => setIsAiModalOpen(true)}
        openPrintModal={handleOpenPrintModal}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />

      {/* Main Container: SRS Document vs System Prototype vs Design System */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeView === 'SRS' ? (
          <SRSView
            onOpenPrintModal={handleOpenPrintModal}
            onOpenAiModal={() => setIsAiModalOpen(true)}
            isDarkTheme={isDarkTheme}
          />
        ) : activeView === 'PROTOTYPE' ? (
          <PrototypeView
            currentRole={currentRole}
            onOpenPrintModal={handleOpenPrintModal}
            isDarkTheme={isDarkTheme}
          />
        ) : activeView === 'ATTENDANCE_MODULE' ? (
          <AttendanceManagementModule
            currentRole={currentRole}
            onOpenPrintModal={handleOpenPrintModal}
            isDarkTheme={isDarkTheme}
          />
        ) : activeView === 'DAILY_SERVICE_MODULE' ? (
          <DailyServiceManagementModule
            currentRole={currentRole}
            onOpenPrintModal={handleOpenPrintModal}
            isDarkTheme={isDarkTheme}
          />
        ) : activeView === 'SOLDIER_APP' ? (
          <SoldierMobileApp />
        ) : (
          <DesignSystemSection isDarkTheme={isDarkTheme} />
        )}
      </main>

      {/* Military Footer */}
      <footer className={`border-t py-6 px-4 text-center text-xs transition-colors ${
        isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">منظومة إدارة وحدة المدرعات والدعم الآلي (AUAS-MS)</span>
            <span>| وثيقة متطلبات SRS v2.5.0</span>
          </div>

          <div className="text-[11px] text-amber-500/80 font-mono">
            جميع الحقوق محفوظة - قيادة وحدة المدرعات والدعم الآلي © 2026
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        documentTitle={printModalTitle}
        documentContent={printModalContent}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
