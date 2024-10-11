import CaseReportLayout from "@/components/CaseReportLayout";
import React from "react";
import ReporterPage from "../[caseId]/(wizard)/reporter/page";

const NewCase = () => {
  return (
    <CaseReportLayout>
      <ReporterPage />
    </CaseReportLayout>
  );
};

export default NewCase;
